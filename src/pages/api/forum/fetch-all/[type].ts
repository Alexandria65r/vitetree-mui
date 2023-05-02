
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import connection from '../../../../database/connection'
import { Post } from "../../../../database/schema";


const FetchAll: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connection()
    const type = req.query.type || []
    if (type === 'all') {
        const posts = await Post.find({})
        if (posts) {
            return res.json({
                success: true,
                posts
            })
        }
    } else {
        const posts = await Post.find().where({ type }).exec()
        if (posts) {
            return res.json({
                success: true,
                posts
            })
        }
    }

}


export default FetchAll