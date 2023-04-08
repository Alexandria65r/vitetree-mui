import React from 'react'
import Layout from '../components/layout'
import { Box, InputAdornment, InputLabel, OutlinedInput, MenuItem, TextField, Typography, colors, styled, Button } from '@mui/material'
import { colorScheme } from '../theme'
import { CSS_PROPERTIES } from '../reusable'
//import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import PieChartIcon from '@mui/icons-material/PieChart';
import ShortTextIcon from '@mui/icons-material/ShortText';
import ListIcon from '@mui/icons-material/List';
import MultipleChoiceForm from '../components/question/multiple-choice-form'
import WithDiagram from '../components/question/with-diagram'
import WithOneWordAnswer from '../components/question/with-one-word-answer'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { mainActions } from '../../reducers'
import NewTestForm from '../components/new-test-form/new-test-form'

const Container = styled(Box)(({ theme }) => ({
    display: 'flex',
    width: '80%',
    padding: 20,
    margin: '0 auto',
    [theme.breakpoints.down("sm")]: {
        height:'calc(100vh - 60px)',
        alignItems:'center',
        width: '95%',
        padding: 0,
    }
}))
const TestInfoCol = styled(Box)(({ theme }) => ({
    flexBasis: '33%',
    height: 200,
    borderRadius: CSS_PROPERTIES.radius5,
    backgroundColor: '#fff',
    boxShadow: `0 1px 3px 0 ${colorScheme(theme).chatBoarderColor}`,
    [theme.breakpoints.down("sm")]: {
        display: 'none'
    }
}))
const TestFormContainer = styled(Box)(({ theme }) => ({
    flex: 1,
    marginLeft: 20,
    minHeight: 200,
    backgroundColor: colorScheme(theme).secondaryColor,
    borderRadius: CSS_PROPERTIES.radius5,
    boxShadow: `0 1px 3px 0 ${colorScheme(theme).chatBoarderColor}`,
    [theme.breakpoints.down("sm")]: {
        marginLeft: 0,
    }
}))
const TestHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flex: 1,
    minHeight: 60,
    backgroundColor: colorScheme(theme).secondaryColor,
    padding: 10,
    borderRadius: CSS_PROPERTIES.radius5,
    borderEndEndRadius: 0,
    borderBottomLeftRadius: 0,
    boxShadow: `0 1px 3px 0 ${colorScheme(theme).chatBoarderColor}`
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


type Props = {}

export default function NewTest({ }: Props) {
    const dispatch = useAppDispatch()
    const {
        isDiagramQuestion,
        isMultipleChoiceEnabled,
        isOneWordAnswerEnabled
    } = useAppSelector((state) => state.MainReducer)


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

    return (
        <Layout>
            <Container>
                <TestInfoCol>

                </TestInfoCol>
                <TestFormContainer>
                    <NewTestForm />
                </TestFormContainer>
            </Container>
        </Layout>
    )
}