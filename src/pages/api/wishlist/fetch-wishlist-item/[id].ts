import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import connection from '../../../../database/connection'
import { WishListItem } from "../../../../database/schema";




const FetchWishListItem: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connection()
    const _id: any = req.query.id || [];
    const wishListItem = await WishListItem.findById({ _id })
    if (wishListItem) {
        return res.json({
            success: true,
            wishListItem
        })
    }
}


export default FetchWishListItem