import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Notification, NotificationModel } from '../../src/models/notifications'

type NotificationNetworkStatus =
    'creating-notification' |
    'creating-notification-success' |
    'creating-notification-error' | 'fetch-notifications' |
    'fetch-notifications-success' | 'fetch-notifications-error' | '' 
   


type NotificationState = {
    notification: Notification
    notifications: Notification[]
    isErr: boolean
    NotificationNetworkStatus: NotificationNetworkStatus

}
const initialState: NotificationState = {
    notification: NotificationModel,
    notifications: [],
    isErr: false,
    NotificationNetworkStatus: ''
}

const notificationSlice = createSlice({
    name: 'notificationSlice',
    initialState,
    reducers: {
        setNotification: (state, { payload }: PayloadAction<Notification>) => {
            state.notification = payload
        },
        setNotifications: (state, { payload }: PayloadAction<Notification[]>) => {
            state.notifications = payload
        },

        setError: (state, { payload }: PayloadAction<boolean>) => {
            state.isErr = payload
        },
        setNotificationNetworkStatus: (state, { payload }: PayloadAction<NotificationNetworkStatus>) => {
            state.NotificationNetworkStatus = payload
        }
    }
})



export const notificationActions = notificationSlice.actions
export default notificationSlice.reducer