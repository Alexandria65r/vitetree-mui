import { NextApiRequest, NextApiResponse } from 'next'
import connection from '../../../../database/connection'
import { BoardModel } from '../../../../models/board'
import { GetAuthUser } from '../../auth/helpers'


async function fetchBoards(req: NextApiRequest, res: NextApiResponse) {
    await connection()
    const [workspaceId, ...rest]: any = req.query.params

    try {
        const user = await GetAuthUser(req);
        if (user) {
            const boards = await BoardModel.find({}).where({ 'author.id': user._id }).where({ workspaceId }).exec()
            if (boards) {
                return res.json({ success: true, boards })
            }

        } else {
            return res.json({ error: true, message: 'An authorized' })
        }

    } catch (error: any) {
        return res.json({ error: true, message: error?.message })
    }
}

export default fetchBoards