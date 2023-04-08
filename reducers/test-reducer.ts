import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { MessageThread, Participant, Test } from '../src/reusable/interfaces'

type TestState = {
    newTest: Test,
    sectionIndex: number
    questionIndex: number,
    isErr: boolean,
    partcipant: Participant,
    isPreparigPartcipant: boolean
}
const initialState: TestState = {
    newTest: {
        _id: '',
        cartegory: '',
        sectionType: '',
        subjectOrlanguage: '',
        sections: [],
        duration:'',
        description: '',
    },
    sectionIndex: 0,
    questionIndex: 0,
    isErr: false,
    partcipant: {
        fullname: '',
        email: '',
        reason: '',
        testId: '',
        taken:false
    },
    isPreparigPartcipant: false

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