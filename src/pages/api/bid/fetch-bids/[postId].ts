
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import connection from '../../../../database/connection'
import { BidSchema } from "../../../../database/schema";


const FetchBids: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connection()
   
    const postId = req.query.postId || []
    const token = req.headers.authorization;
    if (token) {
        const bids = await BidSchema.find().where({ postId }).exec()
        if (bids) {
            return res.json({
                success: true,
                bids
            })
        }
    } else {
        return res.json({
            error: true,
            message: 'not authorized'
        })
    }
}


export default FetchBids