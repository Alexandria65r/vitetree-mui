import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import connection from '../../../../database/connection'
import { Partcipant } from "../../../../database/schema";


const DeletePartcipant: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connection()
    const _id = req.query.id
    const deleted = await Partcipant.findByIdAndRemove({ _id })
   
    if (deleted) {
        res.json({ success: true })
    }
}


export default DeletePartcipant