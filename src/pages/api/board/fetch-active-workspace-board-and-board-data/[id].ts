import { NextApiRequest, NextApiResponse } from 'next'
import connection from '../../../../database/connection'
import { BoardModel } from '../../../../models/board'
import { WorkspaceModel } from '../../../../models/workspace'
import { ListGroupModel } from '../../../../models/list-group'
import { ElementModel } from '../../../../models/element'



async function fetchActiveWorkspaceBoardAndBoardData(req: NextApiRequest, res: NextApiResponse) {
    await connection()
    const boardId = req.query.id
    try {
        const board = await BoardModel.findById({ _id: boardId })
        if (board) {
            const workspace = await WorkspaceModel.findById({ _id: board.workspaceId })
            const listGroups = await ListGroupModel.find().where({ boardId: board._id }).sort({createdAt:-1}).exec()
            const elements = await ElementModel.find().where({ boardId: board._id }).exec()
            return res.json({ success: true, board, workspace, listGroups, elements })
        }
    } catch (error: any) {
        return res.json({ error: true, message: error?.message })
    }
}


export default fetchActiveWorkspaceBoardAndBoardData