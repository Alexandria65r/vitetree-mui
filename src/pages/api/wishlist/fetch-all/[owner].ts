
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import connection from '../../../../database/connection'
import { WishListItem } from "../../../../database/schema";


const FetchAll: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connection()
    const owner = req.query.owner || []
    const wishListItems = await WishListItem.find().where({ owner }).exec()
    if (wishListItems) {
        return res.json({
            success: true,
            wishListItems
        })
    }
}


export default FetchAll