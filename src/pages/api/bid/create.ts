import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import connection from '../../../database/connection'
import { BidSchema } from "../../../database/schema";
import { notifyAPI } from "../notification/helpers";
import { Bid } from "../../../models/bid";
import { hostname } from "os";
import { host } from "../../../reusable";



const CreateBid: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connection()
    const bid: Bid = req.body
    try {
        const newBid = await BidSchema.create(bid)
        if (newBid) {

            await notifyAPI(
                bid.postAuthorId,
                bid.postId,
                `/forum/all/details/applied/${bid.postId}/${newBid._id}`,
                'default-hired',
                'New bid',
                `You have a new bid in post..`
            )
        
            return res.json({
                success: true,
                newBid
            })
        }

    } catch (error) {
        return res.json({
            error: true,
            message: 'an error has occured'
        })
    }
}


export default CreateBid