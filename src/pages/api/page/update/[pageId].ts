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
        }
        return res.json({ success: true })
    } catch (error: any) {
        return res.json({ error: true, message: error?.message })
    }
}

async function updateBalance(pageId: string | string[] | undefined, update: any) {
    const page = await CreatorPage.findOne({ pageId });
    if (page) {
       
        page.earnings.balance += update.earnings.amount;
        if (update.earnings?.activity.star) {
            page.earnings.activity.stars = [update.earnings.activity.star, ...page.earnings.activity.stars];
            const post = await PostModel.findOne({ postId: update.earnings.activity.star.postId });
            post.tips = [update.earnings.activity.tip, ...post.tips]
            post.save()
        } else if (update.earnings.activity?.payout) {
            page.earnings.activity.payouts = [update.earnings.activity.payout, ...page.earnings.activity.payouts]
        }
      
        const updatedPage = await page.save();
        console.log(updatedPage)
    }
}

export default updatePage