import { NextApiRequest, NextApiResponse } from 'next'
import { ElementModel } from '../../../models/element'

async function CreateElement(req: NextApiRequest, res: NextApiResponse) {
    try {
        const newElement: Element = await ElementModel.create(req.body)
        console.log(newElement)
        if (newElement) {
            return res.json({ success: true, newElement })
        }

    } catch (error: any) {
        return res.json({ error: true, message: error?.message })
    }
}


export default CreateElement