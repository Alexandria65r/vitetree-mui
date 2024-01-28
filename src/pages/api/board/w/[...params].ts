import { NextApiRequest, NextApiResponse } from 'next'
import connection from '../../../../database/connection'
import { BoardModel, BoardSchema } from '../../../../models/board'
import { WorkspaceModel } from '../../../../models/workspace'
import { ListGroupModel } from '../../../../models/list-group'
import { ElementModel } from '../../../../models/element'
import { getWorkspacePeople } from '../../helpers'



async function fetchActiveWorkspaceBoardAndBoardData(req: NextApiRequest, res: NextApiResponse) {
    await connection()
    const [workspaceId, _, boardId]: any = req.query.params || []
    try {
        const workspace = await WorkspaceModel.findById({ _id: workspaceId })
        const boards = await BoardModel.find().where({ workspaceId: workspace._id })
        const people = await getWorkspacePeople(workspace.people);
        if (workspace && !boardId) {
            return res.json({ success: true, workspace, people, board: BoardSchema, boards, listGroups: [], elements: [] })
        } else {
            const board = await BoardModel.findById({ _id: boardId })
            
            const listGroups = await ListGroupModel.find().where({ boardId: board._id }).sort({ createdAt: -1 }).exec()
            const elements = await ElementModel.find().where({ boardId: board._id }).exec()
            return res.json({ success: true, board, workspace, people, boards, listGroups, elements })
        }
    } catch (error: any) {
        return res.json({ error: true, message: error?.message })
    }
}


export default fetchActiveWorkspaceBoardAndBoardData