
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import connection from '../../../../database/connection'
import { TaskUpdateSchema } from "../../../../database/schema";


const FetchTasks: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connection()
    const taskId = req.query.taskId || []
    const token = req.headers.authorization;
    if (token) {
      
        const taskUpdates = await TaskUpdateSchema.find().where({taskId}).exec()
      
        if (taskUpdates) {
            return res.json({
                success: true,
                taskUpdates
            })
        }
    } else {
        return res.json({
            error: true,
            message: 'not authorized'
        })
    }
}


export default FetchTasks