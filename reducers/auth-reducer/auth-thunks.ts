import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppState } from "../../store/store";
import AuthAPI from "../../src/api-services/auth";
import { AuthNetworkStatus, authActions } from "./auth-reducer";
import { UserAvatarAsset } from "../../src/reusable/interfaces";





export const fetchUserAvatarThunk = createAsyncThunk<UserAvatarAsset| undefined, string, { state: AppState }>
    ('authSlice/fetchUserAvatarThunk', async (id,_) => {
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