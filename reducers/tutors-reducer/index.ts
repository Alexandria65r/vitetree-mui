import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import *as Types from '../../src/reusable/interfaces'
import { StudentInquiry, UserSchema } from '../../src/reusable/schemas'

export type TutorsNetworkStatus =
    'fetching-tutors' |
    'fetching-tutors-success' |
    'fetching-tutors-error' | ''

type InquiryState = {
    tutors: Types.User[]
    tutor: Types.User
    inquiry: Types.StudentInquiry
    isErr: boolean
    tutorsNetworkStatus: TutorsNetworkStatus
}
const initialState: InquiryState = {
    tutors: [],
    tutor: UserSchema,
    inquiry: StudentInquiry,
    isErr: false,
    tutorsNetworkStatus: ''
}

const tutorsSlice = createSlice({
    name: 'tutorsSlice',
    initialState,
    reducers: {
        setTutors: (state, { payload }: PayloadAction<Types.User[]>) => {
            state.tutors = payload
        },
        setTutor: (state, { payload }: PayloadAction<Types.User>) => {
            state.tutor = payload
        },
        setInquiry: (state, { payload }: PayloadAction<Types.StudentInquiry>) => {
            state.inquiry = payload
        },
        setInquiryProps: (state, { payload }: PayloadAction<{ name: string, value: any }>) => {
            state.inquiry = { ...state.inquiry, [payload.name]: payload.value }
        },
        setError: (state, { payload }: PayloadAction<boolean>) => {
            state.isErr = payload
        },
        setTutorsNetworkStatus: (state, { payload }: PayloadAction<TutorsNetworkStatus>) => {
            state.tutorsNetworkStatus = payload
        }
    }
})



export const tutorsActions = tutorsSlice.actions
export default tutorsSlice.reducer