import { NextApiRequest, NextApiResponse } from 'next'
import connection from '../../../../database/connection'
import { GetAuthUser } from '../../auth/helpers'
import { ElementModel } from '../../../../models/element'


async function fetchElements(req: NextApiRequest, res: NextApiResponse) {
    await connection()
    const [boardId, sort]: any = req.query.params || []
    try {
        const user = await GetAuthUser(req)
        if (user) {
            const elements = await ElementModel.find({}).where({ boardId }).where({ 'author.id': user._id })
            if (elements) {
                return res.json({ success: true, elements })
            }
        } else {
            return res.json({ error: true, message: 'An authorized' })
        }

    } catch (error: any) {
        console.log(error)
        return res.json({ error: true, message: error?.message })
    }

}

export default fetchElements