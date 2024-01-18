import { NextApiRequest, NextApiResponse } from 'next'

import connection from '../../../../database/connection'
import { ListGroupModel } from '../../../../models/list-group'



async function fetchListGroup(req: NextApiRequest, res: NextApiResponse) {
    await connection()
    const listGroupId = req.query.id
    try {
        const listGroup = await ListGroupModel.findById({ _id: listGroupId })
        if (listGroup) {
            return res.json({ success: true, listGroup })
        }

    } catch (error: any) {
        return res.json({ error: true, message: error?.message })
    }
}


export default fetchListGroup