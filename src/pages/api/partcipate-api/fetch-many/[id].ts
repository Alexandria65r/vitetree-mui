import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import connection from '../../../../database/connection'
import { Partcipant } from "../../../../database/schema";



const FetchTestPartcipants: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connection()
    const testId = req.query.id
    const partcipants = await Partcipant.find().where({ testId }).exec()
    if (partcipants) {
        return res.json({
            success: true,
            partcipants
        })
    }
}


export default FetchTestPartcipants