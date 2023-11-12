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
    'submitted' |
    'in review' |
    'completed' |
    'working on it' |
    'all' |
    'just hired' |
    'preparation' |
    'task closed' |
    'task open' | ''



export type FileAsset = {
    name: string;
    publicId: string;
    downloadURL?: string;
    format: string;
    status?: 'uploading' | 'uploaded' | 'deleting' | 'deleted' | 'downloading' | 'downloaded' | ''
}

export interface Task {
    _id: string
    studentInfo: UserInfo,
    tutorInfo: UserInfo,
    service: TutorService
    subjects: string[]
    topic: string,
    dueDate: string
    vidAsset?: Asset,
    imageAsset?: Asset,
    status: TaskStatus
    createdAt?: string;
    delivered?: {
        files: FileAsset[],
        createdAt: string
    },

    save?: () => {}

}

export const TaskModel: Task = {
    _id: '',
    studentInfo: UserInfoModel,
    tutorInfo: UserInfoModel,
    service: { price: '', label: '' },
    subjects: [],
    topic: '',
    dueDate: '',
    vidAsset: { publicId: '', secureURL: '' },
    imageAsset: { publicId: '', secureURL: '' },
    status: '',
    delivered: {
        files: [],
        createdAt: ''
    }
}

export const studentTaskStatuses: TaskStatus[] = [
    "working on it",
    "in review",
    "task closed",
]
export const tutorTaskStatuses: TaskStatus[] = [
    "preparation",
    "working on it",
    "completed",
]
