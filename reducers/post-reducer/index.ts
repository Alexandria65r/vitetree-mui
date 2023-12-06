import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Post, PostSchema, Tip } from '../../src/models/post'

type PostState = {
    post: Post
    posts: Post[]
    tip: Tip
}


const initialState: PostState = {
    post: PostSchema,
    posts: [],
    tip: {
        name: '',
        imoji: '',
        amount: 0
    }
}


const postSlice = createSlice({
    name: 'postSlice',
    initialState,
    reducers: {
        setPost: (state, { payload }: PayloadAction<Post>) => {
            state.post = payload
        },
        setPosts: (state, { payload }: PayloadAction<Post[]>) => {
            state.posts = payload
        },
        setTip: (state, { payload }: PayloadAction<Tip>) => {
            state.tip = payload
        }
    }
})

export const postActions = postSlice.actions
export default postSlice.reducer