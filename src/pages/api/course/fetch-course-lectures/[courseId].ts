import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import connection from '../../../../database/connection'
import { Course } from "../../../../database/schema";
import { normalizedCoursesWithTutorPhotoURL } from "../../helpers";
import { VideoCourse } from "../../../../reusable/interfaces";




const FetchCourseLectures: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connection()
    const courseId: any = req.query.courseId || []
    const raw_lectures:VideoCourse[] |any = await Course.find().where({ courseId: courseId })

    const lectures = await normalizedCoursesWithTutorPhotoURL(raw_lectures)
    if (lectures) {
        return res.json({
            success: true,
            lectures
        })
    }
}


export default FetchCourseLectures