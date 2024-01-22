import { NextApiRequest, NextApiResponse } from 'next'
import { ListGroup, ListGroupModel } from '../../../models/list-group'



async function CreateManyGroups(req: NextApiRequest, res: NextApiResponse) {
    const body = req.body
    const newListGroupListGroups:ListGroup[] = []
    try {
        body.forEach(async (listGroupListGroup:ListGroup) => {
            const newListGroupListGroup:ListGroup = await ListGroupModel.create(listGroupListGroup)
            console.log(newListGroupListGroup)
            if (newListGroupListGroup) {
                await newListGroupListGroups.push(newListGroupListGroup)
            }
        })

        if (newListGroupListGroups) {
            return res.json({ success: true, newListGroupListGroups, message: 'Created many groups successfully.' })
        } else {
            return res.json({ error: true, newListGroupListGroups: [], message: 'Created many failed.' })
        }

    } catch (error: any) {
        return res.json({ error: true, message: error?.message })
    }
}


export default CreateManyGroups