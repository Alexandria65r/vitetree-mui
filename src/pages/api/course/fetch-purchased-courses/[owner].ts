import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import connection from '../../../../database/connection'
import { Course, User } from "../../../../database/schema";


const fetchPurchasedCourses: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connection()
    const owner: any = req.query.owner || [];
    const coursesAll = await Course.find({ type: 'introduction' })
    console.log(owner)
    const user = await User.findById({ _id: owner });

    if (user) {
        const ids: string[] = user.courses ?? []
        const courses = []

        for (let i = 0; i < ids?.length; i++) {
            const course = coursesAll.find((item) => item._id === ids[i]);
            if (course) {
                courses.push(course)
            }
        }

        if (courses) {
            return res.json({
                success: true,
                courses
            })
        }
    }

}


export default fetchPurchasedCourses
