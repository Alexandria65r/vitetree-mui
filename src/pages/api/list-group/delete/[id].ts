import { NextApiRequest, NextApiResponse } from 'next'
import { ListGroupModel } from '../../../../models/list-group';
import { ElementModel } from '../../../../models/element';



async function deleteListGroup(req: NextApiRequest, res: NextApiResponse) {
    try {
        const deleted = await ListGroupModel.findByIdAndRemove(req.query.id);
        //should also delete the children.
        const deletedElements = await ElementModel.deleteMany({ groupId: req.query.id })
        if (deleted) {
            return res.json({
                success: true,
                deleted,
                deletedElements,
                message: 'List group deleted successfully.'
            })
        }

    } catch (error: any) {
        return res.json({ error: true, message: error?.message })
    }
}


export default deleteListGroup