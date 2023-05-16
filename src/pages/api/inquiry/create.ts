import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import connection from '../../../database/connection'
import { Inquiry, User } from '../../../database/schema'
import { Inquired, StudentInquiry, User as TypedUser } from "../../../reusable/interfaces";


const CreateInquiry: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connection()
    const inquiryData: StudentInquiry = req.body
    try {
        const newInquiry = await Inquiry.create(inquiryData)
        const updated = await updateUserInquiredList(inquiryData)
        if (newInquiry) {
            return res.json({
                success: true,
                newInquiry,
                updated
            })
        }

    } catch (error) {
        return res.json({
            error: true,
            message: 'an error has occured'
        })
    }
}


async function updateUserInquiredList(inquiryData: StudentInquiry) {
    const user = await User.findById({ _id: inquiryData.authorId })
    if (user) {
        const inquired: Inquired = {
            inquiryId: inquiryData._id,
            tutorId: inquiryData.tutorId,
            status: 'active'
        }
        //NOTE: inquiryList to be seperated into collection
        const inquiredList = [...user?.inquiredList ?? [], inquired]
        user.inquiredList = inquiredList;
        const updated = await user?.save()
        return updated
    }
}


export default CreateInquiry