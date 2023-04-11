import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { User } from '../src/reusable/interfaces';
import { UserSchema } from '../src/reusable/schemas';

type AuthState = {
    user: User,
    isRedirecting:boolean
}

const initialState: AuthState = {
    user: UserSchema,
    isRedirecting:false
}


const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        setAuhtUser: (state, {payload}:PayloadAction<User>) => {
            state.user = payload
        },
        setRedirecting: (state, {payload}:PayloadAction<boolean>) => {
            state.isRedirecting = payload
        }
    }
});


export const authActions = authSlice.actions
export default authSlice.reducer