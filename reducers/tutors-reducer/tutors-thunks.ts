import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppState } from "../../store/store";
import AuthAPI from "../../src/api-services/auth";
import { tutorsActions } from ".";

export const fetchTutorsThunk = createAsyncThunk<void, undefined, { state: AppState }>
    ('tutorsSlice/fetchTutors', async (_, thunkAPI) => {
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