import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import connection from '../../../../database/connection'
import { Inquiry } from "../../../../database/schema";




const fetchOwnInquiries: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connection()
    const tutorId: any = req.query.tutorId || [];
    const inquiries = await Inquiry.find().where({ tutorId })

    if (inquiries) {
        return res.status(200).json({
            success: true,
            inquiries
        })
    }
}


export default fetchOwnInquiries
