import React, { useCallback, useEffect } from 'react'
import Layout from '../../components/layout'
import { Box, TextField, Typography, colors, styled, ButtonBase, Button, IconButton } from '@mui/material'
import { colorScheme } from '../../theme'
import { CSS_PROPERTIES } from '../../reusable'
//import Select from '@mui/joy/Select';
import PieChartIcon from '@mui/icons-material/PieChart';
import ShortTextIcon from '@mui/icons-material/ShortText';
import ListIcon from '@mui/icons-material/List';
import MultipleChoiceForm from '../../components/question/multiple-choice-form'
import WithDiagram from '../../components/question/with-diagram'
import WithOneWordAnswer from '../../components/question/with-one-word-answer'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { mainActions } from '../../../reducers'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TestFooter from '../../components/test-footer'
import { testActions } from '../../../reducers/test-reducer'
import { setWithPreparedSections, updateTestQuestionThunk, validateSectionQuestionsThunk } from '../../../reducers/thunks'
import TestAPI from '../../api-services/test'
import { useRouter } from 'next/router'
import { sectionSchems, testDataSchema } from '../../reusable/schemas'
import { CustomFormControl } from '../../reusable/styles'



const Container = styled(Box)(({ theme }) => ({
    display: 'flex',
    width: '90%',
    padding: 20,
    margin: '0 auto',
    [theme.breakpoints.down("sm")]: {
        marginTop: 10,
        alignItems: 'center',
        width: '100%',
        padding: 0,
    }
}))
const TestInfoCol = styled(Box)(({ theme }) => ({
    flexBasis: '33%',
    height: 200,
    borderRadius: CSS_PROPERTIES.radius5,
    backgroundColor: colorScheme(theme).secondaryColor,
    boxShadow: `0 1px 3px 0 ${colorScheme(theme).chatBoarderColor}`,
    [theme.breakpoints.down("sm")]: {
        display: 'none'
    }
}))
const TestContainer = styled(Box)(({ theme }) => ({
    flex: 1,
    marginLeft: 20,
    minHeight: 200,
    backgroundColor: colorScheme(theme).secondaryColor,
    //padding: 10,
    borderRadius: CSS_PROPERTIES.radius5,
    boxShadow: `0 1px 3px 0 ${colorScheme(theme).chatBoarderColor}`,
    [theme.breakpoints.down("sm")]: {
        marginLeft: 0,
    }
}))
const TestHeader = styled(Box)(({ theme }) => ({

    flex: 1,
    minHeight: 60,
    backgroundColor: colorScheme(theme).secondaryColor,
    borderRadius: CSS_PROPERTIES.radius5,
    borderEndEndRadius: 0,
    borderBottomLeftRadius: 0,
    boxShadow: `0 1px 3px 0 ${colorScheme(theme).chatBoarderColor}`
}))
const TestHeaderActions = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    minHeight: 60,
    backgroundColor: colorScheme(theme).secondaryColor,
    // padding: 10,
    borderRadius: CSS_PROPERTIES.radius5,
    borderEndEndRadius: 0,
    borderBottomLeftRadius: 0,
}))

const InnerTopHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    flexBasis: '100%',
    padding: 10,
    borderBottom: `1px solid ${colorScheme(theme).chatBoarderColor}`
}))

const HeaderButton = styled(Button)(({ theme }) => ({
    textTransform: 'capitalize',
    height: 45,
    borderRadius: 5,
    [theme.breakpoints.down('sm')]: {
        flexBasis: '100%',
        borderRadius: 5,
        margin: '6px 0'
    }
}))
const FormContainer = styled(Box)(({ theme }) => ({
    padding: 10,
}))



const TextInput = styled(TextField)(({ theme }) => ({
    flex: 1
}))
const QuestionNumber = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    margin: 5,
    borderRadius: '50%',

}))

const QuestionNumberText = styled(Typography)(() => ({
    fontSize: 16,
    fontWeight: 500,
    color: '#ffff'
}))
const PublishTestButton = styled(ButtonBase)(({ theme }) => ({
    padding: 10,
    color: '#fff',
    borderRadius: CSS_PROPERTIES.radius5,
    backgroundColor: colors.teal[400]
}))


type Props = {}

