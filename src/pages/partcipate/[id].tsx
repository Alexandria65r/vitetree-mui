import React, { useCallback, useEffect } from 'react'
import Layout from '../../components/layout'
import { Box, TextField, Typography, colors, styled, Button, IconButton, ButtonBase } from '@mui/material'
import { colorScheme } from '../../theme'
import { CSS_PROPERTIES } from '../../reusable'
//import Select from '@mui/joy/Select';
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { mainActions } from '../../../reducers'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TestFooter from '../../components/test-footer'
import { testActions } from '../../../reducers/test-reducer'
import { markTakenTestThunk, updateTestQuestionThunk, validateSectionQuestionsThunk } from '../../../reducers/thunks'
import { Choice, ChoiceTarget, Question } from '../../reusable/interfaces'
import PartcipantAPI from '../../api-services/partcipant'
import { useRouter } from 'next/router'
import TestAPI from '../../api-services/test'
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import PartcipantCard from '../../components/partcipant-card'

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '90%',
  padding: 20,
  margin: '0 auto',
  [theme.breakpoints.down("sm")]: {
    width: '100%',
    padding: 0,
    marginTop: 5,
  }
}))
const TestInfoCol = styled(Box)(({ theme }) => ({
  flexBasis: '33%',
  height: 200,
  borderRadius: CSS_PROPERTIES.radius5,
  backgroundColor: '#fff',
  //border: `1px solid ${colorScheme(theme).secondaryColor}`
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

const InnerTopHeader = styled(Box)(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  flexBasis: '100%',
  padding: 10,
  //borderBottom: `1px solid ${colorScheme(theme).chatBoarderColor}`
}))

const QuestionContainer = styled(Box)(({theme}) => ({
  userSelect: 'none',
  padding: 10,
  borderBottom: `1px solid ${colorScheme(theme).chatBoarderColor}`,
}))

const QuestionFlexWrap = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  margin: '5px 0'
}))


const TextInput = styled(TextField)(() => ({
  flex: 1,
  marginLeft: 15,
}))
const QuestionNumber = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 50,
  height: 50,
  margin: 5,
  borderRadius: '50%',

}))

const QuestionText = styled(Typography)(() => ({
  fontSize: 16,
  fontWeight: 500,
  //color: '#ffff'
}))
const QuestionNumberText = styled(Typography)(() => ({
  fontSize: 20,
  fontWeight: 500,
  color: '#ffff'
}))

const AnswerContainer = styled(Box)(() => ({
  marginLeft: 8,
  position: 'relative'
}))

const ChoiceFlexWrap = styled(Box)(() => ({
  width: 'calc(100% - 30px)',
  display: 'flex',
  alignItems: 'center',
  padding: 8,
  cursor: 'pointer',
  borderRadius: CSS_PROPERTIES.radius10,
  transition: '0.3s all',
  border: `1px solid transparent`,
  '&:hover': {
    border: `1px solid ${colors.teal[400]}`,
  }
}))


const MultipleChoiceBadge = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 35,
  height: 35,
  marginRight: 8,
  fontSize: 16,
  fontWeight: 500,
  borderRadius: '50%',
  border: `1px solid ${colors.teal[400]}`,
  color: colors.teal[400],
  transition: '0.3s all',
}))

const PublishTestButton = styled(ButtonBase)(() => ({
  padding: 10,
  color: '#fff',
  borderRadius: CSS_PROPERTIES.radius5,
  backgroundColor: colors.teal[400]
}))
const Mark = styled(Box)(() => ({
  position: 'absolute',
  right: 20,
  top: 13
}))



type Props = {}

