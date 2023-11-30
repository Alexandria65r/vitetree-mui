import { NextApiRequest, NextApiResponse } from 'next'
import { CreatorPage } from '../../../../models/page/page.model'
import connection from '../../../../database/connection'


async function fetchPages(req: NextApiRequest, res: NextApiResponse) {
    await connection()
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