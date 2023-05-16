
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import connection from '../../../../database/connection'
import { TaskSchema } from "../../../../database/schema";
import { GetAuthUser } from "../../auth/helpers";


const FetchTasks: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connection()
    let tasks = []
    const params = req.query.params || []
    const token = req.headers.authorization;
    if (token) {
        const user = await GetAuthUser(token)
        let path: any = { 'tutorInfo.id': user?._id }
        if (user?.role === 'student') {
            path = { 'studentInfo.id': user?._id }
        }

        if (params[0] === 'all') {
            tasks = await TaskSchema.find().where(path).exec()
        } else {
            tasks = await TaskSchema.find().where(path).where({ status: params[0] }).exec()
        }

        if (tasks) {
            return res.json({
                success: true,
                tasks
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