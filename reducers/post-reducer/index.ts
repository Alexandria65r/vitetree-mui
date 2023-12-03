import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Post, PostSchema } from '../../src/models/post'

type PostState = {
    post: Post
    posts: Post[]
}


const initialState: PostState = {
    post: PostSchema,
    posts: []
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
        }
    }
})

export const postActions = postSlice.actions
export default postSlice.reducer