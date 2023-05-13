import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import connection from '../../../database/connection'
import { NotificationSchema } from "../../../database/schema";



const CreateTest: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connection()
    const notificationData = req.body
    try {
        const newNotification = await NotificationSchema.create(notificationData)
        if (newNotification) {
            return res.json({
                success: true,
                newNotification
            })
        }

    } catch (error) {
        return res.json({
            error: true,
            message: 'an error has occured'
        })
    }
}


export default CreateTest