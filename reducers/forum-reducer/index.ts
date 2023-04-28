import { createSlice, PayloadAction } from '@reduxjs/toolkit'


export type CartNetworkStatus =
    'fetching' |
    'fetching-error' |
    'fetching-success' |
    'deleting' |
    'deleting-error' |
    'deleting-success'
    | ''



type ForumState = {
    isOpen: boolean

}


const initialState: ForumState = {
    isOpen: false,
}


const forumSlice = createSlice({
    name: 'forumSlice',
    initialState,
    reducers: {
        toggleForumFormModal: (state, { payload }: PayloadAction<boolean>) => {
            state.isOpen = payload
        },
    }
})

export const forumActions = forumSlice.actions
export default forumSlice.reducer