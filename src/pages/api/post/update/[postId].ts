import { NextApiRequest, NextApiResponse } from 'next'
import { CreatorPage, Page } from '../../../../models/page/page.model';
import { UserModel } from '../../../../models/user';
import connection from '../../../../database/connection';
import { Post, PostModel, PostType } from '../../../../models/post';
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

            if (target === 'likes') {
                const post: Post | null = await PostModel.findOne({ postId });
                if (post && user) {
                    const like = post.likes.find((likeItem) => likeItem.owner === user?._id ?? '')
                    let copyLikes = [...post.likes]
                    if (!like) {
                        copyLikes = [update.like, ...post.likes]
                    } else if (like.name !== update.like.name) {
                        //replace the like
                        copyLikes.splice(post.likes.indexOf(like), 1, update.like)
                    } else {
                        //remove the like
                        copyLikes.splice(post.likes.indexOf(like), 1)
                    }
                    post.likes = copyLikes
                    const updatedPost = await post.save()
                    return res.json({ success: true, updatedPost })
                }
            } else {
                const updatedPost: Page | null = await PostModel.findOneAndUpdate({ postId }, update);
                if (updatedPost) {
                    return res.json({ success: true, updatedPost })
                }
            }

        } catch (error: any) {
            return res.json({ error: true, message: error?.message })
        }
    }

}



export default updatePage