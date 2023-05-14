import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as Types from '../../src/reusable/interfaces'
import { StudentInquiry } from '../../src/reusable/schemas'
import { InquiryFeedback, inquiryFeedbackModel } from '../../src/models/inquiry-feedback'

type InquiryNetworkStatus =
    'creatingInquiry' |
    'creatingInquirySuccess' |
    'creatingInquiryError' | 'fetch-inquiry' |
    'fetch-inquiry-success' | 'fetch-inquiry-error' | '' |
    'fetch-inquiries' | 'fetch-inquiries-success' |
    'fetch-inquiries-error' |
    'send-inquiry-feedback' | 'send-inquiry-feedback-success' |
    'send-inquiry-feedback-error' | '' |
    'fetch-inquiry-feedback' | 'fetch-inquiry-feedback-success' |
    'fetch-inquiry-feedback-error' | ''


type InquiryState = {
    inquiry: Types.StudentInquiry
    inquiries: Types.StudentInquiry[]
    isErr: boolean
    inquiryNetworkStatus: InquiryNetworkStatus
    inquiryFeedback: InquiryFeedback

}
const initialState: InquiryState = {
    inquiryNetworkStatus: '',
    inquiry: StudentInquiry,
    inquiries: [],
    isErr: false,
    inquiryFeedback: inquiryFeedbackModel
}

const inquirySlice = createSlice({
    name: 'inquirySlice',
    initialState,
    reducers: {
        setInquiry: (state, { payload }: PayloadAction<Types.StudentInquiry>) => {
            state.inquiry = payload
        },
        setInquiries: (state, { payload }: PayloadAction<Types.StudentInquiry[]>) => {
            state.inquiries = payload
        },
        setInquiryProps: (state, { payload }: PayloadAction<{ name: string, value: any }>) => {
            state.inquiry = { ...state.inquiry, [payload.name]: payload.value }
        },
        setError: (state, { payload }: PayloadAction<boolean>) => {
            state.isErr = payload
        },
        setInquiryNetworkStatus: (state, { payload }: PayloadAction<InquiryNetworkStatus>) => {
            state.inquiryNetworkStatus = payload
        },
        setInquiryFeedbackProps: (state, { payload }: PayloadAction<{ name: string, value: any }>) => {
            state.inquiryFeedback = { ...state.inquiryFeedback, [payload.name]: payload.value }
        },
        setInquiryFeedback: (state, { payload }: PayloadAction<InquiryFeedback>) => {
            state.inquiryFeedback = payload
        }
    }
})



export const inquiryActions = inquirySlice.actions
export default inquirySlice.reducer