import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppState } from "../../store/store";
import InquiryAPI from "../../src/api-services/inquiry";
import { inquiryActions } from ".";
import axios from 'axios'
import { InquiryFeedback } from "../../src/models/inquiry-feedback";


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
            dispatch(inquiryActions.setInquiryNetworkStatus('send-inquiry-feedback-error'))
        }
    })