import path from "path/posix";

import axios from 'axios'
import { setAxiosDefaults } from "./helpers";
import { Board } from "../models/board";
import { Workspace } from "../models/workspace";
import { ListGroup } from "../models/list-group";
import { Element } from "../models/element";


export type BoardsQueryPath = 'studentInfo.id' | 'tutorInfo.id'

export default class BoardAPI {

    static async create(newBoard: Board) {
        const { data } = await axios.post('/api/board/create', newBoard)
        if (data.success) {
            return data.newBoard as Board
        }
    }
    static async fetchActiveWorkspaceBoardAndBoardData(path:string) {
        //const path = workspaceId && !boardId ? `w/${workspaceId}` : `w/${workspaceId}/boardId/${boardId}`
        const { data } = await axios.get(`/api/board${path}`)
        if (data.success) {
            return {
                board: data.board as Board,
                boards: data.boards as Board[],
                workspace: data.workspace as Workspace,
                listGroups: data.listGroups as ListGroup[],
                elements: data.elements as Element[]
            }
        }
    }
    static async fetchBoard(boardId: string) {
        const { data } = await axios.get(`/api/board/fetch-board/${boardId}`)
        if (data.success) {
            return {
                board: data.board as Board,
                workspace: data.workspace as Workspace
            }
        }
    }

    static update(id: string, update: Board | any) {
        return axios.put(`/api/board/update/${id}`, update)
    }

    static delete(id: string) {
        return axios.delete(`/api/board/delete/${id}`)
    }



    static async fetchBoards(workspaceId: string) {
        setAxiosDefaults()
        const { data } = await axios.get(`/api/board/fetch-boards/${workspaceId}/limit`)
        if (data.success) {
            return data.boards as Board[]
        }
    }

}