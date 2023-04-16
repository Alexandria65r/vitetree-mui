import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { Participant, Test } from '../src/reusable/interfaces'
import { testDataSchema } from '../src/reusable/schemas'

type TestState = {
    newTest: Test,
    sectionIndex: number
    questionIndex: number,
    isErr: boolean,
    showTestTimer: boolean
    sections: string[]
    testList: Test[],
    isDuplicating: boolean
    isDeleting: boolean
}
const initialState: TestState = {
    newTest: testDataSchema,
    sectionIndex: 0,
    questionIndex: 0,
    isErr: false,
    showTestTimer: false,
    sections: [],
    testList: [],
    isDuplicating: false,
    isDeleting: false,
}

const testSlice = createSlice({
    name: 'testSlice',
    initialState,
    reducers: {
        setTestData: (state, { payload }: PayloadAction<Test>) => {
            state.newTest = payload
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
   
        setShowTestTimer: (state, { payload }: PayloadAction<boolean>) => {
            state.showTestTimer = payload
        },
        setSelectedSections: (state, { payload }: PayloadAction<string[]>) => {
            state.sections = payload
        },
        setTestList: (state, { payload }: PayloadAction<Test[]>) => {
            state.testList = payload
        },
        setIsDuplicating: (state, { payload }: PayloadAction<boolean>) => {
            state.isDuplicating = payload
        },
        setIsDeleting: (state, { payload }: PayloadAction<boolean>) => {
            state.isDeleting = payload
        },
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