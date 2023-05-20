import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { TaskUpdate } from "../../src/models/task-update"

export type TaskUpdatesNetworkStatus =
    'create-task-update' |
    'create-task-update-success' |
    'create-task-update-error' |
    'fetch-task-updates' |
    'fetch-task-updates-success' |
    'fetch-task-updates-error' | ''

type TaskUpdateState = {
    taskUpdateNetworkStatus: TaskUpdatesNetworkStatus
    updates: TaskUpdate[]
}


const initialState: TaskUpdateState = {
    taskUpdateNetworkStatus: '',
    updates: []
}


const taskUpdateSlice = createSlice({
    name: 'taskUpdateSlice',
    initialState,
    reducers: {
        setUpdates: (state, { payload }: PayloadAction<TaskUpdate[]>) => {
            state.updates = payload
        },
        setTaskUpdateNetworkStatus: (state, { payload }: PayloadAction<TaskUpdatesNetworkStatus>) => {
            state.taskUpdateNetworkStatus = payload
        }
    }
})


export const taskUpdatesActions = taskUpdateSlice.actions
export default taskUpdateSlice.reducer