import { createAsyncThunk } from "@reduxjs/toolkit"
import { AppState } from "../../store/store"
import { postActions } from "."
import PostAPI from "../../src/api-services/post"
import { JobSchema } from "../../src/models/post"
import { createToastThunk } from "../main-reducer/main-thunks"
import Randomstring from "randomstring"


export const createPostThunk = createAsyncThunk<void, any, { state: AppState }>
    ('authSlice/createPostThunk', async (postType, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const state = thunkAPI.getState()
        const user = state.AuthReducer.user
        const post = state.PostReducer.post
        try {
            const newPost = await PostAPI.create({
                ...post,
                jobId: Randomstring.generate(16),
                author: {
                    userId: user?._id ?? '',
                    companyId: user?.pageInfo?.pageId ?? '',
                    pageName: user?.pageInfo?.name ?? '',
                }
            })
            if (newPost) {
                dispatch(createToastThunk('Post has been published successfully'))
                dispatch(postActions.setPost(JobSchema))
            }
        } catch (error) {

        }
    })
export const fetchPostsThunk = createAsyncThunk<void, undefined, { state: AppState }>
    ('authSlice/fetchPosts', async (_, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const state = thunkAPI.getState()
        try {
            const posts = await PostAPI.fetchJobs()
            if (posts) {
                dispatch(postActions.setPosts(posts))
            }
        } catch (error) {

        }
    })


export const fetchPostThunk = createAsyncThunk<void, string, { state: AppState }>
    ('authSlice/fetchPost', async (postId, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const state = thunkAPI.getState()
        try {
            const post = await PostAPI.fetchJob(postId)
            if (post) {
                dispatch(postActions.setPosts([post]))
            }
        } catch (error) {

        }
    })

type UpdatePostPayload = {
    postId: string,
    target: 'likes' | 'other';
    update: any
}
export const updatePostThunk = createAsyncThunk<any, UpdatePostPayload, { state: AppState }>
    ('postSlice/updatePostThunk', async (updateParams, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const state = thunkAPI.getState()
        try {
            const { data } = await PostAPI.update(updateParams.postId, updateParams)
            if (data.success) {
                return data
            }
        } catch (error) {

        }
    })






