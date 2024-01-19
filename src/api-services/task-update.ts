import path from "path/posix";
import axios from 'axios'
import { setAxiosDefaults } from "./helpers";
import { TaskUpdate } from "../models/task-update";

export type TasksQueryPath = 'studentInfo.id' | 'tutorInfo.id'

export default class TaskUpdatesAPI {

    static async create(newTaskUpdate: TaskUpdate) {
        const { data } = await axios.post('/api/task-update/create', newTaskUpdate)
        if (data.success) {
            return data.newTaskUpdate as TaskUpdate
        }
    }

    static update(id: string, update: TaskUpdate | any) {
        return axios.put(`/api/task-update/update/${id}`, update)
    }

    static delete(id: string) {
        return axios.delete(`/api/task-update/delete/${id}`)
    }

    static async fetchTaskUpdate(id: string) {
        const { data } = await axios.get(`/api/task-update/fetch-task-update/${id}`)
        if (data.success) {
            return data.task as TaskUpdate
        }
    }

    static async fetchTaskUpdates(taskId: string) {
        setAxiosDefaults()
        const { data } = await axios.get(`/api/task-update/fetch-task-updates/${taskId}`)
        if (data.success) {
            return data.taskUpdates as TaskUpdate[]
        }
    }

}