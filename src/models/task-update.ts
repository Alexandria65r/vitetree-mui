import { Descendant } from "slate"


export interface TaskUpdate {
    _id: string
    taskId: string
    notifyId: string
    author: {
        id: string
        userName: string
    }
    data: Descendant[]
    createdAt: string
}


export const taskUpdateModel: TaskUpdate = {
    _id: '',
    taskId: '',
    notifyId: '',
    author: {
        id: '',
        userName: ''
    },
    data: [],
    createdAt: ''

}