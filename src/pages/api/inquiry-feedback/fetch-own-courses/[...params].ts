import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import connection from '../../../../database/connection'
import { Course } from "../../../../database/schema";




const fetchOwnCourses: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connection()
    const params: any = req.query.params || [];
    const courses = await Course.find().where({authorId: params[0], type:params[1] })
    console.log(params)
    if (courses) {
        return res.json({
            success: true,
            courses
        })
    }
}


export default fetchOwnCourses
