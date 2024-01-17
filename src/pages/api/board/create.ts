import { NextApiRequest, NextApiResponse } from 'next'
import { Board, BoardModel } from '../../../models/board'

async function createBoard(req: NextApiRequest, res: NextApiResponse) {
    try {
        const newBoard: Board = await BoardModel.create(req.body)
        console.log(newBoard)

        if (newBoard) {
        
            return res.json({ success: true, newBoard })
        }

    } catch (error: any) {
        return res.json({ error: true, message: error?.message })
    }
}


export default createBoard