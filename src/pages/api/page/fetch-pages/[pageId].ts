import { NextApiRequest, NextApiResponse } from 'next'
import { CreatorPage } from '../../../../models/page/page.model'



async function fetchPages(req: NextApiRequest, res: NextApiResponse) {
    const pageId = req.query.pageId
    try {
        const pages = await CreatorPage.find({  })
        if (pages) {
            return res.json({ success: true, pages })
        }

    } catch (error: any) {
        return res.json({ error: true, message: error?.message })
    }
}


export default fetchPages