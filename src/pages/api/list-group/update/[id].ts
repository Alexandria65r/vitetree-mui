import { NextApiRequest, NextApiResponse } from 'next'
import { CreatorPage, Page } from '../../../../models/page/page.model';
import { UserModel } from '../../../../models/user';
import connection from '../../../../database/connection';
import { ListGroup, ListGroupModel } from '../../../../models/list-group';




async function updateListGroup(req: NextApiRequest, res: NextApiResponse) {
    await connection()
    const _id = req.query.id
    const {update} = req.body

console.log(update)
    try {
        const updated: ListGroup | null = await ListGroupModel.findByIdAndUpdate({ _id }, update);
        if (updated) {
            return res.json({ success: true, message: 'List group updated successfully.' })
        }
    } catch (error: any) {
        return res.json({ error: true, message: error?.message })
    }
}



export default updateListGroup