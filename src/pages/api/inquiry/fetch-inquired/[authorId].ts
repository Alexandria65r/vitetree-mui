import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import connection from '../../../../database/connection'
import { Inquiry, User } from "../../../../database/schema";
import { StudentInquiry, User as TypedUser } from "../../../../reusable/interfaces";
import { ObjMapper } from "../../../../database/objectMapper";





const fetchOwnInquiry: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connection()
    const authorId: any = req.query.authorId || [];
    const inquiries: any = await Inquiry.find().where({ authorId }).exec()
    // console.log(inquiries )
    if (inquiries) {
        const tutors = await InquiredTutor(inquiries)
        return res.status(200).json({
            success: true,
            tutors
        })
    }
}


async function InquiredTutor(inquiries: StudentInquiry[]) {
    const tutors: TypedUser[] = []
    const rawTutors: any = await User.find().where({ role: 'tutor' }).exec()
    const allTutors = ObjMapper(rawTutors)
    inquiries.forEach((inc) => {
        const tutor:TypedUser | any = allTutors.find((tut: TypedUser) => tut._id === inc.authorId)
        if (tutor) {
            tutors.push({
                ...tutor,
                tutorInfo: { ...tutor?.tutorInfo,  inquiryId: inc._id },
            })
        }
    })

    return tutors
}


export default fetchOwnInquiry
