import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { User } from '../src/reusable/interfaces';
import { UserSchema } from '../src/reusable/schemas';

type AuthState = {
    user: User,
    isRedirecting: boolean
    gettingStartedRole: 'Tutor' | 'Student' | ''
}

const initialState: AuthState = {
    user: UserSchema,
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
        }
    }
});


export const authActions = authSlice.actions
export default authSlice.reducer