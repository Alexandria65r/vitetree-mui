import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import connection from '../../../../database/connection'
import { Test } from "../../../../database/schema";
const UpdateTest: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connection()
    const testId = req.query.id;
    const testData = await Test.findById({ _id: testId })
    
    if (testData) {
        return res.json({
            success: true,
            testData
        })
    }
}


export default UpdateTest