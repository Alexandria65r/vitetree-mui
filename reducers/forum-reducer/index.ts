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
    newPostTabValue: number

}


const initialState: ForumState = {
    isOpen: false,
    newPostTabValue: 0
}


const forumSlice = createSlice({
    name: 'forumSlice',
    initialState,
    reducers: {
        toggleForumFormModal: (state, { payload }: PayloadAction<boolean>) => {
            state.isOpen = payload
        },
        setTabValue: (state, { payload }: PayloadAction<number>) => {
            state.newPostTabValue = payload
        },
    }
})

export const forumActions = forumSlice.actions
export default forumSlice.reducer