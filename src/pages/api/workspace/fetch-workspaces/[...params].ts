import { NextApiRequest, NextApiResponse } from 'next'
import connection from '../../../../database/connection'
import { WorkspaceModel } from '../../../../models/workspace'
import { GetAuthUser } from '../../auth/helpers'


async function fetchWorkspaces(req: NextApiRequest, res: NextApiResponse) {
    await connection()
    const params = req.query.params
    try {
        const user = await GetAuthUser(req)
        if (user) {
            const workspaces = await WorkspaceModel.find({}).where({ 'author.id': user._id })
            if (workspaces) {
                return res.json({ success: true, workspaces })
            }
        } else {
            return res.json({ error: true, message: 'An authorized' })
        }

    } catch (error: any) {
        console.log(error)
        return res.json({ error: true, message: error?.message })
    }

}

export default fetchWorkspaces