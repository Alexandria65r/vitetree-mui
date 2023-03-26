import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

type ChatState = {
    isSidebarOpen: boolean

}
const initialState: ChatState = {
    isSidebarOpen: false
}

const chatSlice = createSlice({
    name: 'chatSlice',
    initialState,
    reducers: {
        toggleSideBar: (state, { payload }: PayloadAction<boolean>) => {
            state.isSidebarOpen = payload
        }
    },

    extraReducers: {
        [HYDRATE]: (state, { payload }: any) => {
            return {
                ...state,
                ...payload.ChatReducer
            }
        }
    }
})


export const chatActions = chatSlice.actions
export default chatSlice.reducer