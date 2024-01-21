import { NextApiRequest, NextApiResponse } from 'next'
import connection from '../../../../database/connection';
import { WorkspaceModel } from '../../../../models/workspace';
import { UserModel } from '../../../../models/user';



export default async function FetchWorkspaceMembers(req: NextApiRequest, res: NextApiResponse) {
    await connection()
    const _id: any = req.query._id || []
    console.log(_id)

    const project: any = await WorkspaceModel.findById({ _id });
    const membersList: any[] = [];
    console.log(project)
    if (project) {
        for (let i = 0; i < project.members.length; i++) {
            const user: any = await UserModel.findOne({ email: project.members[i] });
            console.log(user)
            if (user) {
                const first = user.firstName.slice(0, 1);
                const last = user.lastName.slice(0, 1);
                membersList.push({
                    id:user._id,
                    fullname: `${user.firstName} ${user.lastName}`,
                    initials: `${first}${last}`,
                    publicId: ''
                })

            }
        }
        return res.json({
            success: true,
            membersList
        })
    }

}


