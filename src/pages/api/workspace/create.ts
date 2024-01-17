import { NextApiRequest, NextApiResponse } from 'next'
import { Workspace, WorkspaceModel } from '../../../models/workspace'

async function createWorkspace(req: NextApiRequest, res: NextApiResponse) {
    try {
        const newWorkspace: Workspace = await WorkspaceModel.create(req.body)
        console.log(newWorkspace)

        if (newWorkspace) {
            return res.json({ success: true, newWorkspace })
        }

    } catch (error: any) {
        return res.json({ error: true, message: error?.message })
    }
}


export default createWorkspace