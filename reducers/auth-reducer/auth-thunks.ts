import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppState } from "../../store/store";
import AuthAPI from "../../src/api-services/auth";
import { AuthNetworkStatus, authActions } from "./auth-reducer";
import { Signin, UserAvatarAsset } from "../../src/reusable/interfaces";
import { SCHOOYARD_AUTH_TOKEN } from "../../src/reusable";
import Cookies from "js-cookie";
import router from "next/router";
import { Card } from "../../src/models/card";
import BillingAPI from "../../src/api-services/billing";
import randomstring from 'randomstring'

export const signupThunk = createAsyncThunk<void, undefined, { state: AppState }>
    ('authSlice/fetchUserAvatarThunk', async (_, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const state = thunkAPI.getState()
        const signUpData = state.AuthReducer.user
        const { firstName, lastName, email, role, password, gender } = signUpData
        if (!(firstName && lastName && email && role && password && gender)) {
            dispatch(authActions.setError(true))
        } else {
            try {
                dispatch(authActions.setAuthNetworkStatus('signup'))
                const { data } = await AuthAPI.signUp(signUpData)
                if (data.success) {
                    dispatch(authActions.setAuthNetworkStatus('signup-success'))
                    Cookies.set(SCHOOYARD_AUTH_TOKEN, data.token)
                    dispatch(authActions.setAuhtUser(data.user))
                    router.replace(`/account-setup/${data.user.role}`)
                    localStorage.removeItem('getting-started-role')
                }
            } catch (error) {
                dispatch(authActions.setAuthNetworkStatus('signup-error'))
            }
        }
    })



export const SignInThunk = createAsyncThunk<void, Signin, { state: AppState }>
    ('authSlice/SigninThunk', async (signInData, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        if (!(signInData.password && signInData.email)) {
            dispatch(authActions.setError(true))
        } else {
            try {
                dispatch(authActions.setAuthNetworkStatus('signin'))
                const { data } = await AuthAPI.signin(signInData)
                if (data.success) {
                    dispatch(authActions.setAuthNetworkStatus('signin-success'))
                    Cookies.set(SCHOOYARD_AUTH_TOKEN, data.token)
                    dispatch(authActions.setAuhtUser(data.user))
                    if (signInData.provider === 'google-provider') {
                        localStorage.removeItem('redirectFlag')
                    }
                    router.replace('/dashboard')
                } else {
                    console.log(data)
                    console.log(signInData.provider)
                    if (data.message === `user doesn't exist` && signInData.provider === 'google-provider') {
                        localStorage.removeItem('redirectFlag')
                        router.push('/signup?redirect=true&&authProvider=google')
                    }
                }

            } catch (error) {
                dispatch(authActions.setAuthNetworkStatus('signin-error'))
            }
        }
    })



export const checkAuthThunk = createAsyncThunk
    <'success' | 'not-authorized' | undefined, undefined, { state: AppState }>
    ('authSlice/checkAuthThunk', async (_, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const state = thunkAPI.getState()
        const user = state.AuthReducer.user
        const token = Cookies.get(SCHOOYARD_AUTH_TOKEN)
        if (!token && router.pathname !== '/') {
            router.push('/signin')
        } else if (!user?._id && token) {
            const { data } = await AuthAPI.DecodeToken(token)
            if (data.success) {
                dispatch(authActions.setAuhtUser(data.user))
                return 'success'
            }
        }
    })


export const fetchUserAvatarThunk = createAsyncThunk
    <UserAvatarAsset | undefined, string, { state: AppState }>
    ('authSlice/fetchUserAvatarThunk', async (id, _) => {
        try {
            const userAvatar = await AuthAPI.fetchUserAvatar(id)
            if (userAvatar) {
                return userAvatar
            }
        } catch (error) {
            console.log(error)
        }
    })



export const updateUserThunk = createAsyncThunk<void,
    { update: any, networkSatusList: AuthNetworkStatus[] }, { state: AppState }>
    ('authSlice/updateUserThunk', async (params, thunkAPI) => {
        const state = thunkAPI.getState()
        const dispatch = thunkAPI.dispatch
        try {
            dispatch(authActions.setAuthNetworkStatus(params.networkSatusList[0]))
            const id = state.AuthReducer.user._id ?? ''
            const { data } = await AuthAPI.update(id, params.update)
            if (data.success) {
                dispatch(authActions.setAuthNetworkStatus(params.networkSatusList[1]))
            }
        } catch (error) {
            dispatch(authActions.setAuthNetworkStatus(params.networkSatusList[3]))
        }
    })

export const addCardThunk = createAsyncThunk<void, undefined, { state: AppState }>
    ('authSlice/addCard', async (_, thunkAPI) => {
        const state = thunkAPI.getState()
        const dispatch = thunkAPI.dispatch
        const user = state.AuthReducer.user
        const card = state.AuthReducer.card

        const _id = randomstring.generate(13)

        try {
            dispatch(authActions.setAuthNetworkStatus('add-card'))
            const { data } = await BillingAPI.addCard({
                ...card,
                _id,
                owner: user._id ?? ''
            })
            if (data.success) {
                dispatch(authActions.setAuthNetworkStatus('add-card-success'))
                dispatch(fetchCardsThunk())
                dispatch(authActions.toggleAddNewCard(false))
            }
        } catch (error) {
            dispatch(authActions.setAuthNetworkStatus('image-upload-error'))
        }
    })





export const fetchCardsThunk = createAsyncThunk<void, undefined, { state: AppState }>
    ('authSlice/fetchCardsThunk', async (_, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const state = thunkAPI.getState()
        const user = state.AuthReducer.user
        try {
            dispatch(authActions.setAuthNetworkStatus('fetch-cards'))
            const cards = await BillingAPI.fetchCards(user._id ?? '')
            if (cards) {
                dispatch(authActions.setAuthNetworkStatus('fetch-cards-success'))
                dispatch(authActions.setCards(cards))
            }

        } catch (error) {
            dispatch(authActions.setAuthNetworkStatus('fetch-cards-error'))
        }
    })


export const makeDefaultCardThunk = createAsyncThunk<void, string, { state: AppState }>
    ('authSlice/makeDefaultCard', async (cardId, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const state = thunkAPI.getState()
        const user = state.AuthReducer.user
        const cards = [...state.AuthReducer.cards]
        //reset existing
        cards.forEach((item, index) => {
            if (item.preffered) {
                const clonedItem = { ...item }
                clonedItem.preffered = false
                cards[index] = clonedItem
            }
        })

        const targetCard = cards.find((item) => item._id === cardId)
        if (targetCard) {
            cards.splice(cards.indexOf(targetCard), 1, { ...targetCard, preffered: true })
            dispatch(authActions.setCards(cards))
        }

        try {
            await BillingAPI.makeDefaultCard(cardId, user._id ?? '')
        } catch (error) {

        }
    })
export const removeCardThunk = createAsyncThunk<void, string, { state: AppState }>
    ('authSlice/removeCard', async (cardId, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const state = thunkAPI.getState()
        const cards = state.AuthReducer.cards
        const filtered = cards.filter((item) => item._id !== cardId)
        dispatch(authActions.setCards(filtered))
        dispatch(authActions.setCardIdToRemove(''))
        try {
            const cards = await BillingAPI.removeCard(cardId)
        } catch (error) {

        }
    })