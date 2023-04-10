import React, { useCallback, useEffect } from 'react'
import Layout from '../../components/layout'
import { Box, styled, InputBase, ButtonBase, Typography, colors } from '@mui/material'
import { colorScheme } from '../../theme'
import { CSS_PROPERTIES } from '../../reusable'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { fetchTestDataThunk } from '../../../reducers/thunks'
import { useRouter } from 'next/router'
import TestAPI from '../../api-services/test'
import SearchIcon from '@mui/icons-material/Search';
import PartcipantsOptions from '../../components/menus/partcipant-menu'



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
    backgroundColor: '#fff',
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
    display: 'grid',
    gap: 10,
    gridTemplateColumns: 'repeat(2,1fr)',
    [theme.breakpoints.down("sm")]: {
        gridTemplateColumns: '1fr',
    }
}))

const PartcipantCard = styled(Box)(({ theme }) => ({
    position: 'relative',
    minHeight: 260,
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: colorScheme(theme).secondaryColor,
    borderRadius: CSS_PROPERTIES.radius5,
    boxShadow: `0 1px 3px 0 ${colorScheme(theme).chatBoarderColor}`,
    [theme.breakpoints.down("sm")]: {
        marginLeft: 0,
    }
}))


const SearchInputWrap = styled(Box)(({ theme }) => ({
    flexBasis: '100%',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: CSS_PROPERTIES.radius5,
    border: `1px solid ${colorScheme(theme).chatBoarderColor}`,
    [theme.breakpoints.down("sm")]: {
        flex: 1
    }
}))
const SearchInput = styled(InputBase)(({ theme }) => ({
    flex: 1,
    padding: '10px 10px 10px 0',
    backgroundColor: '#fff',
    borderRadius: CSS_PROPERTIES.radius5,
}))

const ScoreCircle = styled(Box)(({ theme }) => ({
    position: 'absolute',
    left: '50%',
    top: '30%',
    width: 140,
    height: 140,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 25,
    fontWeight: '600',
    cursor: 'pointer',
    transform: 'translateX(-50%)',
    color: '#fff',
    backgroundColor: colors.teal[400],
    transition: '0.3s all',
    boxShadow: `0 1px 3px 0 ${colorScheme(theme).chatBoarderColor}`,
    '&:hover': {
        backgroundColor: colors.teal[400],
    }
}))

const CardFooter = styled(Box)(() => ({
    flexBasis: '100%',
    alignSelf: 'flex-end',
    display: 'flex',
    justifyContent: 'center',
    margin: '8px 0',
}))

const Button = styled(ButtonBase)(({ theme }) => ({
    padding: '4px 10px',
    width: '60%',
    fontSize: 12,
    fontWeight: 500,
    border: `1px solid ${colors.teal[200]}`,
    borderRadius: CSS_PROPERTIES.radius5,
    [theme.breakpoints.down("sm")]: {
        width: '40%',
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
        const { _id, __v, ...rest }: any = newTest
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
                        {[1, 2, 3, 4].map((partcipant, index) => (
                            <PartcipantCard key={index}>
                                <PartcipantsOptions  />
                                <Box sx={{ padding: 2, flexBasis: '100%' }}>
                                    <Typography sx={{ textAlign: 'center', fontWeight: 600 }}>ROBERT CHING'AMBU</Typography>
                                    <Typography sx={{ fontSize: 13, textAlign: 'center' }} >12/05/2023</Typography>
                                </Box>
                                <ScoreCircle>
                                    100%
                                </ScoreCircle>
                                <CardFooter>
                                    <Button>View details</Button>
                                </CardFooter>
                            </PartcipantCard>
                        ))}
                    </MappedPartcipants>
                </PartcipantsContainer>
            </Container>
        </Layout>
    )
}