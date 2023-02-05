import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'


const initialState = {
    appName: ''
}

const mainSlice = createSlice({
    name: 'mainSlice',
    initialState,
    reducers: {
        setAppName: (state, { payload }: PayloadAction<string>) => {
            state.appName = payload
        }
    },

    extraReducers: {
        [HYDRATE]: (state, { payload }: any) => {
            return {
                ...state,
                ...payload.MainReducer
            }
        }
    }
})


export const mainActions = mainSlice.actions
export default mainSlice.reducer