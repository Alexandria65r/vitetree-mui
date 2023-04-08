import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import connection from '../../../database/connection'
import { Test } from '../../../database/schema'


const CreateTest: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connection()
    const testData = req.body
    try {
        const newTest = await Test.create(testData)
        if (newTest) {
            return res.json({
                success: true,
                newTest
            })
        }

    } catch (error) {
        return res.json({
            error: true,
            message: 'an error has occured'
        })
    }
}


export default CreateTest