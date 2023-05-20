import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import connection from '../../../../database/connection'
import { TaskSchema } from "../../../../database/schema";


const FetchTask: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connection()
    const _id: any = req.query.id || [];
    const task = await TaskSchema.findById({ _id })
    if (task) {
        return res.json({
            success: true,
            task
        })
    }
}


export default FetchTask