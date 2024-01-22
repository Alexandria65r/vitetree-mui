import { NextApiRequest, NextApiResponse } from 'next'
import { ElementModel } from '../../../models/element';
import { ListGroupModel } from '../../../models/list-group';



async function deleteBulkListGroups(req: NextApiRequest, res: NextApiResponse) {
    const groupIds = req.body
    try {
        const deleted = await ListGroupModel.deleteMany({ _id: groupIds });
        //should also delete the children.
        groupIds.forEach(async (groupId: string) => {
            await ElementModel.deleteMany({ groupId })
        })

        return res.json({
            success: true,
            deleted,
            message: "List group deleted and it's children successfully."
        })


    } catch (error: any) {
        return res.json({ error: true, message: error?.message })
    }
}


export default deleteBulkListGroups