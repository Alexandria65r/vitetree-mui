import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { TutorService, User } from '../../src/reusable/interfaces';
import { TutorServiceSchema, UserSchema } from '../../src/reusable/schemas';
type Role = 'tutor' | 'student' | ''
export type AuthNetworkStatus =
    'updating' |
    'updating-success' |
    'updating-error' |
    'image-upload' |
    'image-upload-success' |
    'image-upload-error' | ''


type AuthState = {
    user: User,
    tutorService: TutorService
    isRedirecting: boolean
    gettingStartedRole: Role
    authNetworkStatus: AuthNetworkStatus
}

const initialState: AuthState = {
    user: UserSchema,
    tutorService: TutorServiceSchema,
    isRedirecting: false,
    gettingStartedRole: '',
    authNetworkStatus: ''
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
    }
});


export const authActions = authSlice.actions
export default authSlice.reducer