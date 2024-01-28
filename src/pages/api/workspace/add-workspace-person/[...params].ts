import { NextApiRequest, NextApiResponse } from 'next'
import connection from '../../../../database/connection';
import { Person, Workspace, WorkspaceModel } from '../../../../models/workspace';


export default async function AddWorkspaceMember(req: NextApiRequest, res: NextApiResponse) {
    await connection()
    const [workspaceId, email]: any = req.query.params || []
    const newPerson: Person = { email, createdAt: new Date().toISOString() }
    const workspace: any = await WorkspaceModel.findById<Workspace>(workspaceId);
    const isExist = workspace.people.find((person: Person) => person.email === email)
    if (isExist) return res.json({ error: 'true', message: 'Email already exists' })
    workspace.people = [...workspace?.people ?? [], newPerson]
    const updated = await workspace.save()
    console.log(workspace)
    if (updated) {
        return res.json({
            success: true,
            people: workspace.people
        })
    }
}


