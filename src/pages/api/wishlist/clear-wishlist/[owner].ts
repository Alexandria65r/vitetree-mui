import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import connection from '../../../../database/connection'
import { WishListItem } from "../../../../database/schema";


const ClearCart: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connection()
    const owner = req.query.owner
    const deleted = await WishListItem.deleteMany().where({ owner }).exec()
    if (deleted) {
        res.json({ success: true })
    }
}


export default ClearCart