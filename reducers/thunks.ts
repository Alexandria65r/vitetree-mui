import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppState } from "../store/store";
import { testActions } from "./test-reducer";
import { Choice, ChoiceTarget, Participant, Question, Section, Test } from "../src/reusable/interfaces";
import { questionChoices } from "../src/reusable/helpers";
import PartcipantAPI from "../src/api-services/partcipant";
import randomstring from 'randomstring'
import TestAPI from "../src/api-services/test";
import { mainActions } from "./main-reducer";
import { testDataSchema } from "../src/reusable/schemas";
import { partcipantActions } from "./partcipant-reducer";


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

            if (clonedSection.numberOfQuestions > clonedSection.questions.length) {
                console.log('time to update')
                const diff = clonedSection.numberOfQuestions - clonedSection.questions.length
                fillQuestion(clonedSections, diff, clonedSection, sectionPos)
            } else if (clonedSection.numberOfQuestions < clonedSection.questions.length) {
                console.log(`attention required!! in Section ${clonedSection.name} alert user`)
                console.log(`expected ${clonedSection.numberOfQuestions} questions`)
                console.log(`existing question ${clonedSection.questions.length}`)
                // const diff = clonedSection.numberOfQuestions - clonedSection.questions.length
                // fillQuestion(clonedSections, diff, clonedSection, sectionPos)
            } else {
                fillQuestion(clonedSections, clonedSection.numberOfQuestions, clonedSection, sectionPos)
            }
        }
        dispatch(testActions.setTestData({ ...testData, sections: clonedSections }))
    })




function fillQuestion(clonedSections: Section[], iterator: number, clonedSection: Section, sectionPos: number) {
    for (let questionCount = 0; questionCount < iterator; questionCount++) {
        if (clonedSection.numberOfQuestions === clonedSection.questions.length) return
        const updatedSections: Question = {
            question: '',
            answer: '',
            section: `section ${clonedSection.name}`
        }
        // choices if way of ansering is multiple choice
        if (clonedSection.wayOfAnswering === 'multiple choice') {
            updatedSections.choices = questionChoices
        }
        console.log(updatedSections)
        if (!clonedSection.questions.length) {
            clonedSection.questions = [updatedSections]
        } else {
            clonedSection.questions.push(updatedSections)
        }

        console.log(clonedSection)

        clonedSections[sectionPos] = clonedSection
    }
}



export const validateSectionQuestionsThunk = createAsyncThunk<any, undefined, { state: AppState }>
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



export const prepareForPartcipant = createAsyncThunk<string | undefined, undefined, { state: AppState }>
    ('testSlice/prepareForPartcipant', async (_, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const state = thunkAPI.getState()
        const testData = state.TestReducer.newTest
        const partcipantId = randomstring.generate(19)
        const partcipant = state.PartcipantReducer.partcipant
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
        dispatch(partcipantActions.setIsPreparigPartcipant(true))
        const { _id, __v, ...rest }: any = testData
        const preparedData = { ...rest, _id, sections: clonedSections }

        const { data } = await PartcipantAPI.create({
            ...partcipant,
            _id: partcipantId,
            testId: _id,
            test: preparedData
        })
        if (data.partcipant) {
            // dispatch(testActions.setPartcipant(data.partcipant))
            dispatch(partcipantActions.setIsPreparigPartcipant(false))
            return data.partcipant._id
        }
    })



