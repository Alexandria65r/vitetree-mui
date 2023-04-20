import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import connection from '../../../../database/connection'
import { Course } from "../../../../database/schema";




const FetchCourse: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connection()
    const params: any = req.query.params || [];
    const course = await Course.findById({ _id: params[0] })
    console.log(params)
    if (course) {
        return res.json({
            success: true,
            course
        })
    }
}


export default FetchCourse