export default function NewTest({ }: Props) {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const newTest = useAppSelector((state) => state.TestReducer.newTest);
  const sectionIndex = useAppSelector((state) => state.TestReducer.sectionIndex);
  const questionIndex = useAppSelector((state) => state.TestReducer.questionIndex);
  const partcipant = useAppSelector((state) => state.TestReducer.partcipant);
  const isTaken = partcipant.taken

  const testSections = newTest.sections;
  const section = testSections[sectionIndex];
  const maxIndex = testSections.length - 1;
  const isErr = useAppSelector((state) => state.TestReducer.isErr)
  const id: any = router.query.id || []


  useEffect(() => {
    dispatch(testActions.setQuestionIdex(0))
  }, [sectionIndex])


  const fetchTestData = useCallback(async () => {
    if (typeof id === 'string') {
      const partcipant = await PartcipantAPI.fetch(id)
      if (partcipant?._id) {
        dispatch(testActions.setPartcipant(partcipant))
        if (partcipant.test) {
          dispatch(testActions.setTestData(partcipant?.test))
        }
      }
    }
  }, [id])



  useEffect(() => {
    fetchTestData()
  }, [id])




  // function handleOnChage(value: string, updateKey: 'question' | 'answer') {
  //   dispatch(updateTestQuestionThunk({ value, updateKey }))
  // }

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
      if (!(question && answer && choices?.a && choices.b && choices.c && choices.d)) {
        console.log('validation CallEnd...')
        dispatch(testActions.setError(true))
      }
    } else if (!(question && answer)) {
      console.log('validation CallEnd...')
      dispatch(testActions.setError(true))
    }

  }

  function nextQuestion() {
    validateInputs()
    if (isErr) return
    if (questionIndex === section.numberOfQuestions - 1) return
    dispatch(testActions.setQuestionIdex(questionIndex + 1))
  }
  function prevQuestion() {
    if (questionIndex <= 0) return
    dispatch(testActions.setQuestionIdex(questionIndex - 1))
  }



  function markAnswer(targetKey: ChoiceTarget, questionIndex: number) {
    if (isTaken) return
    console.log(targetKey)
    dispatch(updateTestQuestionThunk({
      value: targetKey,
      questionIndex,
      updateKey: 'answer'
    }))
  }


  const choicesList = (choices: any) => {
    const resArr = Object.keys(choices).map((key) => [choices[key]])
    return resArr.flat()
  }
  function handleWordAnswer(value: string, questionIndex: number) {
    dispatch(updateTestQuestionThunk({
      questionIndex,
      updateKey: 'answer',
      value
    }))
  }

  async function submit() {
    const { payload } = await dispatch(validateSectionQuestionsThunk({}))
    dispatch(testActions.setError(payload?.isInvalid))
    console.log(payload)
    if (payload?.isInvalid) {
      dispatch(testActions.setSectionIndex(0))
      return
    } else {
      const testData = await TestAPI.fetchOne(partcipant.testId)
      if (testData) {
        dispatch(markTakenTestThunk(testData))
      }

    }
  }

  function getAccent(question: Question, choice: Choice) {
    let accent = ''
    if (!isTaken && question.answer === choice.choice) {
      accent = colors.teal[400]
    } else if (isTaken && question.isCorrect && question.answer === choice.choice) {
      accent = colors.teal[400]

    } else if (isTaken && !question.isCorrect && question.answer === choice.choice) {
      accent = colors.red[400]

    } else if (isTaken && question.answer !== choice.choice) {
      accent = colors.teal[400]
    }

    return accent

  }
  function getQuestionBadgeAccent(question: Question) {
    let accent = ''
    if (isTaken && question.isCorrect) {
      accent = colors.teal[400]
    } else if (isTaken && !question.isCorrect) {
      accent = colors.red[400]
    } else if (!isTaken && !question.answer) {
      accent = colors.red[400]
    } else if (!isTaken && isErr) {
      accent = colors.red[400]
    } else {
      accent = colors.teal[400]
    }
    return accent
  }


  return (
    <Layout>
      <Container>
        <TestInfoCol>
          <PartcipantCard partcipant={partcipant} />
        </TestInfoCol>

        <TestContainer>
          <TestHeader>
            <InnerTopHeader>
              <Typography sx={{ flex: 1, fontSize: 20, fontWeight: 600 }} >{newTest?.subjectOrlanguage}</Typography>
              {section?.name !== 'None sectioned' && (
                <Typography sx={(theme) => ({
                  flex: 1,
                  fontSize: 18,
                  fontWeight: 600,
                  [theme.breakpoints.down("sm")]: {
                    flexBasis: '100%',
                    textAlign: 'center',
                    order: 3
                  }
                })} >Section {section?.name}</Typography>
              )}
              {section?.name !== 'None sectioned' && (<>

                <IconButton onClick={PrevSection} sx={{ justifySelf: 'flex-end' }}>
                  <ChevronLeftIcon />
                </IconButton>
                <IconButton hidden={sectionIndex === maxIndex} onClick={NextSection} sx={{ justifySelf: 'flex-end' }}>
                  <ChevronRightIcon />
                </IconButton>

              </>)}
              {!isTaken && section?.name === testSections[testSections?.length - 1]?.name && (
                <PublishTestButton onClick={submit}>
                  Submit
                </PublishTestButton>
              )}
            </InnerTopHeader>
          </TestHeader>
          {section?.questions.map((question, index) => (
            <QuestionContainer key={index}>
              <QuestionFlexWrap>
                <QuestionNumber sx={{ backgroundColor: getQuestionBadgeAccent(question) }}>
                  <QuestionNumberText>{index + 1}</QuestionNumberText>
                </QuestionNumber>
                <QuestionText sx={{ color: isErr && !question.answer ? colors.red[400] : '' }}>{question?.question}</QuestionText>
              </QuestionFlexWrap>
              <AnswerContainer>


                {section.wayOfAnswering === 'word answer' && (<>
                  {isTaken && (
                    <Mark sx={{ color: question.isCorrect ? colors.teal[400] : colors.red[400] }}>
                      {question.isCorrect ? <CheckIcon /> : <CloseIcon />}
                    </Mark>
                  )}
                  <TextInput label={`Word answer ${isTaken && question.isCorrect ? 'correct' : 'wrong'}`}
                    onChange={({ target: { value } }: any) => handleWordAnswer(value, index)}
                    error={isTaken && !question.isCorrect}
                    disabled={isTaken}
                    value={question.answer}
                    variant='filled'
                    size='small'
                    placeholder='Answer'
                  />
                </>)}

                {section?.wayOfAnswering === 'multiple choice' && (<>
                  {choicesList(question.choices).map((choice: Choice) => (
                    <ChoiceFlexWrap key={choice.choice}
                      onClick={() => markAnswer(choice.choice, index)}
                      sx={{
                        marginLeft: 2,
                        '&:hover': {
                          borderColor: question.answer === choice.choice ? getAccent(question, choice) : 'transparent'
                        },
                        borderColor: question.answer === choice.choice ? getAccent(question, choice) : 'transparent'
                      }}>
                      <MultipleChoiceBadge sx={{
                        textTransform: 'uppercase',
                        borderColor: getAccent(question, choice),
                        backgroundColor: question.answer === choice.choice ? getAccent(question, choice) : 'transparent',
                        color: question.answer === choice.choice ? '#fff' : ''
                      }} >{choice.choice}</MultipleChoiceBadge>
                      <QuestionText sx={{ fontSize: 14 }}>{choice.ans}</QuestionText>
                    </ChoiceFlexWrap>
                  ))}
                </>)}
              </AnswerContainer>
            </QuestionContainer>
          ))}
          <TestFooter nextQuestion={nextQuestion} prevQuestion={prevQuestion} />
        </TestContainer>
      </Container>
    </Layout>
  )
}