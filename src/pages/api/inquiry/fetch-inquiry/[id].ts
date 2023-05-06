import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import connection from '../../../../database/connection'
import { Inquiry } from "../../../../database/schema";




const fetchOwnInquiry: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connection()
    const _id: any = req.query.id || [];
    const inquiry = await Inquiry.findById({_id})

    if (inquiry) {
        return res.status(200).json({
            success: true,
            inquiry
        })
    }
}


export default fetchOwnInquiry
