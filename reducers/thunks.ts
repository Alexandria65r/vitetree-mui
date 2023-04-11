import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppState } from "../store/store";
import { testActions } from "./test-reducer";
import { Choice, ChoiceTarget, Participant, Question, Section, Signin, Test } from "../src/reusable/interfaces";
import { questionChoices } from "../src/reusable/helpers";
import PartcipantAPI from "../src/api-services/partcipant";
import randomstring from 'randomstring'
import TestAPI from "../src/api-services/test";
import Cookies from "js-cookie";
import AuthAPI from "../src/api-services/auth";
import { authActions } from "./auth-reducer";
import { SCHOOYARD_AUTH_TOKEN } from "../src/reusable";
import Router from "next/router";




export const SignInThunk = createAsyncThunk<void, Signin, { state: AppState }>
    ('authSlice/SigninThunk', async (signInData, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const { data } = await AuthAPI.signin(signInData)
        if (data.success) {
            Cookies.set(SCHOOYARD_AUTH_TOKEN, data.token)
            dispatch(authActions.setAuhtUser(data.user))
            if(signInData.provider === 'google-provider') {
                localStorage.removeItem('redirectFlag')
            }
            Router.replace('/dashboard')
        } else {
            console.log(data)
            console.log(signInData.provider)
            if (data.message === `user doesn't exist` && signInData.provider === 'google-provider') {
                localStorage.removeItem('redirectFlag')
                Router.push('/signup?redirect=true&&authProvider=google')
            }
        }

    })






export const checkAuthThunk = createAsyncThunk<'success' | 'not-authorized' | undefined, any, { state: AppState }>
    ('authSlice/checkAuthThunk', async (_, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const state = thunkAPI.getState()
        const user = state.AuthReducer.user
        const token = Cookies.get(SCHOOYARD_AUTH_TOKEN)
        if (!token) return 'not-authorized'
        if (!user._id && token) {
            const { data } = await AuthAPI.DecodeToken(token)
            if (data.success) {
                dispatch(authActions.setAuhtUser(data.user))
                return 'success'
            }
        }


    })




export const updateTestQuestionThunk = createAsyncThunk
    <void, { value: string, questionIndex: number, updateKey: 'question' | 'answer' }, { state: AppState }>
    ('testSlice/updateTestQuestionThunk', async ({ value, questionIndex, updateKey }, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const state = thunkAPI.getState()
        console.log(questionIndex)
        const { newTest, sectionIndex } = state.TestReducer
        const clonedSections = [...newTest.sections];
        const clonedSection = { ...clonedSections[sectionIndex] }
        const clonedQuestions = [...clonedSection.questions]
        const clonedQuestion = { ...clonedSection.questions[questionIndex] }
        //toggle ans
        if (clonedQuestion.answer === value) {
            clonedQuestion[updateKey] = ''
        } else {
            clonedQuestion[updateKey] = value
        }
        clonedQuestions[questionIndex] = clonedQuestion
        clonedSection.questions = clonedQuestions
        clonedSections[sectionIndex] = clonedSection

        dispatch(testActions.setNewTestProperties({
            name: 'sections',
            value: clonedSections
        }))
        // dispatch(validateSectionQuestionsThunk({}))
    })


export const updateTestMultipleChoiceThunk = createAsyncThunk
    <void, { value: string | boolean, updateKey: 'ans' | 'isCorrect', targetKey: ChoiceTarget }, { state: AppState }>
    ('testSlice/updateTestMultipleChoiceThunk', ({ value, targetKey, updateKey }, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const state = thunkAPI.getState()
        const { newTest, sectionIndex, questionIndex } = state.TestReducer
        const clonedSections = [...newTest.sections];
        const clonedSection = { ...clonedSections[sectionIndex] }
        const clonedQuestions = [...clonedSection.questions]
        const clonedQuestion = { ...clonedSection.questions[questionIndex] }
        // if choices are undefined use prepared choices
        const targetKeys: ChoiceTarget[] = ['a', 'b', 'c', 'd']
        if (clonedQuestion.choices) {
            const clonedChoices = { ...clonedQuestion.choices }
            const clonedChoice: Choice | any = { ...clonedChoices[targetKey] }

            if (updateKey === 'ans') {
                // reset all to false
                targetKeys.forEach((key) => {
                    const clonedChoice = { ...clonedChoices[key] }
                    clonedChoice.isCorrect = false
                    clonedChoices[key] = clonedChoice
                })
            }
            clonedChoice[updateKey] = value
            clonedChoices[targetKey] = clonedChoice
            clonedQuestion.choices = clonedChoices
        }

        clonedQuestions[questionIndex] = clonedQuestion
        clonedSection.questions = clonedQuestions
        clonedSections[sectionIndex] = clonedSection

        dispatch(testActions.setNewTestProperties({
            name: 'sections',
            value: clonedSections
        }))
        //validate on values change
        // dispatch(validateSectionQuestionsThunk({}))
    })

export const setWithPreparedSections = createAsyncThunk<void, Test, { state: AppState }>
    ('testSlice/setWithPreparedSections', (testData, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const clonedSections = [...testData.sections]
        for (let sectionPos = 0; sectionPos < clonedSections.length; sectionPos++) {
            const clonedSection: Section = { ...clonedSections[sectionPos] }
            if (clonedSection.questions.length > 0) {
                dispatch(testActions.setTestData(testData))
                return
            } else {
                for (let questionCount = 0; questionCount < clonedSection.numberOfQuestions; questionCount++) {
                    if (clonedSection.questions.length === clonedSection.numberOfQuestions) return

                    const updatedSections: Question = {
                        question: '',
                        answer: '',
                        section: `section ${clonedSection.name}`
                    }
                    // choices if way of ansering is multiple choice
                    if (clonedSection.wayOfAnswering === 'multiple choice') {
                        updatedSections.choices = questionChoices
                    }

                    if (!clonedSection.questions.length) {
                        clonedSection.questions = [updatedSections]
                    } else {
                        clonedSection.questions.push(updatedSections)
                    }

                    clonedSections[sectionPos] = clonedSection
                }
            }
        }
        dispatch(testActions.setTestData({ ...testData, sections: clonedSections }))
    })



