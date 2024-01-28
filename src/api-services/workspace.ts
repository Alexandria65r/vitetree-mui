import path from "path/posix";

import axios from 'axios'
import { setAxiosDefaults } from "./helpers";
import { Person, Workspace } from "../models/workspace";


export type WorkspacesQueryPath = 'studentInfo.id' | 'tutorInfo.id'

export default class WorkspaceAPI {

    static async create(newWorkspace: Workspace) {
        const { data } = await axios.post('/api/workspace/create', newWorkspace)
        if (data.success) {
            return data.newWorkspace as Workspace
        }
    }
    static async fetchWorkspace(workspaceId: string) {
        const { data } = await axios.get(`/api/workspace/fetch-workspace/${workspaceId}`)
        if (data.success) {
            return data.workspace as Workspace
        }
    }
    static async addWorkspacePerson(workspaceId: string, email: string) {
        const { data } = await axios.get(`/api/workspace/add-workspace-person/${workspaceId}/${email}`)
        if (data.success) {
            return data.people as Person[]
        }
    }
    static async removeWorkspacePerson(workspaceId:string, personId: string) {
        const { data } = await axios.get(`/api/workspace/remove-workspace-person/${workspaceId}/${personId}`)
        if (data.success) {
            return data.people as Person[]
        }
    }
    static async fetchWorkspacePeople(workspaceId: string) {
        const { data } = await axios.get(`/api/workspace/fetch-workspace-people/${workspaceId}`)
        if (data.success) {
            return data.people as Person[]
        }
    }
    static async fetchWorkspaceBoards(workspaceId: string) {
        const { data } = await axios.get(`/api/workspace/fetch-workspace-boards/${workspaceId}`)
        if (data.success) {
            return data.workspace as Workspace
        }
    }

    static update(id: string, update: Workspace | any) {
        return axios.put(`/api/workspace/update/${id}`, update)
    }

    static delete(id: string) {
        return axios.delete(`/api/workspace/delete/${id}`)
    }



    static async fetchWorkspaces() {
        setAxiosDefaults()
        const { data } = await axios.get(`/api/workspace/fetch-workspaces/limit`)
        if (data.success) {
            return data.workspaces as Workspace[]
        }
    }

}