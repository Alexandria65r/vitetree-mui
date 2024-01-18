import { NextApiRequest, NextApiResponse } from 'next'
import connection from '../../../../database/connection'
import { BoardModel } from '../../../../models/board'
import { WorkspaceModel } from '../../../../models/workspace'



async function fetchBoard(req: NextApiRequest, res: NextApiResponse) {
    await connection()
    const boardId = req.query.id
    try {
        const board = await BoardModel.findById({ _id: boardId })
        if (board) {
            const workspace = await WorkspaceModel.findById({ _id: board.workspaceId })
            return res.json({ success: true, board, workspace })
        }

    } catch (error: any) {
        return res.json({ error: true, message: error?.message })
    }
}


export default fetchBoard