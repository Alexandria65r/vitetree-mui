import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import connection from '../../../../database/connection'
import { Partcipant } from "../../../../database/schema";
const FetchPartcipant: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connection()
    const _id = req.query.id;
    const partcipant = await Partcipant.findById({ _id })
    
    if (partcipant) {
        return res.json({
            success: true,
            partcipant
        })
    }
}


export default FetchPartcipant