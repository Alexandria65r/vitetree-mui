import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import connection from '../../../database/connection'
import { Course } from '../../../database/schema'


const CreateTest: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connection()
    const courseData = req.body
    try {
        const newCourse = await Course.create(courseData)
        if (newCourse) {
            return res.json({
                success: true,
                newCourse
            })
        }

    } catch (error) {
        return res.json({
            error: true,
            message: 'an error has occured'
        })
    }
}


export default CreateTest