import { NextApiRequest, NextApiResponse } from 'next'
import { ElementModel } from '../../../../models/element';



async function DeleteElement(req: NextApiRequest, res: NextApiResponse) {
    try {
        const deleted = await ElementModel.findByIdAndRemove(req.query.id);
        if (deleted) {
            return res.json({
                success: true,
                deleted,
                message: 'Item was deleted successfully.'
            })
        }

    } catch (error: any) {
        return res.json({ error: true, message: error?.message })
    }
}


export default DeleteElement