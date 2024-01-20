import { NextApiRequest, NextApiResponse } from 'next'
import connection from '../../../../database/connection'
import { BoardModel, BoardSchema } from '../../../../models/board'
import { WorkspaceModel } from '../../../../models/workspace'
import { ListGroupModel } from '../../../../models/list-group'
import { ElementModel } from '../../../../models/element'



async function fetchActiveWorkspaceBoardAndBoardData(req: NextApiRequest, res: NextApiResponse) {
    await connection()
    const [workspaceId, _, boardId]: any = req.query.params || []
    try {
        const workspace = await WorkspaceModel.findById({ _id: workspaceId })
        const boards = await BoardModel.find().where({ workspaceId: workspace._id })
        if (workspace && !boardId) {
            return res.json({ success: true, workspace, board: BoardSchema, boards, listGroups: [], elements: [] })
        } else {
            const board = await BoardModel.findById({ _id: boardId })
            const listGroups = await ListGroupModel.find().where({ boardId: board._id }).sort({ createdAt: -1 }).exec()
            const elements = await ElementModel.find().where({ boardId: board._id }).exec()
            return res.json({ success: true, board, workspace, boards, listGroups, elements })
        }
    } catch (error: any) {
        return res.json({ error: true, message: error?.message })
    }
}


export default fetchActiveWorkspaceBoardAndBoardData