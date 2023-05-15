import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppState } from "../../store/store";
import AuthAPI from "../../src/api-services/auth";
import { tutorsActions } from ".";
import InquiryAPI from "../../src/api-services/inquiry";
import { inquiryActions } from "../inquiry-reducer";

export const fetchTutorsThunk = createAsyncThunk<void, undefined, { state: AppState }>
    ('tutorsSlice/fetchTutorsThunk', async (_, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        try {
            dispatch(tutorsActions.setTutorsNetworkStatus('fetching-tutors'))
            const tutors = await AuthAPI.fetchAll('tutor')
            if (tutors) {
                dispatch(tutorsActions.setTutorsNetworkStatus('fetching-tutors-success'))
                dispatch(tutorsActions.setTutors(tutors))
            }

        } catch (error) {
            dispatch(tutorsActions.setTutorsNetworkStatus('fetching-tutors-error'))
        }
    })
    
export const fetchTutorThunk = createAsyncThunk<void, string, { state: AppState }>
    ('tutorsSlice/fetchTutorThunk', async (tutorId, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        try {
            dispatch(tutorsActions.setTutorsNetworkStatus('fetching-tutor'))
            const tutor = await AuthAPI.fetchUser(tutorId)
            if (tutor) {
                dispatch(tutorsActions.setTutorsNetworkStatus('fetching-tutor-success'))
                dispatch(tutorsActions.setTutor(tutor))
            }

        } catch (error) {
            dispatch(tutorsActions.setTutorsNetworkStatus('fetching-tutor-error'))
        }
    })

export const fetchInquiredTutorsThunk = createAsyncThunk<void, undefined, { state: AppState }>
    ('tutorsSlice/fetchInquiredTutorsThunk', async (_, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const state = thunkAPI.getState()
        const authorId = state.AuthReducer.user._id ?? ''
        try {
            dispatch(tutorsActions.setTutorsNetworkStatus('fetching-tutors'))
            const tutors = await AuthAPI.fetchInquired(authorId)
            if (tutors) {
                dispatch(tutorsActions.setTutorsNetworkStatus('fetching-tutors-success'))
                dispatch(tutorsActions.setTutors(tutors))
            }
        } catch (error) {
            dispatch(tutorsActions.setTutorsNetworkStatus('fetching-tutors-error'))
        }
    })

export const fetchInquiryThunk = createAsyncThunk<void, string, { state: AppState }>
    ('tutorsSlice/fetchInquiryThunk', async (inquiryId, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const state = thunkAPI.getState()
        try {
             dispatch(inquiryActions.setInquiryNetworkStatus('fetch-inquiry'))
            const inquiry = await InquiryAPI.fetchInquiry(inquiryId)
            if (inquiry) {
                dispatch(inquiryActions.setInquiryNetworkStatus('fetch-inquiry-success'))
                dispatch(inquiryActions.setInquiry(inquiry))
            }
        } catch (error) {
             dispatch(inquiryActions.setInquiryNetworkStatus('fetch-inquiry-error'))
        }
    })


