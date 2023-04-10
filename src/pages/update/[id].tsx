import React, { useCallback, useEffect } from 'react'
import Layout from '../../components/layout'
import { Box, styled, Button } from '@mui/material'
import { colorScheme } from '../../theme'
import { CSS_PROPERTIES } from '../../reusable'
//import Select from '@mui/joy/Select';
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import NewTestForm from '../../components/new-test-form/new-test-form'
import { fetchTestDataThunk } from '../../../reducers/thunks'
import { useRouter } from 'next/router'
import TestAPI from '../../api-services/test'

const Container = styled(Box)(({ theme }) => ({
    display: 'flex',
    width: '80%',
    padding: 20,
    margin: '0 auto',
    [theme.breakpoints.down("sm")]: {
        height: 'calc(100vh - 60px)',
        alignItems: 'center',
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
    const router = useRouter()
    const id: any = router.query.id || []
    const newTest = useAppSelector((state) => state.TestReducer.newTest)


    const fetchTestData =
        useCallback(() => dispatch(fetchTestDataThunk(id)), [])
    useEffect(() => {
        fetchTestData()
    }, [])

    async function update() {
        const { _id, __v, ...rest }:any = newTest
        const { data } = await TestAPI.update(id, rest)
        if (data.success) {
            router.push(`/prepare/${data.updated._id}`)
        }
    }

    return (
        <Layout>
            <Container>
                <TestInfoCol>

                </TestInfoCol>
                <TestFormContainer>
                    <NewTestForm mode="update" submitHandler={update} />
                </TestFormContainer>
            </Container>
        </Layout>
    )
}