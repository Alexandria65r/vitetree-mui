import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../../../database/schema";


export default async function FetchUser(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const _id = req.query.id || [];
    const user:any = await User.findById({_id})
    if (user) {
      
        return res.status(200).json({
            success: true,
            user
        })
    }
}

