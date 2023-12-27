import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Job, JobSchema, Tip } from '../../src/models/post'

type PostState = {
    post: Job
    posts: Job[]
    tip: Tip
}


const initialState: PostState = {
    post: JobSchema,
    posts: [],
    tip: {
        name: '',
        emoji: '',
        amount: 0,
        state:'pending'
    }
}


const postSlice = createSlice({
    name: 'postSlice',
    initialState,
    reducers: {
        setPost: (state, { payload }: PayloadAction<Job>) => {
            state.post = payload
        },
        setPosts: (state, { payload }: PayloadAction<Job[]>) => {
            state.posts = payload
        },
        setTip: (state, { payload }: PayloadAction<Tip>) => {
            state.tip = payload
        }
    }
})

export const postActions = postSlice.actions
export default postSlice.reducer