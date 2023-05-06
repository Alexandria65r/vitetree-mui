import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import connection from '../../../../database/connection'
import { Inquiry } from "../../../../database/schema";
const DeleteInquiry: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {

    await connection()
    const _id = req.query.id
    const deleted = await Inquiry.findByIdAndRemove({ _id })

    if (deleted) {
        res.json({ success: true })
    }
}
export default DeleteInquiry