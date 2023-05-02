import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import connection from '../../../database/connection'
import { Post } from '../../../database/schema'


const CreatePost: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connection()
    const postData = req.body
    try {
        const newPost = await Post.create(postData)
        if (newPost) {
            return res.json({
                success: true,
                newPost
            })
        }

    } catch (error) {
        return res.json({
            error: true,
            message: 'an error has occured'
        })
    }
}


export default CreatePost