import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { TutorService, User } from '../../src/reusable/interfaces';
import { TutorServiceSchema, UserSchema } from '../../src/reusable/schemas';
import { Card, CardModel } from '../../src/models/card';
type Role = 'tutor' | 'student' | ''
export type AuthNetworkStatus =
    'signup' | 'signup-success' | 'signup-error' |
    'signin' | 'signin-success' | 'signin-error' |
    'updating' | 'updating-success' | 'updating-error' |
    'image-upload' | 'image-upload-success' | 'image-upload-error' |
    'add-card' | 'add-card-success' | 'add-card-error' |
    'fetch-cards' | 'fetch-cards-success' | 'fetch-cards-error' |
    'fetch-active-card' | 'fetch-active-card-success' | 'active-card-not-found' |
    'fetch-active-card-error' |
    'topup-account' | 'topup-account-success' | 'topup-account-error' |
    'deduct-account' | 'deduct-account-success' | 'deduct-account-error' |
    'order' | 'order-success' | 'order-error' | ''


type AuthState = {
    user: User,
    tutorService: TutorService
    isRedirecting: boolean
    gettingStartedRole: Role
    authNetworkStatus: AuthNetworkStatus
    isError: boolean
    isAddNewCard: boolean
    card: Card
    cards: Card[]
    removeCardId: string
}

const initialState: AuthState = {
    user: UserSchema,
    tutorService: TutorServiceSchema,
    isRedirecting: false,
    gettingStartedRole: '',
    authNetworkStatus: '',
    isError: false,
    isAddNewCard: false,
    card: CardModel,
    cards: [],
    removeCardId: ''
}


const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        setAuthNetworkStatus: (state, { payload }: PayloadAction<AuthNetworkStatus>) => {
            state.authNetworkStatus = payload
        },
        setAuhtUser: (state, { payload }: PayloadAction<User>) => {
            state.user = payload
        },
        setRedirecting: (state, { payload }: PayloadAction<boolean>) => {
            state.isRedirecting = payload
        },
        setGettingStartedRole: (state, { payload }: PayloadAction<Role>) => {
            state.gettingStartedRole = payload
        },
        setUserProps: (state, { payload }: PayloadAction<{ name: string, value: any }>) => {
            state.user = {
                ...state.user, [payload.name]: payload.value
            }
        },
        setTutorService: (state, { payload }: PayloadAction<TutorService>) => {
            state.tutorService = payload
        },
        setError: (state, { payload }: PayloadAction<boolean>) => {
            state.isError = payload
        },
        toggleAddNewCard: (state, { payload }: PayloadAction<boolean>) => {
            state.isAddNewCard = payload
        },
        setCard: (state, { payload }: PayloadAction<Card>) => {
            state.card = payload
        },
        setCards: (state, { payload }: PayloadAction<Card[]>) => {
            state.cards = payload
        },
        setCardIdToRemove: (state, { payload }: PayloadAction<string>) => {
            state.removeCardId = payload
        },
    }
});


export const authActions = authSlice.actions
export default authSlice.reducer