import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { AcademicAnswer } from "../../src/models/academic-answer"


export type AcademicAnswerNetworkStatus =
    'create-academic-answer' |
    'create-academic-answer-success' |
    'create-academic-answer-error' |
    'fetch-academic-answers' |
    'fetch-academic-answers-success' |
    'fetch-academic-answers-error' | ''

type AcademicAnswertate = {
  academicAnswersNetworkStatus: AcademicAnswerNetworkStatus
    answers: AcademicAnswer[]
}


const initialState: AcademicAnswertate = {
  academicAnswersNetworkStatus: '',
    answers: []
}


const academicAnswerSlice = createSlice({
    name: 'academicAnswerSlice',
    initialState,
    reducers: {
        setAnswers: (state, { payload }: PayloadAction<AcademicAnswer[]>) => {
            state.answers = payload
        },
        setAcademicAnswerNetworkStatus: (state, { payload }: PayloadAction<AcademicAnswerNetworkStatus>) => {
            state.academicAnswersNetworkStatus = payload
        }
    }
})


export const academicAnswersActions = academicAnswerSlice.actions
export default academicAnswerSlice.reducer