export default function NewTest({ }: Props) {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const testId: any = router.query.id || []

    const {
        isDiagramQuestion,
        isMultipleChoiceEnabled,
        isOneWordAnswerEnabled
    } = useAppSelector((state) => state.MainReducer)

    const newTest = useAppSelector((state) => state.TestReducer.newTest);
    const sectionIndex = useAppSelector((state) => state.TestReducer.sectionIndex);
    const questionIndex = useAppSelector((state) => state.TestReducer.questionIndex);
    const question = newTest?.sections[sectionIndex]?.questions[questionIndex]

    const testSections = newTest?.sections;
    const section = testSections?.length ? testSections[sectionIndex] : sectionSchems;
    const maxIndex = testSections?.length - 1;
    const isErr = useAppSelector((state) => state.TestReducer.isErr)

    const UpdateQuestionIndex = useCallback(() => dispatch(testActions.setQuestionIdex(0)), [])

    useEffect(() => {
        UpdateQuestionIndex()
    }, [sectionIndex])


    useEffect(() => {
        return () => {
            dispatch(testActions.setTestData(testDataSchema))
        }
    }, [])


    const fetchTestData = useCallback(async () => {
        if (typeof testId === 'string') {
            const testData = await TestAPI.fetchOne(testId)
            if (testData?._id) {
                dispatch(setWithPreparedSections(testData))
            }
        }
    }, [testId])

    useEffect(() => {
        fetchTestData()
    }, [testId])


    function handleQuestionType(target: string) {
        if (target === 'with-diagram') {
            dispatch(mainActions.setIsDiagramQuestion(!isDiagramQuestion))
        } else if (target === 'one-word') {
            dispatch(mainActions.setIsOneWordAnswer(!isOneWordAnswerEnabled))
        } else if (target === 'multiple-choice') {
            dispatch(mainActions.setIsMultipleQuestion(!isMultipleChoiceEnabled))
            dispatch(mainActions.setIsDiagramQuestion(false))
            dispatch(mainActions.setIsOneWordAnswer(false))
        }
    }

    function handleOnChage(value: string, updateKey: 'question' | 'answer') {
        dispatch(updateTestQuestionThunk({ value, questionIndex, updateKey }))
    }

    function NextSection() {
        if (sectionIndex === newTest.sections.length - 1) return;
        console.log(sectionIndex)
        dispatch(testActions.setSectionIndex(sectionIndex + 1))

    }
    function PrevSection() {
        if (sectionIndex <= 0) return;
        console.log(sectionIndex)
        dispatch(testActions.setSectionIndex(sectionIndex - 1))
    }


    function validateInputs() {
        const { question, answer, choices } =
            { ...newTest.sections[sectionIndex].questions[questionIndex] }
        if (section.wayOfAnswering === 'multiple choice') {
            if (!(question && answer && choices?.a.ans &&
                choices.b.ans && choices.c && choices.d.ans)) {
                console.log('validation CallEnd...')
                dispatch(testActions.setError(true))
                return true
            }
        } else if (!(question && answer)) {
            console.log('validation CallEnd...')
            dispatch(testActions.setError(true))
            return true
        } else {
            return false
        }

    }

    function nextQuestion() {
        const error = validateInputs()
        if (error) return
        if (questionIndex === section.numberOfQuestions - 1) return
        dispatch(testActions.setQuestionIdex(questionIndex + 1))
    }
    function prevQuestion() {
        if (questionIndex <= 0) return
        dispatch(testActions.setQuestionIdex(questionIndex - 1))
    }

    //publish test

    async function publishTest() {
        const { payload } = await dispatch(validateSectionQuestionsThunk({}))
        dispatch(testActions.setError(payload?.isInvalid))
        console.log(payload)
        if (payload?.isInvalid) return
        try {
            const { data } = await TestAPI.update(newTest._id, {
                sections: newTest.sections
            });
            if (data.success) {
                router.replace('/dashboard')
                console.log(data.updated)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Layout>
            <Container>
                <TestInfoCol>

                </TestInfoCol>
                <TestContainer>
                    <TestHeader>
                        <InnerTopHeader>
                            <Typography sx={(theme) => ({
                                flex: 1,
                                fontSize: 20,
                                fontWeight: 600,

                            })} >
                                {newTest?.subjectOrlanguage}
                            </Typography>
                            <Typography sx={(theme) => ({
                                flex: 1,
                                fontSize: 18,
                                fontWeight: 600,
                                [theme.breakpoints.down("sm")]: {
                                    flexBasis: '100%',
                                    textAlign: 'center',
                                    order: 3
                                }
                            })} >
                                Section {section?.name}
                            </Typography>
                            <IconButton onClick={PrevSection} sx={{ justifySelf: 'flex-end' }}>
                                <ChevronLeftIcon />
                            </IconButton>
                            <IconButton hidden={sectionIndex === maxIndex} onClick={NextSection}
                                sx={{ justifySelf: 'flex-end', marginRight: 1 }}>
                                <ChevronRightIcon />
                            </IconButton>
                            {section?.name === testSections[testSections?.length - 1]?.name && (
                                <PublishTestButton onClick={publishTest}>
                                    Publish
                                </PublishTestButton>
                            )}
                        </InnerTopHeader>
                        <TestHeaderActions>
                            {/* <HeaderButton size='medium' onClick={() => handleQuestionType('multiple-choice')} startIcon={<ListIcon />} variant='outlined'>
                                Multiple choice
                            </HeaderButton>
                            <HeaderButton size='medium' onClick={() => handleQuestionType('one-word')} startIcon={<ShortTextIcon />} variant='outlined'>
                                One word answer
                            </HeaderButton> */}
                            <HeaderButton size='medium'
                                sx={(theme) => ({
                                    [theme.breakpoints.down("sm")]: {
                                        flexBasis: '60%'
                                    }
                                })}
                                onClick={() => handleQuestionType('with-diagram')}
                                startIcon={<PieChartIcon />}
                                variant='outlined'>
                                Diagram question
                            </HeaderButton>
                        </TestHeaderActions>
                    </TestHeader>
                    <FormContainer>
                        {isDiagramQuestion && <WithDiagram />}
                        <CustomFormControl >
                            <QuestionNumber sx={{ backgroundColor: isErr && !question?.question ? colors.red[600] : colors.teal[400] }}>
                                <QuestionNumberText>{questionIndex + 1}/{section.numberOfQuestions}</QuestionNumberText>
                            </QuestionNumber>
                            <TextInput fullWidth
                                autoFocus
                                onChange={({ target: { value } }: any) => handleOnChage(value, 'question')}
                                error={isErr && !question?.question}
                                variant='outlined'
                                value={question?.question}
                                placeholder='Question'
                                label={`write the question ${questionIndex + 1}`}
                            />
                        </CustomFormControl>

                        {section?.wayOfAnswering === 'word answer' && <WithOneWordAnswer />}
                        {section?.wayOfAnswering === 'multiple choice' && <MultipleChoiceForm
                            question={section.questions[questionIndex]}
                        />}
                    </FormContainer>

                    <TestFooter nextQuestion={nextQuestion} prevQuestion={prevQuestion} />
                </TestContainer>
            </Container>
        </Layout>
    )
}