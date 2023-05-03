import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppState } from "../../store/store";
import ForumAPI from "../../src/api-services/forum";
import { PostType } from "../../src/reusable/interfaces";
import { forumActions } from ".";

export const fetchPostThunk = createAsyncThunk<void, string, { state: AppState }>
    ('forumSlice/fetchPostThunk', async (id, thunkAPI) => {
        const state = thunkAPI.getState()
        const dispatch = thunkAPI.dispatch
        try {
            dispatch(forumActions.setNetworkStatus('fetching-post'))
            const post = await ForumAPI.fetchPostItem(id)
            if (post) {
                dispatch(forumActions.setNetworkStatus('fetching-post-success'))
                dispatch(forumActions.setPost(post))
            }
        } catch (error) {
            dispatch(forumActions.setNetworkStatus('fetching-post-error'))
        }
    })

export const fetchPostsThunk = createAsyncThunk<void, PostType, { state: AppState }>
    ('forumSlice/fetchPostsThunk', async (type, thunkAPI) => {
        const state = thunkAPI.getState()
        const dispatch = thunkAPI.dispatch
        try {
            dispatch(forumActions.setSort(type))
            dispatch(forumActions.setNetworkStatus('fetching-posts'))
            const posts = await ForumAPI.fetchAll(type)
            if (posts) {
                dispatch(forumActions.setNetworkStatus('fetching-posts-success'))
                dispatch(forumActions.setPosts(posts))
            }
        } catch (error) {
            dispatch(forumActions.setNetworkStatus('fetching-posts-error'))
        }
    })
export const fetchOwnPostsThunk = createAsyncThunk<void, PostType, { state: AppState }>
    ('forumSlice/fetchOwnPostsThunk', async (type, thunkAPI) => {
        const state = thunkAPI.getState()
        const { user: { _id: authorId } } = state.AuthReducer
        const dispatch = thunkAPI.dispatch
        try {
            dispatch(forumActions.setSort(type))
            dispatch(forumActions.setNetworkStatus('fetching-posts'))
            const posts = await ForumAPI.fetchOwnPosts(authorId ?? '', type)
            if (posts) {
                dispatch(forumActions.setNetworkStatus('fetching-posts-success'))
                dispatch(forumActions.setPosts(posts))
            }
        } catch (error) {
            dispatch(forumActions.setNetworkStatus('fetching-posts-error'))
        }
    })