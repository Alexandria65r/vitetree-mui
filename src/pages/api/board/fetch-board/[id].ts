import { NextApiRequest, NextApiResponse } from 'next'
import connection from '../../../../database/connection'
import { BoardModel } from '../../../../models/board'



async function fetchBoard(req: NextApiRequest, res: NextApiResponse) {
    await connection()
    const boardId = req.query.boardId
    try {
        const board = await BoardModel.findOne({ boardId })
        if (board) {
            return res.json({ success: true, board })
        }

    } catch (error: any) {
        return res.json({ error: true, message: error?.message })
    }
}


export default fetchBoard