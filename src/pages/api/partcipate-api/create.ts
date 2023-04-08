import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import connection from '../../../database/connection'
import { Partcipant } from '../../../database/schema'


const CreatePartcipant: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connection()
    const partcipantData = req.body
    try {
        const partcipant = await Partcipant.create(partcipantData)
        if (partcipant) {
            return res.json({
                success: true,
                partcipant
            })
        }

    } catch (error) {
        console.log(error)
        return res.json({
            error: true,
            message: 'an error has occured'
        })
    }
}


export default CreatePartcipant