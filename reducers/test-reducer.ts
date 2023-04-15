import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { Participant, Test } from '../src/reusable/interfaces'
import { testDataSchema } from '../src/reusable/schemas'

type TestState = {
    newTest: Test,
    sectionIndex: number
    questionIndex: number,
    isErr: boolean,
    partcipant: Participant,
    isPreparigPartcipant: boolean
    partcipants: Participant[],
    showTestTimer: boolean
    sections: string[]
}
const initialState: TestState = {
    newTest:testDataSchema,
    sectionIndex: 0,
    questionIndex: 0,
    isErr: false,
    partcipant: {
        fullname: '',
        email: '',
        reason: '',
        testId: '',
        score: '0%',
        taken: false
    },
    isPreparigPartcipant: false,
    partcipants: [],
    showTestTimer: false,
    sections: []

}

const testSlice = createSlice({
    name: 'testSlice',
    initialState,
    reducers: {
        setTestData: (state, { payload }: PayloadAction<Test>) => {
            state.newTest = payload
        },
        setPartcipant: (state, { payload }: PayloadAction<Participant>) => {
            state.partcipant = payload
        },
        setNewTestProperties: (state, { payload }: PayloadAction<{ name: string, value: any }>) => {
            state.newTest = {
                ...state.newTest,
                [payload.name]: payload.value
            }
        },
        setSectionIndex: (state, { payload }: PayloadAction<number>) => {
            state.sectionIndex = payload
        },
        setQuestionIdex: (state, { payload }: PayloadAction<number>) => {
            state.questionIndex = payload
        },
        setError: (state, { payload }: PayloadAction<boolean>) => {
            state.isErr = payload
        },
        setIsPreparigPartcipant: (state, { payload }: PayloadAction<boolean>) => {
            state.isPreparigPartcipant = payload
        },
        setPartcipants: (state, { payload }: PayloadAction<Participant[]>) => {
            state.partcipants = payload
        },
        setShowTestTimer: (state, { payload }: PayloadAction<boolean>) => {
            state.showTestTimer = payload
        },
        setSelectedSections: (state, { payload }: PayloadAction<string[]>) => {
            state.sections = payload
        }
    },

    extraReducers: {
        [HYDRATE]: (state, { payload }: any) => {
            return {
                ...state,
                ...payload.ChatReducer
            }
        }
    }
})


export const testActions = testSlice.actions
export default testSlice.reducer