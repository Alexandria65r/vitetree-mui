import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../../../database/schema";



export default async function UpdateUser(
    req: NextApiRequest,
    res: NextApiResponse) {
    const update = req.body
    const _id = req.query.id
    const updated = await User.findByIdAndUpdate({ _id }, update);
    if (updated) {
        res.status(201).json({
            success: true,
            updated
        })
    }

}