
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import connection from '../../../../database/connection'
import { NotificationSchema } from "../../../../database/schema";



const FetchAll: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connection()
    const owner = req.query.owner || []
    const notifications = await NotificationSchema.find().where({ owner }).exec()
    if (notifications) {
        return res.json({
            success: true,
            notifications
        })
    }
}


export default FetchAll