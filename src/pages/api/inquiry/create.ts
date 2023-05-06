import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import connection from '../../../database/connection'
import { Inquiry } from '../../../database/schema'


const CreateInquiry: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connection()
    const inquiryData = req.body
    try {
        const newInquiry = await Inquiry.create(inquiryData)
        if (newInquiry) {
            return res.json({
                success: true,
                newInquiry
            })
        }

    } catch (error) {
        return res.json({
            error: true,
            message: 'an error has occured'
        })
    }
}


export default CreateInquiry