import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import connection from '../../../../database/connection'
import { Course } from "../../../../database/schema";
import { normalizedCoursesWithTutorPhotoURL } from "../../helpers";




const fetchOwnCourses: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connection()
    const params: any = req.query.params || [];
    const raw_courses: any = await Course.find().where({ 'author.authorId': params[0], type: params[1] })

    const courses = await normalizedCoursesWithTutorPhotoURL(raw_courses)

    console.log(params)
    if (courses) {
        return res.json({
            success: true,
            courses
        })
    }
}


export default fetchOwnCourses
