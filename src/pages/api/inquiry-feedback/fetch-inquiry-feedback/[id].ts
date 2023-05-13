import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import connection from '../../../../database/connection'
import { InquiryFeedbackSchema } from "../../../../database/schema";


const FetchInquiryFeedback: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connection()
    const _id: any = req.query.id || [];
    const feedback = await InquiryFeedbackSchema.findById({ _id })
    if (feedback) {
        return res.json({
            success: true,
            feedback
        })
    }
}

export default FetchInquiryFeedback