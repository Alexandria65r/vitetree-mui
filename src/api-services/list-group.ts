import path from "path/posix";

import axios from 'axios'
import { setAxiosDefaults } from "./helpers";
import { ListGroup } from "../models/list-group";


export type ListGroupsQueryPath = 'studentInfo.id' | 'tutorInfo.id'

export default class ListGroupAPI {

    static async create(newListGroup: ListGroup) {
        const { data } = await axios.post('/api/list-group/create', newListGroup)
        if (data.success) {
            return data.newListGroup as ListGroup
        }
    }
    static async fetchListGroup(listGroupId: string) {
        const { data } = await axios.get(`/api/list-group/fetch-listGroup/${listGroupId}`)
        if (data.success) {
            return data.listGroup as ListGroup
        }
    }

    static update(id: string, update: ListGroup | any) {
        return axios.put(`/api/list-group/update/${id}`, update)
    }

    static delete(id: string) {
        return axios.delete(`/api/list-group/delete/${id}`)
    }



    static async fetchListGroups(boardId: string) {
        setAxiosDefaults()
        const { data } = await axios.get(`/api/list-group/fetch-list-groups/${boardId}/limit`)
        if (data.success) {
            return data.listGroups as ListGroup[]
        }
    }

}