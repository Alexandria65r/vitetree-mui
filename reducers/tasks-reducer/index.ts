import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Task, TaskModel } from "../../src/models/task"
export type TaskNetworkStatus =
    'create-task' |
    'create-task-success' |
    'create-task-error' |
    'update-task' |
    'update-task-success' |
    'update-task-error' |
    'fetch-tasks' |
    'fetch-tasks-success' |
    'fetch-tasks-error' |
    'fetch-task' |
    'fetch-task-success' |
    'fetch-task-error' | 
    ''


type TaskState = {
    task: Task
    tasks: Task[]
    taskNetworkStatus: TaskNetworkStatus
}

const initialState: TaskState = {
    task: TaskModel,
    tasks: [],
    taskNetworkStatus: ''
}


const taskSlice = createSlice({
    name: 'taskSlice',
    initialState,
    reducers: {
        setTask: (state, { payload }: PayloadAction<Task>) => {
            state.task = payload
        },
        setTasks: (state, { payload }: PayloadAction<Task[]>) => {
            state.tasks = payload
        },
        setTaskNetworkStatus: (state, { payload }: PayloadAction<TaskNetworkStatus>) => {
            state.taskNetworkStatus = payload
        }
    }
})

export const taskActions = taskSlice.actions
export default taskSlice.reducer