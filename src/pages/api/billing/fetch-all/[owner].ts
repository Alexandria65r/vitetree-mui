import { NextApiRequest, NextApiResponse } from "next";
import { CardSchema } from "../../../../database/schema";


export default async function (req: NextApiRequest, res: NextApiResponse) {
    const owner = req.query.owner
    const cards = await CardSchema.find().where({ owner })

    if (cards) {
        return res.status(200).json({
            success: true,
            cards
        })
    }
}