export const markTakenTestThunk =
    createAsyncThunk<'success' | 'error' | undefined, undefined, { state: AppState }>
        ('testSlice/prepareForPartcipant', async (_, thunkAPI) => {
            const dispatch = thunkAPI.dispatch
            const state = thunkAPI.getState()
            const testTaken = state.TestReducer.newTest
            const partcipant = state.PartcipantReducer.partcipant
            const clonedSections = [...testTaken.sections]


            const testData = await TestAPI.fetchOne(partcipant.testId)

            if (testData !== undefined) {

                const markingKeySections = testData.sections;
                let totalQuestion = 0

                for (let sectionPos = 0; sectionPos < clonedSections.length; sectionPos++) {
                    const clonedSection: Section = { ...clonedSections[sectionPos] }
                    const markingKeySection = markingKeySections[sectionPos]
                    totalQuestion += clonedSection.numberOfQuestions
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

                const score = calculateScore(totalQuestion, clonedSections)
                const update: Participant | any = {
                    ...partcipant,
                    taken: true,
                    score,
                    test: { ...partcipant.test, sections: clonedSections }
                }

                const { data } = await PartcipantAPI.update(partcipant?._id ?? '', update)
                dispatch(partcipantActions.setPartcipant(update))
                dispatch(testActions.setTestData(update.test))

                if (data.success) {
                    localStorage.removeItem('timer-state')
                    console.log('🎉😍')
                    return 'success'
                } else {
                    return 'error'
                }

            }
        })



function calculateScore(totalQuestion: number, clonedSections: Section[]) {
    let numOfCorrectQuestions = 0
    for (let sectionPos = 0; sectionPos < clonedSections.length; sectionPos++) {
        const clonedSection: Section = { ...clonedSections[sectionPos] }
        for (let questionCount = 0; questionCount < clonedSection.questions.length; questionCount++) {
            if (clonedSection.questions[questionCount].isCorrect) {
                numOfCorrectQuestions += 1
            }
        }
    }
    const score = (numOfCorrectQuestions * 100) / totalQuestion
    console.log(`score ${score}`)

    return `${score}%`
}



export const fetchTestDataThunk = createAsyncThunk<Test | undefined, string, { state: AppState }>
    ('testSlice/fetchTestDataThunk', async (id, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const data = await TestAPI.fetchOne(id)
        if (data) {
            dispatch(testActions.setTestData(data))
            return data
        }
    })

export const fetchPartcipantThunk = createAsyncThunk<string | undefined, string, { state: AppState }>
    ('testSlice/fetchPartcipantThunk', async (id, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const data = await PartcipantAPI.fetch(id)
        if (data && data?.test) {
            dispatch(partcipantActions.setPartcipant(data))
            dispatch(testActions.setTestData(data.test))
            return 'success'
        }
    })
export const fetchTestPartcipantsThunk = createAsyncThunk<string | undefined, string, { state: AppState }>
    ('testSlice/fetchPartcipantThunk', async (id, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const data = await PartcipantAPI.fetchMany(id)
        if (data) {
            dispatch(partcipantActions.setPartcipants(data))
            return 'success'
        }
    })


export const updateQuestionThunk = createAsyncThunk<void, Question, { state: AppState }>
    ('testSlice/updateQuestionThunk', async (updated, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const state = thunkAPI.getState()
        const { newTest, sectionIndex, questionIndex } = state.TestReducer
        const clonedSections = [...newTest.sections]
        const clonedSection = { ...clonedSections[sectionIndex] }
        const clonedQuestions = [...clonedSections[sectionIndex].questions]

        clonedQuestions[questionIndex] = updated
        clonedSection.questions = clonedQuestions
        clonedSections[sectionIndex] = clonedSection

        dispatch(testActions.setNewTestProperties({
            name: 'sections',
            value: clonedSections
        }))
    })


export const duplicateTestThunk = createAsyncThunk<void, Test, { state: AppState }>
    ('testSlice/duplicateTestThunk', async (testData, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const state = thunkAPI.getState()
        const testList = state.TestReducer.testList
        const clonedTestData = { ...testData }
        const duplicatedId = randomstring.generate(19)
        clonedTestData._id = duplicatedId;
        clonedTestData.status = 'dirty'
        clonedTestData.subjectOrlanguage = `[Duplicated-${clonedTestData.subjectOrlanguage}]`
        dispatch(testActions.setIsDuplicating(true))
        const duplicatedTest = await TestAPI.create(clonedTestData)

        if (duplicatedTest) {
            dispatch(testActions.setIsDuplicating(false))
            dispatch(testActions.setTestList([...testList, duplicatedTest]))
            dispatch(mainActions.setDuplicateTestModal({
                component: 'close',
                testData: testDataSchema
            }))
        }
    })


export const deletTestDataThunk = createAsyncThunk<void, undefined, { state: AppState }>
    ('testSlice/deletTestDataThunk', async (_, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const state = thunkAPI.getState()
        const testId = state.MainReducer.deleteTestModal.testId
        const testList = [...state.TestReducer.testList]
        dispatch(testActions.setIsDeleting(true))
        const { data } = await TestAPI.delete(testId ?? '');
        if (data.success) {
            const newTestList = testList.filter((testItem) => testItem._id !== testId)
            dispatch(testActions.setTestList(newTestList))
            dispatch(testActions.setIsDeleting(false))
            dispatch(mainActions.setDeleteTestModal({
                component: 'close',
                testId: '',
                subject: ''
            }))
        }
    })
export const deletTestPartcipantThunk = createAsyncThunk<void, undefined, { state: AppState }>
    ('testSlice/deletTestDataThunk', async (_, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const state = thunkAPI.getState()
        const partcipantId = state.MainReducer.deletePartcipantModal.partcipantId
        const partcipants = [...state.PartcipantReducer.partcipants]
        dispatch(partcipantActions.setIsPartcipantDeleting(true))
        const { data } = await PartcipantAPI.delete(partcipantId ?? '');
        if (data.success) {
            const newTestList = partcipants.filter((partcipant) => partcipant._id !== partcipantId)
            dispatch(partcipantActions.setPartcipants(newTestList))
            dispatch(partcipantActions.setIsPartcipantDeleting(false))
            dispatch(mainActions.setDeletePartcipantModal({
                component: 'close',
                partcipantId: '',
                fullname: ''
            }))
        }
    })




