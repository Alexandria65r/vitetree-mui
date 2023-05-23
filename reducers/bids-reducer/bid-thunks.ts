import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppState } from "../../store/store";
import { Task, TaskStatus } from "../../src/models/task";
import TaskAPI, { TasksQueryPath } from "../../src/api-services/task";
import Randomstring from 'randomstring'
import { fetchTaskUpdatesThunk } from "../task-updtes-reducer/task-updates-thunks";
import { Bid } from "../../src/models/bid";
import BidAPI from "../../src/api-services/bid";
import { bidsActions } from ".";
import { createToastThunk } from "../main-reducer/main-thunks";
import router from "next/router";

export const createBidThunk = createAsyncThunk<void, undefined, { state: AppState }>
    ('bidsSlice/createBid', async (_, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const state = thunkAPI.getState()
        const user = state.AuthReducer.user
        const bid = state.bidsReducer.bid
        const post = state.ForumReducer.post

        const bidId = Randomstring.generate(21)
        const newBid: Bid = {
            ...bid,
            _id: bidId,
            author: {
                id: user._id ?? '',
                name: `${user.firstName} ${user.lastName}`
            },
            postId: post._id,
            postAuthorId: post.authorId
        }

        console.log(newBid)
        try {
            dispatch(bidsActions.setBidsNetworkStatus('create-bid'))
            const newTask = await BidAPI.create(newBid)
            if (newTask) {
                dispatch(bidsActions.setBidsNetworkStatus('create-bid-success'))
                dispatch(createToastThunk('Your bid has been successfully submitted'))
                router.replace('/forum/all')
            }
        } catch (error) {
            dispatch(bidsActions.setBidsNetworkStatus('create-bid-error'))
        }
    })


export const fetchBid = createAsyncThunk<void, string, { state: AppState }>
    ('bidsSlice/fetchBid', async (bidId, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        try {
            dispatch(bidsActions.setBidsNetworkStatus('fetch-bid'))
            const bid = await BidAPI.fetchBid(bidId)

            if (bid) {
                dispatch(bidsActions.setBidsNetworkStatus('fetch-bid-success'))
                dispatch(bidsActions.setBid(bid))
            }
        } catch (error) {
            dispatch(bidsActions.setBidsNetworkStatus('fetch-bid-error'))
        }
    })


export const fetchBids = createAsyncThunk<void, string, { state: AppState }>
    ('bidsSlice/fetchBids', async (postId, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        try {
            dispatch(bidsActions.setBidsNetworkStatus('fetch-bid-success'))
            const bids = await BidAPI.fetchBids(postId)
            if (bids) {
                dispatch(bidsActions.setBidsNetworkStatus('fetch-bid-error'))
                dispatch(bidsActions.setBids(bids))
            }
        } catch (error) {
            dispatch(bidsActions.setBidsNetworkStatus('fetch-bids-error'))
        }
    })