import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import connection from '../../../database/connection'
import { AcademicAnswerSchema } from "../../../database/schema";
import { notifyAPI } from "../notification/helpers";
import { AcademicAnswer } from "../../../models/academic-answer";




const CreateBid: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connection()
    const academicAnswer: AcademicAnswer = req.body
    try {
        const newAcademicAnswer = await AcademicAnswerSchema.create(academicAnswer)
        if (newAcademicAnswer){

            // await notifyAPI(
            //     bid.postAuthorId,
            //     bid.postId,
            //     `/forum/all/details/applied/${bid.postId}/${newAcademicAnswer._id}`,
            //     'default-hired',
            //     'New bid',
            //     `You have a new bid in post..`
            // )
        
            return res.json({
                success: true,
                newAcademicAnswer
            })
        }

    } catch (error) {
        return res.json({
            error: true,
            message: 'an error has occured'
        })
    }
}


export default CreateBid