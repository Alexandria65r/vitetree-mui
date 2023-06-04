import { NextApiRequest, NextApiResponse } from "next";
import { CardSchema } from "../../../../database/schema";


export default async function (req: NextApiRequest, res: NextApiResponse) {
    const _id = req.query.id
    const card = await CardSchema.findById({ _id })

    if (card) {
        return res.status(200).json({
            success: true,
            card
        })
    }
}