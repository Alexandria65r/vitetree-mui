import type { NextApiRequest, NextApiResponse } from 'next'
import nodeMailer from 'nodemailer'
import { InviteMember } from '../../../reusable/interfaces'
import connection from '../../../database/connection'


type Data = {
    projectName: string
}
export default async function sendEmail(req: NextApiRequest, res: NextApiResponse) {
    await connection()
    const newIvitation: InviteMember = req.body
    const transporter = nodeMailer.createTransport({
        host: 'mail.privateemail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'notifications@vitetree.com',
            pass: 'Alex@8265'
        }
    })


    const info = await transporter.sendMail({
        to: newIvitation.email,
        from: `"${newIvitation.author} via vitetree.com" <notifications@vitetree.com>`,
        subject: 'Invite team members',
        //text: 'vitetree email notifications✅',
        html: newIvitation.message

    })




    res.json({
        success: true,
        message: 'attempting to send an email'
    })



    //transporter.verify()

}