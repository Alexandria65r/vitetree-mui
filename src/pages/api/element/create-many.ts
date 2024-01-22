import { NextApiRequest, NextApiResponse } from 'next'
import { Element, ElementModel } from '../../../models/element'

async function CreateManyElements(req: NextApiRequest, res: NextApiResponse) {
    const body = req.body
    const newElements: Element[] = []
    try {
        body.forEach(async (element: Element) => {
            const newElement: Element = await ElementModel.create({...element, loading:false})
            console.log(newElement)
            if (newElement) {
                await newElements.push(newElement)
            }
        })

        if (newElements) {
            return res.json({ success: true, newElements, message: 'Created many successfully.' })
        } else {
            return res.json({ error: true, newElements: [], message: 'Created many failed.' })
        }


    } catch (error: any) {
        return res.json({ error: true, message: error?.message })
    }
}


export default CreateManyElements