export const validateSectionQuestionsThunk = createAsyncThunk<any, any, { state: AppState }>
    ('testSlice/validateSectionQuestionsThunk', (_, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const { TestReducer: {
            newTest
        } } = thunkAPI.getState()
        const testSections = newTest.sections
        let isInvalid
        for (let secIndex = 0; secIndex < testSections.length; secIndex++) {
            const section = testSections[secIndex]

            for (let secQuesIndex = 0; secQuesIndex < section.questions.length; secQuesIndex++) {
                const { question, answer, choices } = testSections[secIndex].questions[secQuesIndex]
                if (section.wayOfAnswering === 'multiple choice') {
                    if (choices?.a.ans === "" || choices?.b.ans === "" || choices?.c.ans === "" || choices?.d.ans === "") {
                        isInvalid = { isInvalid: true }
                        //debugger
                        dispatch(testActions.setSectionIndex(0))
                        dispatch(testActions.setQuestionIdex(0))
                    }
                }
                if (answer === "" || question === "") {
                    isInvalid = { isInvalid: true }
                }
            }
        }
        return isInvalid
    })



export const prepareForPartcipant = createAsyncThunk<string | undefined, any, { state: AppState }>
    ('testSlice/prepareForPartcipant', async (_, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const state = thunkAPI.getState()
        const testData = state.TestReducer.newTest
        const partcipantId = randomstring.generate(19)
        const partcipant = state.TestReducer.partcipant
        const clonedSections = [...testData.sections]
        for (let sectionPos = 0; sectionPos < clonedSections.length; sectionPos++) {
            const clonedSection: Section = { ...clonedSections[sectionPos] }
            for (let questionCount = 0; questionCount < clonedSection.questions.length; questionCount++) {
                const questionsList = [...clonedSection.questions]
                const question = { ...questionsList[questionCount] }
                question.answer = ''
                questionsList[questionCount] = question
                clonedSection.questions = questionsList
                clonedSections[sectionPos] = clonedSection
            }
        }
        dispatch(testActions.setIsPreparigPartcipant(true))
        const { _id, __v, ...rest }: any = testData
        const preparedData = { ...rest, _id, sections: clonedSections }

        const { data } = await PartcipantAPI.create({
            ...partcipant,
            _id: partcipantId,
            testId: _id,
            test: preparedData
        })
        if (data.partcipant) {
            dispatch(testActions.setPartcipant(data.partcipant))
            dispatch(testActions.setIsPreparigPartcipant(false))
            return 'success'
        }
    })



export const markTakenTestThunk = createAsyncThunk<string | undefined, Test, { state: AppState }>
    ('testSlice/prepareForPartcipant', async (testData, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const state = thunkAPI.getState()
        const testTaken = state.TestReducer.newTest
        const partcipant = state.TestReducer.partcipant
        const clonedSections = [...testTaken.sections]
        const markingKeySections = testData.sections;
        for (let sectionPos = 0; sectionPos < clonedSections.length; sectionPos++) {
            const clonedSection: Section = { ...clonedSections[sectionPos] }
            const markingKeySection = markingKeySections[sectionPos]
            for (let questionCount = 0; questionCount < clonedSection.questions.length; questionCount++) {
                const questionsList = [...clonedSection.questions]
                const question = { ...questionsList[questionCount] }
                const margingKeyQuestion = markingKeySection.questions[questionCount]
                console.log(`taken ans: ${question.answer} | markingKey ans: ${margingKeyQuestion.answer}`)
                question.isCorrect = question.answer.toLowerCase() === margingKeyQuestion.answer.toLowerCase()
                questionsList[questionCount] = question
                clonedSection.questions = questionsList
                clonedSections[sectionPos] = clonedSection
            }
        }

        const update: Participant | any = {
            ...partcipant,
            taken: true,
            test: { ...partcipant.test, sections: clonedSections }
        }


        const { data } = await PartcipantAPI.update(partcipant?._id ?? '', update)
        dispatch(testActions.setPartcipant(update))
        dispatch(testActions.setTestData(update.test))

        if (data.success) {
            console.log('🎉😍')
            return 'success'
        }
    })

export const fetchTestDataThunk = createAsyncThunk<string | undefined, string, { state: AppState }>
    ('testSlice/fetchTestDataThunk', async (id, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const data = await TestAPI.fetchOne(id)
        if (data) {
            dispatch(testActions.setTestData(data))
            return 'success'
        }
    })

export const fetchPartcipantThunk = createAsyncThunk<string | undefined, string, { state: AppState }>
    ('testSlice/fetchPartcipantThunk', async (id, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const data = await PartcipantAPI.fetch(id)
        if (data && data?.test) {
            dispatch(testActions.setPartcipant(data))
            dispatch(testActions.setTestData(data.test))
            return 'success'
        }
    })
export const fetchTestPartcipantsThunk = createAsyncThunk<string | undefined, string, { state: AppState }>
    ('testSlice/fetchPartcipantThunk', async (id, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const data = await PartcipantAPI.fetchMany(id)
        if (data) {
            dispatch(testActions.setPartcipants(data))
            return 'success'
        }
    })




