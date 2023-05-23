import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import connection from '../../../../database/connection'
import { BidSchema } from "../../../../database/schema";


const FetchBid: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connection()
    const _id: any = req.query.id || [];
    const bid = await BidSchema.findById({ _id })
    if (bid) {
        return res.json({
            success: true,
            bid
        })
    }
}


export default FetchBid