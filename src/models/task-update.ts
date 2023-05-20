import { Descendant } from "slate"


export interface TaskUpdate {
    _id: string
    taskId: string
    notifyId: string
    service: string
    author: {
        id: string
        userName: string
    }
    data: Descendant[]
    taskStatus: string
    createdAt: string
}


export const taskUpdateModel: TaskUpdate = {
    _id: '',
    taskId: '',
    notifyId: '',
    service:'',
    author: {
        id: '',
        userName: ''
    },
    data: [],
    taskStatus: '',
    createdAt: ''

}