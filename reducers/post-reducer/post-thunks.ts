import { createAsyncThunk } from "@reduxjs/toolkit"
import CourseAPI from "../../src/api-services/course"
import { AppState } from "../../store/store"
import { postActions } from "."
import PostAPI from "../../src/api-services/post"
import { PostSchema, PostType } from "../../src/models/post"
import { createToastThunk } from "../main-reducer/main-thunks"
import Randomstring from "randomstring"


export const createPostThunk = createAsyncThunk<void, PostType, { state: AppState }>
    ('authSlice/createPostThunk', async (postType, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const state = thunkAPI.getState()
        const user = state.AuthReducer.user
        const post = state.PostReducer.post
        try {
            const newPost = await PostAPI.create({
                ...post,
                postId: Randomstring.generate(16),
                type: postType,
                author: {
                    userId: user?._id ?? '',
                    pageId: user?.pageInfo?.pageId ?? '',
                    pageName: user?.pageInfo?.name ?? '',
                }
            })
            if (newPost) {
                dispatch(createToastThunk('Post has been published successfully'))
                dispatch(postActions.setPost(PostSchema))
            }
        } catch (error) {

        }
    })
export const fetchPostsThunk = createAsyncThunk<void, undefined, { state: AppState }>
    ('authSlice/fetchPosts', async (_, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const state = thunkAPI.getState()
        try {
            const posts = await PostAPI.fetchPosts()
            if (posts) {
                dispatch(postActions.setPosts(posts))
            }
        } catch (error) {

        }
    })