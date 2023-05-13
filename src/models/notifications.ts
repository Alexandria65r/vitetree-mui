import mongoose from "mongoose"
export type NotificationType = 'default' |
    'inquiry' |
    'inquiry-terms-feedback' |
    'inquiry-purchase-feedback' | ''


export interface Notification {
    _id?: string
    owner:string
    refId:string
    type: NotificationType
    title: string
    description: string
    createdAt?: string
}
export const NotificationModel: Notification = {
    _id: '',
    owner:'',
    refId:'',
    type: '',
    title: '',
    description: ''
}


