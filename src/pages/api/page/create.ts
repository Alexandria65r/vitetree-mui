import { NextApiRequest, NextApiResponse } from 'next'
import { CreatorPage, Page } from '../../../models/page/page.model'
import { UserModel } from '../../../models/user'

async function createPage(req: NextApiRequest, res: NextApiResponse) {
    try {
        const newPage: Page = await CreatorPage.create(req.body)
        console.log(newPage)

        if (newPage) {
            await UserModel.findByIdAndUpdate({_id:newPage.author.id}, { pageId: newPage.pageId })
            return res.json({ success: true, newPage })
        }

    } catch (error: any) {
        return res.json({ error: true, message: error?.message })
    }
}


export default createPage