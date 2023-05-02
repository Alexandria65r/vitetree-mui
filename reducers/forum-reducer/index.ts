import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Post, PostType } from '../../src/reusable/interfaces'
import { PostSchema } from '../../src/reusable/schemas'


export type ForumNetworkStatus =
    'fetching-posts' |
    'fetching-posts-error' |
    'fetching-posts-success' |
    'deleting' |
    'deleting-error' |
    'deleting-success'
    | ''



type ForumState = {
    isOpen: boolean
    isErr: boolean
    newPostTabValue: number
    post: Post
    posts: Post[]
    forumNetworkStatus: ForumNetworkStatus
    sort: PostType

}


const initialState: ForumState = {
    isOpen: false,
    isErr: false,
    newPostTabValue: 0,
    post: PostSchema,
    posts: [],
    forumNetworkStatus: '',
    sort: 'all'
}


const forumSlice = createSlice({
    name: 'forumSlice',
    initialState,
    reducers: {
        setPost: (state, { payload }: PayloadAction<Post>) => {
            state.post = payload
        },
        setPosts: (state, { payload }: PayloadAction<Post[]>) => {
            state.posts = payload
        },
        setPostProps: (state, { payload }: PayloadAction<{ name: string, value: any }>) => {
            state.post = {
                ...state.post,
                [payload.name]: payload.value
            }
        },

        toggleForumFormModal: (state, { payload }: PayloadAction<boolean>) => {
            state.isOpen = payload
        },
        setTabValue: (state, { payload }: PayloadAction<number>) => {
            state.newPostTabValue = payload
        },
        setNetworkStatus: (state, { payload }: PayloadAction<ForumNetworkStatus>) => {
            state.forumNetworkStatus = payload
        },
        setSort: (state, { payload }: PayloadAction<PostType>) => {
            state.sort = payload
        },
    }
})

export const forumActions = forumSlice.actions
export default forumSlice.reducer