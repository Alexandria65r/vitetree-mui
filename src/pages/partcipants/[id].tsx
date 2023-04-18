import React, { useCallback, useEffect } from 'react'
import Layout from '../../components/layout'
import { Box, styled } from '@mui/material'
import { colorScheme } from '../../theme'
import { CSS_PROPERTIES } from '../../reusable'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { fetchTestPartcipantsThunk } from '../../../reducers/thunks'
import { useRouter } from 'next/router'
import SearchIcon from '@mui/icons-material/Search';
import PartcipantCard from '../../components/partcipant-card'
import { SearchInput, SearchInputWrap } from '../../reusable/styles'
import { testActions } from '../../../reducers/test-reducer'
import { participantSchema, testDataSchema } from '../../reusable/schemas'
import { partcipantActions } from '../../../reducers/partcipant-reducer'



const Container = styled(Box)(({ theme }) => ({
    display: 'flex',
    width: '80%',
    padding: 20,
    margin: '0 auto',
    [theme.breakpoints.down("sm")]: {
        alignItems: 'center',
        width: '95%',
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
const PartcipantsContainer = styled(Box)(({ theme }) => ({
    flex: 1,
    marginLeft: 20,
    [theme.breakpoints.down("sm")]: {
        margin: '10px 0 0 0',
    }
}))
const MappedPartcipants = styled(Box)(({ theme }) => ({
    marginTop:15,
    display: 'grid',
    gap: 10,
    gridTemplateColumns: 'repeat(2,1fr)',
    [theme.breakpoints.down("sm")]: {
        gridTemplateColumns: '1fr',
    }
}))



type Props = {}

export default function NewTest({ }: Props) {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const id: any = router.query.id || []
    const newTest = useAppSelector((state) => state.TestReducer.newTest)
    const partcipants = useAppSelector((state) => state.PartcipantReducer.partcipants)


    const fetchTestData =
        useCallback(() => dispatch(fetchTestPartcipantsThunk(id)), [id])
    useEffect(() => {
        fetchTestData()
        return () => {
            dispatch(testActions.setTestData(testDataSchema))
            dispatch(partcipantActions.setPartcipant(participantSchema))
            dispatch(testActions.setQuestionIdex(0))
            dispatch(testActions.setSectionIndex(0))
        }
    }, [id])



    return (
        <Layout>
            <Container>
                <TestInfoCol>

                </TestInfoCol>
                <PartcipantsContainer>
                    <SearchInputWrap>
                        <SearchIcon sx={(theme) => ({
                            flexBasis: '6%',
                            [theme.breakpoints.down("sm")]: {
                                flexBasis: '10%',
                            }
                        })} />
                        <SearchInput placeholder='Search' />
                    </SearchInputWrap>
                    <MappedPartcipants>
                        {partcipants.map((partcipant, index) => (
                            <PartcipantCard key={index}
                                partcipant={partcipant}
                                showDetailsButton={true}
                            />
                        ))}
                    </MappedPartcipants>
                </PartcipantsContainer>
            </Container>
        </Layout>
    )
}