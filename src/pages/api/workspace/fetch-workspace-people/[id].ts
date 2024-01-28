import { NextApiRequest, NextApiResponse } from 'next'
import connection from '../../../../database/connection';
import { Person, Workspace, WorkspaceModel } from '../../../../models/workspace';
import { User, UserModel } from '../../../../models/user';
import { getWorkspacePeople } from '../../helpers';



export default async function FetchWorkspaceMembers(req: NextApiRequest, res: NextApiResponse) {
    await connection()
    const id: any = req.query.id || []
    const workspace = await WorkspaceModel.findById<Workspace>(id);

    if (workspace) {
        const people = await getWorkspacePeople(workspace.people);
        return res.json({
            success: true,
            people
        })
    }



}


