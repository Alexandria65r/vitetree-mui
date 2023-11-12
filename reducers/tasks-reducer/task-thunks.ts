import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppState } from "../../store/store";
import { FileAsset, Task, TaskStatus } from "../../src/models/task";

import TaskAPI, { TasksQueryPath } from "../../src/api-services/task";
import Randomstring from 'randomstring'
import { fetchTaskUpdatesThunk } from "../task-updtes-reducer/task-updates-thunks";
import { taskActions } from ".";
import { FormatMoney } from "format-money-js";
import { createToastThunk } from "../main-reducer/main-thunks";
import { dropzoneActions } from "../dropzone-reducer";
import downloader from 'js-file-download'
import axios from 'axios'


export const createHiredTask = createAsyncThunk<void, 'feedbackid' | 'postid', { state: AppState }>
    ('taskSlice/createHiredTask', async (type, thunkAPI) => {
        if (type !== 'feedbackid' && type !== 'postid') return
        const fm = new FormatMoney({
            decimals: 2
        })
        const dispatch = thunkAPI.dispatch
        const state = thunkAPI.getState()
        const user = state.AuthReducer.user
        const tutor = state.TutorsReducer.tutor
        const inquiryFeedback = state.InquiryReducer.inquiryFeedback
        const inquiry = state.InquiryReducer.inquiry
        const post = state.ForumReducer.post

        const _price = type === 'feedbackid' ? inquiryFeedback.serviceTerms.price : post.service?.price ?? ''
        const price: any = fm.from(parseFloat(_price))
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
                price: price ?? ''
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


export const updateTaskThunk = createAsyncThunk<void, undefined, { state: AppState }>
    ('taskSlice/updateTaskThunk', async (_, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const state = thunkAPI.getState()
        const task = state.TaskReducer.task
        const dropzoneList = state.DropzoneReducer.dropzoneList
        try {
            dispatch(taskActions.setTaskNetworkStatus('update-task'))
            const delivered = {
                files: dropzoneList,
                createdAt: new Date().toISOString()
            }
            const { data } = await TaskAPI.update(task._id,
                {
                    status: 'submitted',
                    delivered
                })

            if (data.success) {
                dispatch(taskActions.setTask({ ...task, delivered, status: 'submitted' }))
                dispatch(taskActions.setTaskNetworkStatus('update-task-success'))
                dispatch(createToastThunk('Files for this task has been submitted!'))
                dispatch(dropzoneActions.setDropzoneList([]))
            } else {
                dispatch(taskActions.setTaskNetworkStatus('update-task-error'))
                dispatch(createToastThunk('Opps an error occured while trying to submit task files'))
            }

            console.log(data)
        } catch (error) {
            // also show some feedbac to the user a toast for example
            dispatch(taskActions.setTaskNetworkStatus('update-task-error'))
            dispatch(createToastThunk('Internal server error, try again later'))
        }
    })


export const removeSubmittedFileThunk = createAsyncThunk<void, FileAsset, { state: AppState }>
    ('taskSlice/removeSubmittedFileThunk', async (file, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const state = thunkAPI.getState()
        const task = state.TaskReducer.task
        try {
            dispatch(taskActions.setTaskNetworkStatus('update-task'))
            const newFiles: FileAsset[] | undefined = task.delivered?.files.filter((file) => file.publicId !== file.publicId)
            const updatedfiles = [...task?.delivered?.files ?? []]
            updatedfiles[0] = { ...file, status: 'deleting' }
            dispatch(taskActions.setTask({
                ...task, delivered: {
                    ...task.delivered ?? [],
                    files: updatedfiles, createdAt: task.delivered?.createdAt ?? ''
                }
            }))
            if (newFiles) {
                let status: TaskStatus = newFiles.length > 0 ? 'submitted' : 'completed'
                const { data } = await TaskAPI.update(task._id,
                    {
                        status,
                        delivered: {
                            files: newFiles,
                            createdAt: new Date().toISOString()
                        }
                    })

                if (data.success) {
                    dispatch(taskActions.setTask({
                        ...task,
                        status,
                        delivered: {
                            ...task.delivered, files: newFiles,
                            createdAt: newFiles.length > 0 ? task.delivered?.createdAt ?? '':''
                        }
                    }))
                    dispatch(taskActions.setTaskNetworkStatus('update-task-success'))
                    dispatch(createToastThunk('Files for this task has been updated!'))
                    dispatch(dropzoneActions.setDropzoneList([]))
                } else {
                    dispatch(taskActions.setTaskNetworkStatus('update-task-error'))
                    dispatch(createToastThunk('Opps an error occured while trying to update task files'))
                }

                console.log(data)
            }
        } catch (error) {
            // also show some feedbac to the user a toast for example
            dispatch(taskActions.setTaskNetworkStatus('update-task-error'))
            dispatch(createToastThunk('Internal server error, try again later'))
        }



    })


export const downloadTaskFileThunk = createAsyncThunk<void, FileAsset, { state: AppState }>
    ('taskSlice/downloadTaskFileThunk', async (file, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const state = thunkAPI.getState()
        const task = state.TaskReducer.task
        const updatedfiles = [...task?.delivered?.files ?? []]
        const dropzoneList = state.DropzoneReducer.dropzoneList
        const clonedTask = { ...task }
        clonedTask?.delivered?.files

        const clonedFile = { ...file }
        const link ='https://res.cloudinary.com/demo/image/upload/example_pdf.pdf'
        console.log(file?.downloadURL)

        try {
            clonedFile.status = 'downloading'
            const { data } = await axios.get(file?.downloadURL ?? '', { responseType: 'blob' })
            if (data.type) {
                await downloader(data, `${file.name}`)
                dispatch(createToastThunk('File downloaded successfully'))
                clonedFile.status = 'downloaded'
                console.log(data.type)
            }

            updatedfiles[0] = clonedFile
            dispatch(taskActions.setTask({ ...task, delivered: { ...task.delivered ?? [], files: updatedfiles, createdAt: task.delivered?.createdAt ?? '' } }))
        } catch (error) {
            console.log(error)
            dispatch(createToastThunk('File downloading failed'))
        }
    })