import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import connection from '../../../../database/connection'
import { Course } from "../../../../database/schema";



const UpdateTest: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connection()
    const id = req.query.id
    const updated = await Course.findByIdAndUpdate({ _id: id }, req.body)
    if (updated) {
        return res.json({
            success: true,
            updated
        })
    }
}


export default UpdateTest