import { NextApiRequest, NextApiResponse } from 'next'
import connection from '../../../../database/connection';
import { Element, ElementModel } from '../../../../models/element';

async function updateElement(req: NextApiRequest, res: NextApiResponse) {
    await connection()
    const _id = req.query.id
    const {update} = req.body
    try {
        const updated: Element | null = await ElementModel.findOneAndUpdate({ _id }, update);
        if (updated) {
            return res.json({ success: true,updated })
        }
    } catch (error: any) {
        return res.json({ error: true, message: error?.message })
    }
}

export default updateElement