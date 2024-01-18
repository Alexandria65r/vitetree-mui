import { NextApiRequest, NextApiResponse } from 'next'
import { ListGroupModel } from '../../../models/list-group';



async function deletePage(req: NextApiRequest, res: NextApiResponse) {
    try {
        const deleted = await ListGroupModel.findByIdAndRemove(req.query.id);
        if (deleted) {
            return res.json({
                success: true,
                deleted,
                message: 'Your list group was deleted successfully'
            })
        }

    } catch (error: any) {
        return res.json({ error: true, message: error?.message })
    }
}


export default deletePage