import { createAsyncThunk } from "@reduxjs/toolkit"
import CourseAPI from "../../src/api-services/course"
import { AppState } from "../../store/store"
import { courseActions } from "."


export const fetchPurchasedCourses = createAsyncThunk<void, undefined, { state: AppState }>
    ('authSlice/fetchPurchasedCourses', async (_,thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const state = thunkAPI.getState()
        const user = state.AuthReducer.user
        try {
            const courses = await CourseAPI.fetchPurchasedCourses(user._id ?? '')
            if (courses) {
                dispatch(courseActions.setCourses(courses))
            }
        } catch (error) {

        }
    })