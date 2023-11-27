import { NextApiRequest, NextApiResponse } from "next";
import { UserModel } from "../../../../models/user";



export default async function FetchUser(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const _id = req.query.id || [];
    const user:any = await UserModel.findById({_id})
    if (user) {
      
        return res.status(200).json({
            success: true,
            user
        })
    }
}

