import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import connection from '../../../../database/connection'
import { Test,Partcipant } from "../../../../database/schema";
const DeleteTest: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connection()
    const _id = req.query.id
    const deleted = await Test.findByIdAndRemove({ _id })
    const deletePartcipants = await Partcipant.deleteMany().where({ testId: _id }).exec()
    if (deleted) {
        res.json({ success: true })
        console.log(deletePartcipants)
    }
}


export default DeleteTest