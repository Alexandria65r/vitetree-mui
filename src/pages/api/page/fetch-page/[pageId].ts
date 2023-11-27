import { NextApiRequest, NextApiResponse } from 'next'
import { CreatorPage } from '../../../../models/page/page.model'



async function fetchPage(req: NextApiRequest, res: NextApiResponse) {
    const pageId = req.query.pageId
    try {
        const page = await CreatorPage.findOne({ pageId })
        if (page) {
            return res.json({ success: true, page })
        }

    } catch (error: any) {
        return res.json({ error: true, message: error?.message })
    }
}


export default fetchPage