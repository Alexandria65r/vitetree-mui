
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import connection from '../../../../database/connection'
import { AcademicAnswerSchema } from "../../../../database/schema";


const FetchAcademicAnswers: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connection()
   
    const postId = req.query.postId || []
    const token = req.headers.authorization;
    if (token) {
        const academicAnswers = await AcademicAnswerSchema.find().where({ postId }).exec()
        if (academicAnswers) {
            return res.json({
                success: true,
                academicAnswers
            })
        }
    } else {
        return res.json({
            error: true,
            message: 'not authorized'
        })
    }
}


export default FetchAcademicAnswers