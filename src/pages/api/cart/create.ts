import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import connection from '../../../database/connection'
import { CartItem } from '../../../database/schema'


const CreateTest: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connection()
    const newItem = req.body
    try {
        const newCartItem = await CartItem.create(newItem)
        if (newCartItem) {
            return res.json({
                success: true,
                newCartItem
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