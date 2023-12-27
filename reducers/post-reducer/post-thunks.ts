import { createAsyncThunk } from "@reduxjs/toolkit"
import { AppState } from "../../store/store"
import { postActions } from "."
import PostAPI from "../../src/api-services/post"
import { Like, Job, JobSchema, TipSchema } from "../../src/models/post"
import { createToastThunk } from "../main-reducer/main-thunks"
import Randomstring from "randomstring"
import { chargeThunk } from "../auth-reducer/auth-thunks"
import { updatePageThunk } from "../page-reducer/page-thunks"
import { Star } from "../../src/models/page/page.model"
import { pageActions } from "../page-reducer"
import { mainActions } from "../main-reducer"


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


export const likePostThunk = createAsyncThunk<void, { postId: string, like: Like },
    { state: AppState }>
    ('postSlice/likePostThunk', async (params, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const state = thunkAPI.getState()
        const { user } = state.AuthReducer
        const { posts } = state.PostReducer
        const post: any = posts.find((postItem) => postItem.jobId === params.postId)
        let likes: Like[] = [...post.likes]
        const clonedPosts = [...posts]
        const like: any = post.likes.find((likeItem: Like) => likeItem.owner === user._id)
        if (!like) {
            console.log('new like')
            likes = [params.like, ...post.likes]
        } else if (like.name !== params.like.name) {
            likes.splice(likes.indexOf(like), 1, params.like)
        } else {
            likes.splice(likes.indexOf(like), 1)
        }
        clonedPosts.splice(posts.indexOf(post), 1, { ...post, isReactionsOpen: false, likes })
        dispatch(postActions.setPosts(clonedPosts))

        try {
            const { payload } = await dispatch(updatePostThunk({
                postId: params.postId,
                target: 'likes', update: {
                    like: params.like
                }
            }))
            console.log(payload)
        } catch (error) {

        }

    })

export const sendTipThunk = createAsyncThunk<void, { postId: string }, { state: AppState }>
    ('postSlice/sendTipThunk', async ({ postId }, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const state = thunkAPI.getState()
        const user = state.AuthReducer.user
        const { tip, posts } = state.PostReducer
        const post = posts.find((postItem) => postItem.jobId === postId)
        dispatch(pageActions.setPageNetworkStatus('updating'))

        const { payload } = await dispatch(chargeThunk({ balance: user.accountBalance, subTotal: tip.amount }))
        if (payload === 'success') {
            //update page: the owner of the post
            const star: Star = {
                postId,
                type: "post-tip",
                owner: user._id ?? '',
                amount: tip.amount,
                emoji: tip.emoji
            }

            const updatePageRes = await dispatch(updatePageThunk({
                pageId: post?.author.companyId ?? '',
                target: 'balance',
                update: {
                    earnings: {
                        amount: tip.amount,
                        activity: {
                            star,
                            tip: { ...tip, state: 'sent' }
                        }
                    }
                }
            }))


            if (updatePageRes.payload.success) {
                dispatch(pageActions.setPageNetworkStatus('updating-success'))
                dispatch(createToastThunk('Tip sent successfully'))
                dispatch(postActions.setTip(TipSchema))
                dispatch(mainActions.closeModal())
            }
        }
    })


