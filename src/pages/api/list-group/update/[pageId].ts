import { NextApiRequest, NextApiResponse } from 'next'
import { CreatorPage, Page } from '../../../../models/page/page.model';
import { UserModel } from '../../../../models/user';
import connection from '../../../../database/connection';




async function updatePage(req: NextApiRequest, res: NextApiResponse) {
    await connection()
    const pageId = req.query.pageId
    const { target, update } = req.body
    try {
        if (target === 'balance') {
            
        } else {
            const updated: Page | null = await CreatorPage.findOneAndUpdate({ pageId }, update);
            if (updated) {
                if (target === 'profile-image') {
                    const user = await UserModel.findById({ _id: updated.author.id })
                    if (user) {
                        user.pageInfo = {
                            ...user.pageInfo,
                            pageId: updated.pageId,
                            photoURL: update.imageAssets.profile.secureURL
                        }
                        await user.save()
                    }
                }
            }
        }
        return res.json({ success: true })
    } catch (error: any) {
        return res.json({ error: true, message: error?.message })
    }
}



export default updatePage