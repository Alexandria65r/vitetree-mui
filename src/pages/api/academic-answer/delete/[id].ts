import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import connection from '../../../../database/connection'
import { BidSchema } from "../../../../database/schema";


const DeleteBid: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connection()
    const _id = req.query.id
    const deleted = await BidSchema.findByIdAndRemove({ _id })
   
    if (deleted) {
        res.json({ success: true })
 
    }
}


export default DeleteBid