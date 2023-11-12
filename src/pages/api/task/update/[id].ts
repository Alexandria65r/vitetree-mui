import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import connection from '../../../../database/connection'
import { TaskSchema } from "../../../../database/schema";
import { notifyAPI } from "../../notification/helpers";
import { Task } from "../../../../models/task";




const UpdateTask: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connection()
    const id = req.query.id
    const updated: Task |null = await TaskSchema.findByIdAndUpdate({ _id: id }, req.body)



    if (updated) {
        if (req.body.status === 'task closed') {
            await notifyAPI(
                updated.tutorInfo.id,
                '',
                `/task/${id}`,
                'default-notification',
                'Task closed',
                `The task ${updated.service.label} has been set to close🎉`
            )

        }
        return res.json({
            success: true,
            updated
        })
    }


    // do some notifications based on the update status

    // status = task closed
    //etc..


}


export default UpdateTask