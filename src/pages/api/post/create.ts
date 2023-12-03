import { NextApiRequest, NextApiResponse } from 'next'
import { Page } from '../../../models/page/page.model'
import { PostModel } from '../../../models/post'

async function createPost(req: NextApiRequest, res: NextApiResponse) {
    try {
        const newPost: Page = await PostModel.create(req.body)

        if (newPost) {
            return res.json({ success: true, newPost })
        }
    } catch (error: any) {
        return res.json({ error: true, message: error?.message })
    }
}


export default createPost