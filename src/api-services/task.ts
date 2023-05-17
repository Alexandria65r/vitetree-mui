import path from "path/posix";
import { Task, TaskStatus } from "../models/task";
import axios from 'axios'
import { setAxiosDefaults } from "./helpers";

export type TasksQueryPath = 'studentInfo.id' | 'tutorInfo.id'

export default class TaskAPI {

    static async create(newTask: Task) {
        const { data } = await axios.post('/api/task/create', newTask)
        if (data.success) {
            return data.newTask as Task
        }
    }

    static update(id: string, update: Task | any) {
        return axios.put(`/api/task/update/${id}`, update)
    }

    static delete(id: string) {
        return axios.delete(`/api/task/delete/${id}`)
    }

    static async fetchTask(id: string) {
        const { data } = await axios.get(`/api/task/fetch-task/${id}`)
        if (data.success) {
            return data.task as Task
        }
    }

    static async fetchTasks(status: TaskStatus) {
        setAxiosDefaults()
        const { data } = await axios.get(`/api/task/fetch-tasks/${status}`)
        if (data.success) {
            return data.tasks as Task[]
        }
    }

}