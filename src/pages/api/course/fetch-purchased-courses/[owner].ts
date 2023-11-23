import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import connection from '../../../../database/connection'
import { Course, User } from "../../../../database/schema";
import { normalizedCoursesWithTutorPhotoURL } from "../../helpers";
import { VideoCourse } from "../../../../reusable/interfaces";


const fetchPurchasedCourses: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connection()
    const owner: any = req.query.owner || [];
    const coursesAll = await Course.find({ type: 'introduction' })

    console.log(owner)
    const user = await User.findById({ _id: owner });

    if (user) {
        const ids: string[] = user.courses ?? []
        const raw_courses: VideoCourse[] = []

        for (let i = 0; i < ids?.length; i++) {
            const course: VideoCourse | any = coursesAll.find((item) => item._id === ids[i]);
            if (course) {
                raw_courses.push(course)
            }
        }

        if (raw_courses) {
            const courses = await normalizedCoursesWithTutorPhotoURL(raw_courses)
            return res.json({
                success: true,
                courses
            })
        }
    }

}


export default fetchPurchasedCourses
