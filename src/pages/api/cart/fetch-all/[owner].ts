
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import connection from '../../../../database/connection'
import { CartItem } from "../../../../database/schema";


const FetchAll: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connection()
    const owner = req.query.owner || []
    const cartItems = await CartItem.find().where({ owner }).exec()
    if (cartItems) {
        return res.json({
            success: true,
            cartItems
        })
    }
}


export default FetchAll