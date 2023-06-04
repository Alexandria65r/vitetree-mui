import { NextApiRequest, NextApiResponse } from "next";
import { CardSchema } from "../../../database/schema";


export default async function (req: NextApiRequest, res: NextApiResponse) {
    const newCard = await CardSchema.create(req.body)

    if (newCard) {
        return res.status(201).json({
            success: true,
            newCard
        })
    }
}