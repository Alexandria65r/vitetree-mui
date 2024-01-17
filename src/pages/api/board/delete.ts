import { NextApiRequest, NextApiResponse } from 'next'
import { CreatorPage } from '../../../models/page/page.model';



async function deletePage(req: NextApiRequest, res: NextApiResponse) {
    try {
        const deleted = await CreatorPage.findByIdAndRemove(req.query.id);
        if (deleted) {
            return res.json({
                success: true,
                deleted,
                message: 'Your page was deleted successfully'
            })
        }

    } catch (error: any) {
        return res.json({ error: true, message: error?.message })
    }
}


export default deletePage