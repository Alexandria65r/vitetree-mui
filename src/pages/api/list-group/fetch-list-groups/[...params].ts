import { NextApiRequest, NextApiResponse } from 'next'
import connection from '../../../../database/connection'
import { ListGroupModel } from '../../../../models/list-group'
import { GetAuthUser } from '../../auth/helpers'


async function fetchListGroups(req: NextApiRequest, res: NextApiResponse) {
    await connection()
    const [boardId, sort]: any = req.query.params || []
    try {
        const user = await GetAuthUser(req)
        if (user) {
            const listGroups = await ListGroupModel.find({}).where({ boardId }).where({ 'author.id': user._id })
            if (listGroups) {
                return res.json({ success: true, listGroups })
            }
        } else {
            return res.json({ error: true, message: 'An authorized' })
        }

    } catch (error: any) {
        console.log(error)
        return res.json({ error: true, message: error?.message })
    }

}

export default fetchListGroups