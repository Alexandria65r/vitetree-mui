import { NextApiRequest, NextApiResponse } from 'next'
import { CreatorPage } from '../../../../models/page/page.model';



async function updatePage(req: NextApiRequest, res: NextApiResponse) {
    const pageId = req.query.pageId
    try {
        const updated = await CreatorPage.findOneAndUpdate({ pageId }, req.body);
        if (updated) {
            return res.json({ success: true })
        }

    } catch (error: any) {
        return res.json({ error: true, message: error?.message })
    }
}


export default updatePage