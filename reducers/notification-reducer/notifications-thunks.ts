import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppState } from "../../store/store";
import NotificationsAPI from "../../src/api-services/notification";
import { inquiryActions } from "../inquiry-reducer";
import { notificationActions } from ".";




export const fetchNotificationsThunk = createAsyncThunk<void, undefined, { state: AppState }>
    ('notificationsSlice/fetchNotificationsThunk', async (_, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const state = thunkAPI.getState()
        const user = state.AuthReducer.user
        try {
            dispatch(notificationActions.setNotificationNetworkStatus('fetch-notifications'))
            const notifications = await NotificationsAPI.fetchAll(user._id ?? '')
            if (notifications) {
                dispatch(notificationActions.setNotificationNetworkStatus('fetch-notifications-success'))
                dispatch(notificationActions.setNotifications(notifications))
            }
        } catch (error) {
            dispatch(notificationActions.setNotificationNetworkStatus('fetch-notifications-error'))
        }


    })