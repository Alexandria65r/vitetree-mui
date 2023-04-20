
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import connection from '../../../../database/connection'
import { Course } from "../../../../database/schema";


const FetchAll: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connection()
    const type = req.query.type || []
    const courses = await Course.find().where({ type }).exec()
    if (courses) {
        return res.json({
            success: true,
            courses
        })
    }
}


export default FetchAll