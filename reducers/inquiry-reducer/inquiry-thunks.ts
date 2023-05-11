import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppState } from "../../store/store";
import InquiryAPI from "../../src/api-services/inquiry";
import { inquiryActions } from ".";



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