import { NextApiRequest, NextApiResponse } from 'next'
import connection from '../../../../database/connection'
import { PostModel } from '../../../../models/post'


async function fetchPosts(req: NextApiRequest, res: NextApiResponse) {
    await connection()
    const limit = req.query.limit
    try {
        const posts = await PostModel.find({  })
        if (posts) {
            return res.json({ success: true, posts })
        }

    } catch (error: any) {
        return res.json({ error: true, message: error?.message })
    }
}

export default fetchPosts