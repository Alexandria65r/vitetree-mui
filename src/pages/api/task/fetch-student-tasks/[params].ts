
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import connection from '../../../../database/connection'
import { TaskSchema } from "../../../../database/schema";



const FetchTutorTasks: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connection()
    let tasks = []
    const params = req.query.params || []
    
    if (params[0] === 'all') {
        tasks = await TaskSchema.find().where({"studentInfo.id": params[1] }).exec()
    } else {
        tasks = await TaskSchema.find().where({ "studentInfo.id": params[1] }).where({ status: params[0] }).exec()
    }

    if (tasks) {
        return res.json({
            success: true,
            tasks
        })
    }
}


export default FetchTutorTasks