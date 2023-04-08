import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { MessageThread } from '../src/reusable/interfaces'

type ChatState = {
    isSidebarOpen: boolean,
    selectedMessage: MessageThread

}
const initialState: ChatState = {
    isSidebarOpen: false,
    selectedMessage: {
        _id: "",
        owner: false,
        type: "text",
        text: "",
        name:""
    }
}

const chatSlice = createSlice({
    name: 'chatSlice',
    initialState,
    reducers: {
        toggleSideBar: (state, { payload }: PayloadAction<boolean>) => {
            state.isSidebarOpen = payload
        },
        setSelectedMessage: (state, { payload }: PayloadAction<MessageThread>) => {
            state.selectedMessage = payload
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