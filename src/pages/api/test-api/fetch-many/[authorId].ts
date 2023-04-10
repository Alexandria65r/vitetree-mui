import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import connection from '../../../../database/connection'
import { Test } from "../../../../database/schema";


const FetchMany: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connection()
    const authorId = req.query.authorId
    const testsList = await Test.find().where({ authorId }).exec()
    if (testsList) {
        return res.json({
            success: true,
            testsList
        })
    }
}


export default FetchMany