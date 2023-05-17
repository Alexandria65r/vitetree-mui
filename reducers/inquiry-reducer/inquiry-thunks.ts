import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppState } from "../../store/store";
import InquiryAPI from "../../src/api-services/inquiry";
import { inquiryActions } from ".";
import axios from 'axios'
import { InquiryFeedback } from "../../src/models/inquiry-feedback";
import { authActions } from "../auth-reducer";


export const createInquiryThunk = createAsyncThunk<void, undefined, { state: AppState }>
    ('inquirySlice/createInquiryThunk', async (_, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const state = thunkAPI.getState()
        const inquiry = state.InquiryReducer.inquiry
        try {
            dispatch(inquiryActions.setError(false))
            dispatch(inquiryActions.setInquiryNetworkStatus('creatingInquiry'))
            const data = await InquiryAPI.create(inquiry)
            if (data?.newInquiry) {
                dispatch(inquiryActions.setInquiryNetworkStatus('creatingInquirySuccess'))
                dispatch(authActions.setAuhtUser(data?.updatedUser))
            }
        } catch (error) {
            dispatch(inquiryActions.setInquiryNetworkStatus('creatingInquiryError'))
        }
    })


export const fetchInquiriesThunk = createAsyncThunk<void, undefined, { state: AppState }>
    ('inquirySlice/fetchInquiresThunk', async (_, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const state = thunkAPI.getState()
        const user = state.AuthReducer.user
        try {
            dispatch(inquiryActions.setInquiryNetworkStatus('fetch-inquiries'))
            const inquiries = await InquiryAPI.fetchInquiries(user._id ?? '')
            if (inquiries) {
                dispatch(inquiryActions.setInquiryNetworkStatus('fetch-inquiries-success'))
                dispatch(inquiryActions.setInquiries(inquiries))
            }
        } catch (error) {
            dispatch(inquiryActions.setInquiryNetworkStatus('fetch-inquiries-error'))
        }
    })
export const sendInquiryFeedbackThunk = createAsyncThunk<void, InquiryFeedback, { state: AppState }>
    ('inquirySlice/sendInquiryFeedbackThunk', async (feedBack, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const state = thunkAPI.getState()
        const user = state.AuthReducer.user
        try {
            dispatch(inquiryActions.setInquiryNetworkStatus('send-inquiry-feedback'))
            const { data } = await axios.post(`/api/inquiry-feedback/create`, feedBack)
            if (data.success) {
                dispatch(inquiryActions.setInquiryNetworkStatus('send-inquiry-feedback-success'))
            }
        } catch (error) {
            console.log(error)
            dispatch(inquiryActions.setInquiryNetworkStatus('send-inquiry-feedback-error'))
        }
    })
export const fetchInquiryFeedbackThunk = createAsyncThunk<void, string, { state: AppState }>
    ('inquirySlice/fetchInquiryFeedbackThunk', async (id, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const state = thunkAPI.getState()
        const user = state.AuthReducer.user
        try {
            dispatch(inquiryActions.setInquiryNetworkStatus('fetch-inquiry-feedback'))
            const { data } = await axios.get(`/api/inquiry-feedback/fetch-inquiry-feedback/${id}`)
            if (data.success) {
                dispatch(inquiryActions.setInquiryNetworkStatus('fetch-inquiry-feedback-success'))
                dispatch(inquiryActions.setInquiryFeedback(data.feedback))
            }

        } catch (error) {
            dispatch(inquiryActions.setInquiryNetworkStatus('fetch-inquiry-feedback-error'))
        }
    })