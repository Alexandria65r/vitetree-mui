import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Asset, VideoCourse } from '../../src/reusable/interfaces'
import { VideoCourseSchema } from '../../src/reusable/schemas'

type CourseState = {
    video: VideoCourse,
    courses: VideoCourse[],
    isErr: boolean
}


const initialState: CourseState = {
    video: VideoCourseSchema,
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
        setVideoProperties: (state, { payload }: PayloadAction<{ name: string, value: string }>) => {
            state.video = { ...state.video, [payload.name]: payload.value }
        },
        setImageAssets: (state, { payload }: PayloadAction<Asset>) => {
            state.video.imageAsset = payload
        },
        setVideoAssets: (state, { payload }: PayloadAction<Asset>) => {
            state.video.vidAsset = payload
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