import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { PopperState } from '../src/reusable/interfaces'

interface State {
    popperState: PopperState
    showSelectedImage: boolean
}
const initialState: State = {
    popperState: {
        component: '',
        popperId: '',
        placement:''
    },
    showSelectedImage: false
}

const mainSlice = createSlice({
    name: 'mainSlice',
    initialState,
    reducers: {
        setAppName: (state, { payload }: PayloadAction<string>) => {

        },
        setPopperState: (state, { payload }: PayloadAction<PopperState>) => {
            state.popperState = payload
        },
        setShowSelectedImage: (state, { payload }: PayloadAction<boolean>) => {
            state.showSelectedImage = payload
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