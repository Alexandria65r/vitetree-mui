import { NextApiRequest, NextApiResponse } from 'next'
import { CreatorPage, Page } from '../../../../models/page/page.model';
import { UserModel } from '../../../../models/user';
import connection from '../../../../database/connection';
import { Job, JobModel, JobType } from '../../../../models/post';
import { GetAuthUser } from '../../auth/helpers';




async function updatePage(req: NextApiRequest, res: NextApiResponse) {
    await connection()
    const postId = req.query.postId
    const { target, update } = req.body
    //decode user data
    const token = req.headers.authorization;
    if (token) {
        const user = await GetAuthUser(token);
        console.log(req.body)
        try {

        } catch (error: any) {
            return res.json({ error: true, message: error?.message })
        }
    }

}



export default updatePage