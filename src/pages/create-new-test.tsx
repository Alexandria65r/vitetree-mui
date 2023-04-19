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
import TestAPI from '../api-services/test'
import { useRouter } from 'next/router'
import randomstring from 'randomstring'

const Container = styled(Box)(({ theme }) => ({
    display: 'flex',
    width: '75%',
    padding: 20,
    margin: '0 auto',
    [theme.breakpoints.down("sm")]: {
        height: 'calc(100vh - 60px)',
        alignItems: 'center',
        width: '95%',
        padding: 0,
    }
}))
const TestHeader = styled(Box)(({ theme }) => ({
    flex: 1,
    minHeight: 60,
    display: 'flex',
    alignItems: 'center',
    padding:'0 10px',
    backgroundColor: colorScheme(theme).secondaryColor,
    borderRadius: CSS_PROPERTIES.radius5,
    borderEndEndRadius: 0,
    borderBottomLeftRadius: 0,
    boxShadow: `0 1px 3px 0 ${colorScheme(theme).chatBoarderColor}`
}))
const TestInfoCol = styled(Box)(({ theme }) => ({
    flexBasis: '35%',
    height: 200,
    borderRadius: CSS_PROPERTIES.radius5,
    backgroundColor: colorScheme(theme).secondaryColor,
    boxShadow: `0 1px 3px 0 ${colorScheme(theme).chatBoarderColor}`,
    [theme.breakpoints.down("sm")]: {
        display: 'none'
    }
}))
const TestFormContainer = styled(Box)(({ theme }) => ({
    flexBasis:'55%',
    marginLeft: 20,
    minHeight: 200,
    backgroundColor: colorScheme(theme).secondaryColor,
    borderRadius: CSS_PROPERTIES.radius5,
    boxShadow: `0 1px 3px 0 ${colorScheme(theme).chatBoarderColor}`,
    [theme.breakpoints.down("sm")]: {
        marginLeft: 0, flexBasis: '100%',
    }
}))



type Props = {}

export default function NewTest({ }: Props) {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const testData = useAppSelector((state) => state.TestReducer.newTest)
    const isErr = useAppSelector((state) => state.TestReducer.isErr)
    const user = useAppSelector((state) => state.AuthReducer.user)



    async function create() {
        const testId = randomstring.generate(19)
        const newTest = await TestAPI.create({
            ...testData,
            _id: testId,
            authorId: user._id ?? ''
        })

        if (newTest) {
            console.log(newTest)
            router.push(`/prepare/${newTest._id}`)
        }
    }

    return (
        <Layout>
            <Container>
                <TestInfoCol>

                </TestInfoCol>
                <TestFormContainer>
                    <TestHeader>
                        <Typography variant='h6' sx={{fontWeight:600}}>Create new test</Typography>
                    </TestHeader>
                    <NewTestForm mode="create" submitHandler={create} />
                </TestFormContainer>
            </Container>
        </Layout>
    )
}