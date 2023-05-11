import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import *as Types from '../../src/reusable/interfaces'
import { StudentInquiry } from '../../src/reusable/schemas'

type InquiryNetworkStatus =
    'creatingInquiry' |
    'creatingInquirySuccess' |
    'creatingInquiryError' | 'fetch-inquiry' |
    'fetch-inquiry-success' | 'fetch-inquiry-error' | '' |
    'fetch-inquiries' | 'fetch-inquiries-success' |
    'fetch-inquiries-error' | ''


type InquiryState = {
    inquiry: Types.StudentInquiry
    inquiries: Types.StudentInquiry[]
    isErr: boolean
    inquiryNetworkStatus: InquiryNetworkStatus

}
const initialState: InquiryState = {
    inquiry: StudentInquiry,
    inquiries: [],
    isErr: false,
    inquiryNetworkStatus: ''
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
        }
    }
})



export const inquiryActions = inquirySlice.actions
export default inquirySlice.reducer