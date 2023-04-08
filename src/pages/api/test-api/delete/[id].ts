import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import connection from '../../../../database/connection'
const DeleteTest: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connection()
}


export default DeleteTest