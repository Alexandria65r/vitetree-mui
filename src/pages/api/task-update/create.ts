import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import connection from '../../../database/connection'
import { TaskSchema, TaskUpdateSchema } from "../../../database/schema";
import { notifyAPI } from "../notification/helpers";
import { Task } from "../../../models/task";
import { TaskUpdate } from "../../../models/task-update";

const CreateTest: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connection()
    const taskUpdate: TaskUpdate = req.body
    try {
        const newTaskUpdate = await TaskUpdateSchema.create(taskUpdate)
        if (newTaskUpdate) {
            notifyAPI(taskUpdate.notifyId,
                taskUpdate.taskId,
                'default-notification',
                `New task update in Task ${taskUpdate.service}`,
                `${taskUpdate.author.userName} wrote an update in Task ${taskUpdate.service}`)
            return res.json({
                success: true,
                newTaskUpdate
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