import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppState } from "../../store/store";
import ForumAPI from "../../src/api-services/forum";
import { PostType } from "../../src/reusable/interfaces";
import { forumActions } from ".";

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