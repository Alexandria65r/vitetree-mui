
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import connection from '../../../../database/connection'
import { Course } from "../../../../database/schema";
import { normalizedCoursesWithTutorPhotoURL } from "../../helpers";
import { VideoCourse } from "../../../../reusable/interfaces";


const FetchAll: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connection()
    const type = req.query.type || []
    const raw_courses: VideoCourse | any = await Course.find().where({ type }).exec()
    const courses = await normalizedCoursesWithTutorPhotoURL(raw_courses)
    if (courses) {
        return res.json({
            success: true,
            courses
        })
    }
}


export default FetchAll