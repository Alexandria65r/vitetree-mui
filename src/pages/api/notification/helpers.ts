//NOTE: TODO ids to change to @username protocal

import { NotificationSchema } from "../../../database/schema"
import { Notification, NotificationType } from "../../../models/notifications"



export async function notifyAPI(
    toId: string,
    refId: string,
    type: NotificationType,
    title: string,
    description: string) {

    const notification: Notification = {
        owner: toId,
        refId,
        title,
        type,
        description
    }
    const newNotification = await NotificationSchema.create(notification)
    if (newNotification) {
        console.log(newNotification)
    }
}