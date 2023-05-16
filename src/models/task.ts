import mongoose from "mongoose"
import { Asset, TutorService } from "../reusable/interfaces"

export type UserInfo = {
    id: string
    secureURL: string
    publicId: string
    name: string
}
export const UserInfoModel = {
    id: '',
    secureURL: '',
    publicId: '',
    name: ''
}
export type TaskStatus = 
    'completed' |
    'working-on-it' |
    'all' |
    'just hired' |
    'preparation' |
    'task closed'

    
export interface Task {
    _id: string
    studentInfo: UserInfo,
    tutorInfo: UserInfo,
    service: TutorService
    dueDate: string
    vidAsset?: Asset,
    imageAsset?: Asset,
    status: TaskStatus
    createdAt?: string
}

export const TaskModel: Task = {
    _id: '',
    studentInfo: UserInfoModel,
    tutorInfo: UserInfoModel,
    service: { price: '', label: '' },
    dueDate: '',
    vidAsset: { publicId: '', secureURL: '' },
    imageAsset: { publicId: '', secureURL: '' },
    status: 'just hired'
}

export const taskStatuses = [
    "just hired",
    "preparation",
    "working on it",
    "completed",
    "task closed"
]
