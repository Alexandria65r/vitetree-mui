import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppState } from "../../store/store";
import { Task, TaskStatus } from "../../src/models/task";
import { taskActions } from ".";
import TaskAPI, { TasksQueryPath } from "../../src/api-services/task";
import Randomstring from 'randomstring'

export const createHiredTask = createAsyncThunk<void, undefined, { state: AppState }>
    ('taskSlice/createHiredTask', async (_, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const state = thunkAPI.getState()
        const user = state.AuthReducer.user
        const inquiryFeedback = state.InquiryReducer.inquiryFeedback
        const inquiry = state.InquiryReducer.inquiry

        const taskId = Randomstring.generate(17)
        const task: Task = {
            _id: taskId,
            studentInfo: {
                id: inquiryFeedback.studentId,
                publicId: user.imageAsset?.publicId ?? '',
                secureURL: user.imageAsset?.secureURL ?? '',
                name: `${user.firstName} ${user.lastName}`,
            },
            tutorInfo: {
                id: inquiryFeedback.tutorId,
                publicId: user.imageAsset?.publicId ?? '',
                secureURL: user.imageAsset?.secureURL ?? '',
                name: inquiry.tutorName,
            },
            service: {
                label: inquiryFeedback.service.label,
                price: inquiryFeedback.serviceTerms.price
            },
            status: 'working-on-it',
            dueDate: inquiryFeedback.serviceTerms.dueDate,
        }
        try {
            dispatch(taskActions.setTaskNetworkStatus('create-task'))
            const newTask = await TaskAPI.create(task)
            if (newTask) {
                dispatch(taskActions.setTaskNetworkStatus('create-task-success'))
            }
        } catch (error) {
            dispatch(taskActions.setTaskNetworkStatus('create-task-error'))
        }
    })


export const fetchHiredTask = createAsyncThunk<void, string, { state: AppState }>
    ('taskSlice/fetchHiredTask', async (taskId, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        try {
            dispatch(taskActions.setTaskNetworkStatus('fetch-task'))
            const task = await TaskAPI.fetchTask(taskId)
            if (task) {
                dispatch(taskActions.setTaskNetworkStatus('fetch-task-success'))
                dispatch(taskActions.setTask(task))
            }
        } catch (error) {
            dispatch(taskActions.setTaskNetworkStatus('fetch-task-error'))
        }
    })


type FetchTasksType = { status: TaskStatus, id: string, queryPath: TasksQueryPath }

export const fetchHiredTasks = createAsyncThunk<void, TaskStatus, { state: AppState }>
    ('taskSlice/fetchHiredTasks', async (status, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        try {
            dispatch(taskActions.setTaskNetworkStatus('fetch-tasks'))
            const tasks = await TaskAPI.fetchTasks(status)
            if (tasks) {
                dispatch(taskActions.setTaskNetworkStatus('fetch-tasks-success'))
                dispatch(taskActions.setTasks(tasks))
            }
        } catch (error) {
            dispatch(taskActions.setTaskNetworkStatus('fetch-tasks-error'))
        }
    })