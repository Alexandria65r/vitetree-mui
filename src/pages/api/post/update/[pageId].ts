import { NextApiRequest, NextApiResponse } from 'next'
import { CreatorPage, Page } from '../../../../models/page/page.model';
import { UserModel } from '../../../../models/user';
import connection from '../../../../database/connection';
import { Post, PostModel } from '../../../../models/post';



async function updatePage(req: NextApiRequest, res: NextApiResponse) {
    await connection()
    const pageId = req.query.pageId
    const { target, update } = req.body
    try {

        if (target === 'balance') {
            await updateBalance(pageId, update);
           
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
            return res.json({ success: true })
        }
    } catch (error: any) {
        return res.json({ error: true, message: error?.message })
    }
}

async function updateBalance(pageId: string | string[] | undefined, update: any) {
    const page = await CreatorPage.findOne({ pageId });
    console.log(page)
    if (page) {
        const clonedEarning = { ...page.earnings };
        clonedEarning.balance = clonedEarning.balance + update.amount;
        if (update?.star) {
            clonedEarning.activity = {
                ...clonedEarning.activity,
                stars: [update.activity.star,
                ...clonedEarning.activity?.stars ?? []]
            };
            const post = await PostModel.findOne({ postId: update.star.postId });
            post.tips = [update.tip, ...post.tips]
            post.save()
        } else if (update?.payout) {
            clonedEarning.activity = {
                ...clonedEarning.activity,
                payouts: [update.activity.payout,
                ...clonedEarning.activity?.payouts ?? []]
            };
        }
        page.earnings = clonedEarning;
        page.save();

    }
}

export default updatePage