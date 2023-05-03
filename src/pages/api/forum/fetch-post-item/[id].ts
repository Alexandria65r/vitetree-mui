import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import connection from '../../../../database/connection'
import { Post } from "../../../../database/schema";




const FetchPostItem: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connection()
    const _id: any = req.query.id || [];
    const post = await Post.findById({ _id })
   
    if (post) {
        return res.json({
            success: true,
            post
        })
    }
}


export default FetchPostItem