import { createAsyncThunk } from "@reduxjs/toolkit";
import { Descendant } from "slate";
import { AppState } from "../../store/store";
import { TaskUpdate } from "../../src/models/task-update";
import Randomstring from "randomstring";
import { taskUpdatesActions } from ".";
import { getSwapedTaskUserInfo } from "../../src/reusable/helpers";
import TaskUpdatesAPI from "../../src/api-services/task-update";

export const createNewTaskUpdateThunk = createAsyncThunk<void, Descendant[], { state: AppState }>
    ('taskUpdateSlice/createNewTaskUpdateThunk', async (editorData, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const state = thunkAPI.getState()
        const user = state.AuthReducer.user
        const task = state.TaskReducer.task
        const updates = state.TaskUpdatesReducer.updates
        const updateId = Randomstring.generate(17)

        const update: TaskUpdate = {
            _id: updateId,
            taskId: task._id,
            notifyId: getSwapedTaskUserInfo(user.role, task).id,
            service: task.service.label,
            author: {
                id: user._id ?? '',
                userName: `${user.firstName} ${user.lastName}`
            },
            data: editorData,
            taskStatus: task.status,
            createdAt: new Date().toISOString()
        }

        dispatch(taskUpdatesActions.setUpdates([update, ...updates]))
        try {
            const newTaskUpdate = await TaskUpdatesAPI.create(update)
        } catch (error) {

        }
        console.log(update)
    })




export const fetchTaskUpdatesThunk = createAsyncThunk<void, string, { state: AppState }>
    ('taskUpdateSlice/fetchTaskUpdatesThunk', async (taskId, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        try {
            dispatch(taskUpdatesActions.setTaskUpdateNetworkStatus('fetch-task-updates'))
            const taskUpdates = await TaskUpdatesAPI.fetchTaskUpdates(taskId)
            if (taskUpdates) {
                dispatch(taskUpdatesActions.setTaskUpdateNetworkStatus('fetch-task-updates-success'))
                dispatch(taskUpdatesActions.setUpdates(taskUpdates))
            }
        } catch (error) {
            dispatch(taskUpdatesActions.setTaskUpdateNetworkStatus('fetch-task-updates-error'))
        }
    })