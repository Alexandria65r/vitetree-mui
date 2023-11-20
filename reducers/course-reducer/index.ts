import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Asset, VideoCourse } from '../../src/reusable/interfaces'
import { VideoCourseSchema } from '../../src/reusable/schemas'

type CourseState = {
    video: VideoCourse;
    newVideo: VideoCourse;
    courses: VideoCourse[];
    isErr: boolean
}


const initialState: CourseState = {
    video: VideoCourseSchema,
    newVideo: VideoCourseSchema,
    courses: [],
    isErr: false
}


const courseSlice = createSlice({
    name: 'courseSlice',
    initialState,
    reducers: {
        setVideo: (state, { payload }: PayloadAction<VideoCourse>) => {
            state.video = payload
        },
        setNewVideo: (state, { payload }: PayloadAction<VideoCourse>) => {
            state.newVideo = payload
        },
        setVideoProperties: (state, { payload }: PayloadAction<{ name: string, value: string }>) => {
            state.newVideo = { ...state.newVideo, [payload.name]: payload.value }
        },
        setImageAssets: (state, { payload }: PayloadAction<Asset>) => {
            state.newVideo.imageAsset = payload
        },
        setVideoAssets: (state, { payload }: PayloadAction<Asset>) => {
            state.newVideo.vidAsset = payload
        },
        setError: (state, { payload }: PayloadAction<boolean>) => {
            state.isErr = payload
        },
        setCourses: (state, { payload }: PayloadAction<VideoCourse[]>) => {
            state.courses = payload
        },
    }
})

export const courseActions = courseSlice.actions
export default courseSlice.reducer