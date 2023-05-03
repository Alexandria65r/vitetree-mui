
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import connection from '../../../../database/connection'
import { Post } from "../../../../database/schema";


const FetchOwnPosts: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connection()
    const params = req.query.params || []
    if (params[1] === 'all') {
        const posts = await Post.find({}).where({ authorId: params[0] })
        if (posts) {
            return res.json({
                success: true,
                posts
            })
        }
    } else {
        const posts = await Post.find().where({ authorId: params[0], type: params[1] }).exec()
        if (posts) {
            return res.json({
                success: true,
                posts
            })
        }
    }

}


export default FetchOwnPosts