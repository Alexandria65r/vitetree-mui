import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import connection from '../../../../database/connection'
import { TaskSchema } from "../../../../database/schema";




const UpdateTask: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connection()
    const id = req.query.id
    const updated = await TaskSchema.findByIdAndUpdate({ _id: id }, req.body)
    if (updated) {
        return res.json({
            success: true,
            updated
        })
    }
}


export default UpdateTask