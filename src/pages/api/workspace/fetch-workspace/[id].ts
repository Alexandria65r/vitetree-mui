import { NextApiRequest, NextApiResponse } from 'next'

import connection from '../../../../database/connection'
import { WorkspaceModel } from '../../../../models/workspace'



async function fetchWorkspace(req: NextApiRequest, res: NextApiResponse) {
    await connection()
    const workspaceId = req.query.id
    try {
        const workspace = await WorkspaceModel.findById({ _id: workspaceId })
        if (workspace) {
            return res.json({ success: true, workspace })
        }

    } catch (error: any) {
        return res.json({ error: true, message: error?.message })
    }
}


export default fetchWorkspace