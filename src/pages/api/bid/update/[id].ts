import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import connection from '../../../../database/connection'
import { BidSchema } from "../../../../database/schema";




const UpdateBid: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connection()
    const _id = req.query.id
    const updated = await BidSchema.findByIdAndUpdate({ _id }, req.body)
    if (updated) {
        return res.json({
            success: true,
            updated
        })
    }
}


export default UpdateBid