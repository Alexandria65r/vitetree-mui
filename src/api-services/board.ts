import path from "path/posix";

import axios from 'axios'
import { setAxiosDefaults } from "./helpers";
import { Board } from "../models/board";


export type BoardsQueryPath = 'studentInfo.id' | 'tutorInfo.id'

export default class BoardAPI {

    static async create(newBoard: Board) {
        const { data } = await axios.post('/api/board/create', newBoard)
        if (data.success) {
            return data.newBoard as Board
        }
    }
    static async fetchBoard(boardId: string) {
        const { data } = await axios.get(`/api/board/fetch-board/${boardId}`)
        if (data.success) {
            return data.board as Board
        }
    }

    static update(id: string, update: Board | any) {
        return axios.put(`/api/board/update/${id}`, update)
    }

    static delete(id: string) {
        return axios.delete(`/api/board/delete/${id}`)
    }



    static async fetchBoards(workspaceId:string) {
        setAxiosDefaults()
        const { data } = await axios.get(`/api/board/fetch-boards/${workspaceId}/limit`)
        if (data.success) {
            return data.boards as Board[]
        }
    }

}