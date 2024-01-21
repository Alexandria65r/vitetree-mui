import { NextApiRequest, NextApiResponse } from 'next'
import connection from '../../../database/connection';
import { ElementModel } from '../../../models/element';

async function updateElement(req: NextApiRequest, res: NextApiResponse) {
    await connection()

    const { ids, update }: { ids: string[], update: any } = req.body
    try {
        ids.forEach(async (_id) => {
             await ElementModel.updateMany({ _id:ids }, update);
        })

        return res.json({ success: true })

    } catch (error: any) {
        return res.json({ error: true, message: error?.message })
    }
}

export default updateElement