import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { User } from '../src/reusable/interfaces';
import { UserSchema } from '../src/reusable/schemas';

type AuthState = {
    user: User
}

const initialState: AuthState = {
    user: UserSchema
}


const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        setAuhtUser: (state, {payload}:PayloadAction<User>) => {
            state.user = payload
        }
    }
});


export const authActions = authSlice.actions
export default authSlice.reducer