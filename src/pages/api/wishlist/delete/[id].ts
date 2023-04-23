import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import connection from '../../../../database/connection'
import { WishListItem } from "../../../../database/schema";


const DeleteTest: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connection()
    const _id = req.query.id
    const deleted = await WishListItem.findByIdAndRemove({ _id })
    if (deleted) {
        res.json({ success: true })
    }
}


export default DeleteTest