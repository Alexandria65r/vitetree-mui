import { NextApiRequest, NextApiResponse } from 'next'
import connection from '../../../database/connection';
import { ElementModel } from '../../../models/element';

async function updateElement(req: NextApiRequest, res: NextApiResponse) {
    await connection()

    const ids: string[] = req.body
    try {
        await ElementModel.deleteMany({ _id: ids });
        return res.json({ success: true, message:'Selected were Items deleted successfully.' })

    } catch (error: any) {
        return res.json({ error: true, message: error?.message })
    }
}

export default updateElement