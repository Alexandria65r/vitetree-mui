import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import connection from '../../../database/connection'
import { InquiryFeedbackSchema, NotificationSchema, User } from "../../../database/schema";
import { InquiryFeedback } from "../../../models/inquiry-feedback";
import { Notification, NotificationModel, NotificationType } from "../../../models/notifications";
import { ObjMapperSingle } from "../../../database/objectMapper";
import moment from "moment";


const CreateTest: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connection()
    const feedbackData: InquiryFeedback = req.body
    try {
        const newInquiryFeedback = await InquiryFeedbackSchema.create(feedbackData)
        if (newInquiryFeedback) {
            const type: any = `inquiry-${feedbackData.type}-feedback`
            const { from, to } = await getUsers(
                feedbackData.tutorId,
                feedbackData.studentId
            )
            if (from) {
                await notificationAPI(
                    feedbackData.studentId,
                    feedbackData._id,
                    type,
                    'You have a new service inquiry feedback',
                    `Tutor ${from.firstName} ${from.lastName} has responded to 
                    the service you inquired for "${feedbackData.service.label}"`
                )
            }
            return res.json({
                success: true,
                newInquiryFeedback
            })
        }



    } catch (error) {
        console.log(error)
        return res.json({
            error: true,
            message: 'an error has occured'
        })
    }
}


export default CreateTest

//NOTE: TODO ids to change to @username protocal
async function notificationAPI(
    toId: string,
    refId:string,
    type: NotificationType,
    title: string,
    description: string) {

    const notification: Notification = {
        owner: toId ?? '',
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

async function getUsers(fromId: string, toId: string) {
    const fromUserRaw = await User.findById({ _id: fromId });
    const toUserRaw = await User.findById({ _id: toId });
    const from = ObjMapperSingle(fromUserRaw)
    const to = ObjMapperSingle(toUserRaw)
    return { from, to };
}


