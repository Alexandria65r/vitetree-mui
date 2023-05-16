import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import connection from '../../../database/connection'
import { TaskSchema } from "../../../database/schema";
import { notifyAPI } from "../notification/helpers";
import { Task } from "../../../models/task";



const CreateTest: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connection()
    const task: Task = req.body
    try {
        const newTask = await TaskSchema.create(task)
        if (newTask) {


            await notifyAPI(
                task.studentInfo.id,
                '',
                'default-hired',
                'Your hiring was successfull🎉',
                `Hi ${task.studentInfo.name}!, You have successfully hired tutor ${task.tutorInfo.name}
                 for for the service you inquired "${task.service.label}". Service is expected to be 
                 delivered by ${task.dueDate}.To see updates and progress about this hiring go to hired.
                `
            )
            await notifyAPI(
                task.tutorInfo.id,
                '',
                'default-hired',
                'Youre hired!💰',
                `Hi ${task.tutorInfo.name}!, student ${task.studentInfo.name} has successfully
                 hired you for for the service inquired "${task.service.label}", service is 
                expected to be delivered by ${task.dueDate}. To see the task go to tasks and
                 update your student for any progress.
                `
            )
            return res.json({
                success: true,
                newTask
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