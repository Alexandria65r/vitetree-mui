import { NextApiRequest, NextApiResponse } from 'next'
import connection from '../../../../database/connection';
import { Person, Workspace, WorkspaceModel } from '../../../../models/workspace';




export default async function RemoveWorkspaceMember(req: NextApiRequest, res: NextApiResponse) {
    await connection()
    const [workspaceId, personId]: any = req.query.params || []
    const workspace = await WorkspaceModel.findById<Workspace | any>(workspaceId);
    const people: Person[] = workspace?.people.fillter((person:Person) => person.id !== personId)
    workspace.people = people
    const updated = await workspace.save()

    if (updated) {
        return res.json({
            success: true,
            people
        })
    }

}


