import { NextApiRequest, NextApiResponse } from 'next'
import { CreatorPage } from '../../../../models/page/page.model'
import connection from '../../../../database/connection'



async function fetchPage(req: NextApiRequest, res: NextApiResponse) {
    await connection()
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