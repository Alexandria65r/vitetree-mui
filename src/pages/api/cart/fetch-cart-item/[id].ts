import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import connection from '../../../../database/connection'
import { CartItem } from "../../../../database/schema";




const FetchCartItem: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connection()
    const _id: any = req.query.id || [];
    const cartItem = await CartItem.findById({ _id })
    if (cartItem) {
        return res.json({
            success: true,
            cartItem
        })
    }
}


export default FetchCartItem