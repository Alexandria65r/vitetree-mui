import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import connection from '../../../database/connection'
import { WishListItem } from '../../../database/schema'


const CreateWishListItem: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connection()
    const newItem = req.body
    try {
        const wishListItem = await WishListItem.create(newItem)
        if (wishListItem) {
            return res.json({
                success: true,
                wishListItem
            })
        }

    } catch (error) {
        return res.json({
            error: true,
            message: 'an error has occured'
        })
    }
}


export default CreateWishListItem