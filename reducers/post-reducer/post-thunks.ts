import { createAsyncThunk } from "@reduxjs/toolkit"
import { AppState } from "../../store/store"
import { postActions } from "."
import PostAPI from "../../src/api-services/post"
import { PostSchema, PostType, TipSchema } from "../../src/models/post"
import { createToastThunk } from "../main-reducer/main-thunks"
import Randomstring from "randomstring"
import { chargeThunk } from "../auth-reducer/auth-thunks"
import { updatePageThunk } from "../page-reducer/page-thunks"
import { Star } from "../../src/models/page/page.model"
import { pageActions } from "../page-reducer"
import { mainActions } from "../main-reducer"


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
export const sendTipThunk = createAsyncThunk<void, { postId: string }, { state: AppState }>
    ('authSlice/sendTipThunk', async ({ postId }, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const state = thunkAPI.getState()
        const user = state.AuthReducer.user
        const { tip, posts } = state.PostReducer
        const post = posts.find((postItem) => postItem.postId === postId)
        dispatch(pageActions.setPageNetworkStatus('updating'))

        const { payload } = await dispatch(chargeThunk({ balance: user.accountBalance, subTotal: tip.amount }))
        if (payload === 'success') {
            //update page: the owner of the post
            const star: Star = {
                postId,
                type: "post-tip",
                owner: user._id ?? '',
                amount: tip.amount,
                emoji: tip.imoji
            }

            const updatePageRes = await dispatch(updatePageThunk({
                pageId: post?.author.pageId ?? '',
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