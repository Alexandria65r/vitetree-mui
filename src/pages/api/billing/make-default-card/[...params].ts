import { NextApiRequest, NextApiResponse } from "next";
import { CardSchema } from "../../../../database/schema";


export default async function (req: NextApiRequest, res: NextApiResponse) {
    const [_id, owner]: any = req.query.params
    //rest all first
    const updateAll = await CardSchema.updateMany({ owner }, { preffered: false })

    if (updateAll) {
        const updated = await CardSchema.findByIdAndUpdate({ _id }, { preffered: true })
        if (updated) {
            return res.status(200).json({
                success: true,
                updated
            })
        }
    }
}