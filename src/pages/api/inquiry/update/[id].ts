import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import connection from '../../../../database/connection'
import { Inquiry } from "../../../../database/schema";



const UpdateTest: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connection()
    const id = req.query.id
    const updated = await Inquiry.findByIdAndUpdate({ _id: id }, req.body)
    if (updated) {
        return res.json({
            success: true,
            updated
        })
    }
}


export default UpdateTest