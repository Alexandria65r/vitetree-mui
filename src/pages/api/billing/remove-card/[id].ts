import { NextApiRequest, NextApiResponse } from "next";
import { CardSchema } from "../../../../database/schema";


export default async function (req: NextApiRequest, res: NextApiResponse) {
    const _id = req.query.id
    const removed = await CardSchema.findByIdAndRemove({_id})

    if (removed) {
        return res.status(200).json({
            success: true,
            removed
        })
    }
}