import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppState } from "../../store/store";
import { Task, TaskStatus } from "../../src/models/task";

import TaskAPI, { TasksQueryPath } from "../../src/api-services/task";
import Randomstring from 'randomstring'
import { fetchTaskUpdatesThunk } from "../task-updtes-reducer/task-updates-thunks";
import { taskActions } from ".";

export const createHiredTask = createAsyncThunk<void, 'feedbackid' | 'postid', { state: AppState }>
    ('taskSlice/createHiredTask', async (type, thunkAPI) => {
        if (type !== 'feedbackid' && type !== 'postid') return

        const dispatch = thunkAPI.dispatch
        const state = thunkAPI.getState()
        const user = state.AuthReducer.user
        const tutor = state.TutorsReducer.tutor
        const inquiryFeedback = state.InquiryReducer.inquiryFeedback
        const inquiry = state.InquiryReducer.inquiry
        const post = state.ForumReducer.post

        const taskId = Randomstring.generate(17)
        const task: Task = {
            _id: taskId,
            studentInfo: {
                id: type === 'feedbackid' ? inquiryFeedback.studentId : post.authorId,
                publicId: user.imageAsset?.publicId ?? '',
                secureURL: user.imageAsset?.secureURL ?? '',
                name: `${user.firstName} ${user.lastName}`,
            },
            tutorInfo: {
                id: type === 'feedbackid' ? inquiryFeedback.tutorId : tutor._id ?? '',
                publicId: user.imageAsset?.publicId ?? '',
                secureURL: user.imageAsset?.secureURL ?? '',
                name: type === 'feedbackid' ? inquiry.tutorName : `${tutor.firstName} ${tutor.lastName}` ?? '',
            },
            service: {
                label: type === 'feedbackid' ? inquiryFeedback.service.label : post.service?.label ?? '',
                price: type === 'feedbackid' ? inquiryFeedback.serviceTerms.price : post.service?.price ?? ''
            },
            subjects: type === 'feedbackid' ? inquiry.subjects : post.subjects ?? [],
            topic: type === 'feedbackid' ? inquiry.topic ?? '' : '',
            status: 'just hired',
            dueDate: type === 'feedbackid' ? inquiryFeedback.serviceTerms.dueDate : post.dueDate ?? '',
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
            dispatch(fetchTaskUpdatesThunk(taskId))
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