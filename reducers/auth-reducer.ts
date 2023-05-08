import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { TutorService, User } from '../src/reusable/interfaces';
import { TutorServiceSchema, UserSchema } from '../src/reusable/schemas';

type AuthState = {
    user: User,
    tutorService: TutorService
    isRedirecting: boolean
    gettingStartedRole: 'Tutor' | 'Student' | ''
}

const initialState: AuthState = {
    user: UserSchema,
    tutorService: TutorServiceSchema,
    isRedirecting: false,
    gettingStartedRole: ''
}


const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        setAuhtUser: (state, { payload }: PayloadAction<User>) => {
            state.user = payload
        },
        setRedirecting: (state, { payload }: PayloadAction<boolean>) => {
            state.isRedirecting = payload
        },
        setGettingStartedRole: (state, { payload }: PayloadAction<'Tutor' | 'Student' | ''>) => {
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