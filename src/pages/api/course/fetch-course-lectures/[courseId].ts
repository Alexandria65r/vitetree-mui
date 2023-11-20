import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import connection from '../../../../database/connection'
import { Course } from "../../../../database/schema";




const FetchCourseLectures: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connection()
    const courseId: any = req.query.courseId || []
    const lectures = await Course.find().where({ courseId: courseId })
   
    if (lectures) {
        return res.json({
            success: true,
            lectures
        })
    }
}


export default FetchCourseLectures