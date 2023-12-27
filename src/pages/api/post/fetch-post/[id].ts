import { NextApiRequest, NextApiResponse } from 'next'
import connection from '../../../../database/connection'
import { Job, JobModel } from '../../../../models/post'
import { CreatorPage, Page, PageSchema } from '../../../../models/page/page.model'


async function fetchPost(req: NextApiRequest, res: NextApiResponse) {
    await connection()
    const postId = req.query.id
    try {
        const post = await JobModel.findOne({ postId: postId })
        if (post) {
            const page = await CreatorPage.findOne({pageId:post.author.pageId})
            if (page) {
                post.author.profileAsset = page.imageAssets.profile
                return res.json({ success: true, post })
            }
        }

    } catch (error: any) {
        console.log(error.message)
        return res.json({ error: true, message: error?.message })
    }
}

export default fetchPost