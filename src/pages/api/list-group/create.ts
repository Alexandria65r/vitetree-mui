import { NextApiRequest, NextApiResponse } from 'next'
import { ListGroup, ListGroupModel } from '../../../models/list-group'

async function createListGroup(req: NextApiRequest, res: NextApiResponse) {
    try {
        const newListGroup: ListGroup = await ListGroupModel.create(req.body)
        console.log(newListGroup)

        if (newListGroup) {
            return res.json({ success: true, newListGroup })
        }

    } catch (error: any) {
        return res.json({ error: true, message: error?.message })
    }
}


export default createListGroup