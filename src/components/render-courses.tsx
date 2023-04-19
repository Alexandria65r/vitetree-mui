import React, { useEffect, useState, useCallback } from 'react'
import Layout from './layout'
import { Box, IconButton, Typography, colors, styled } from '@mui/material'
import { colorScheme } from '../theme'
import { CSS_PROPERTIES } from '../reusable'
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/router'
import TestAPI from '../api-services/test'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import TestCardOptions from './test-card-options'
import { SearchInput, SearchInputWrap } from '../reusable/styles'
import SideBar from './side-bar'
import { testActions } from '../../reducers/test-reducer'
import CreateButtonOptions from './menus/create-button-options'



const FlexContainer = styled(Box)(({ theme }) => ({
    display: 'flex'
}))
const Container = styled(Box)(({ theme }) => ({
    flex: 1
}))

const SearchContainer = styled(Box)(({ theme }) => ({
    width: '80%',
    margin: 'auto',
    height: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down("sm")]: {
        width: '96%',
        height: 85,
    }
}))


const MappedCards = styled(Box)(({ theme }) => ({
    width: '80%',
    margin: 'auto',
    display: 'grid',
    gap: 15,
    gridTemplateColumns: 'repeat(3,1fr)',
    [theme.breakpoints.down("sm")]: {
        gap: 5,
        width: '96%',
        gridTemplateColumns: 'repeat(2,1fr)',
    }
}))
const Card = styled(Box)(({ theme }) => ({
    position: 'relative',
    minHeight: 180,
    padding: 10,
    borderRadius: CSS_PROPERTIES.radius10,
    //borderLeft: `5px solid ${colors.teal[400]}`,
    backgroundColor: colorScheme(theme).secondaryColor,
    boxShadow: `0 1px 3px 0 ${colorScheme(theme).chatBoarderColor}`,
    transition: '0.3s all',
    cursor: 'pointer',
    '&:hover': {
        transform: 'scale(1.03)'
    },
    [theme.breakpoints.down("sm")]: {
        height: 120,
    }
}))





const ButtonIcon = styled(IconButton)(({ theme }) => ({
    position: 'fixed',
    width: 60,
    height: 60,
    right: 10,
    bottom: 10,
    color: '#fff',
    borderRadius: '50%',
    backgroundColor: colors.teal[400],
    '&:focus': {
        backgroundColor: colors.teal[400],
    },
    boxShadow: `0 1px 3px 0 ${colors.teal[600]}`,
    [theme.breakpoints.up("sm")]: {
        display: 'none',
    }
}))






type Props = {}

export default function RenderCourses({ }: Props) {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const [isFetching, setFetching] = useState<boolean>()
    const user = useAppSelector((state) => state.AuthReducer.user)
    const testsList = useAppSelector((state) => state.TestReducer.testList)


    const fetchDashboardData = useCallback(async () => {
        setFetching(true)
        if (user._id) {
            const testsList = await TestAPI.fetchMany(user._id ?? '')
            if (testsList) {
                setFetching(false)
                dispatch(testActions.setTestList(testsList))
            }
        }
    }, [router.pathname, user, dispatch])


    useEffect(() => {
        fetchDashboardData()
    }, [router.pathname, user, dispatch])

    return (
        <Layout>
            <FlexContainer>
                <SideBar />
                <Container>
                    <SearchContainer>
                        <SearchInputWrap>
                            <SearchIcon sx={(theme) => ({
                                flexBasis: '6%',
                                [theme.breakpoints.down("sm")]: {
                                    flexBasis: '16%',
                                }
                            })} />
                            <SearchInput placeholder='Search' />
                        </SearchInputWrap>
                        <CreateButtonOptions />
                    </SearchContainer>

                    <MappedCards>
                        {isFetching ? (<>
                            {[1, 2, 3, 4, 5, 6].map((index) => (
                                <Card sx={(theme) => ({
                                    boxShadow: 'none',
                                    backgroundColor: theme.palette.mode === 'light' ? '#dcdcdc' : colorScheme(theme).secondaryColor
                                })} key={index}></Card>
                            ))}
                        </>
                        ) : (<>
                            {testsList.map((testData, index) => (
                                <Card key={index}>
                                    <Box sx={(theme) => ({
                                      //  width: 180,
                                        [theme.breakpoints.down('sm')]: {
                                         //   width: 230,
                                        },
                                        // [theme.breakpoints.down('xs')]: {
                                        //     width: 230,
                                        // },
                                    })}>
                                        <Typography sx={{
                                            fontWeight: 600,
                                           
                                            textOverflow: 'ellipsis',
                                            overflow: 'hidden'
                                        }}>{testData.subjectOrlanguage}</Typography>
                                    </Box>
                                    <Typography>{testData.cartegory}</Typography>
                                    <Typography sx={{ lineHeight: 1.2, fontSize: 12 }}>
                                        {testData.description}
                                    </Typography>
                                    <TestCardOptions testData={testData} />
                                </Card>
                            ))}
                        </>)}
                    </MappedCards>
                    <ButtonIcon onClick={() => router.push('/create-new-test')}>
                        <AddIcon fontSize="medium" />
                    </ButtonIcon>
                </Container>
            </FlexContainer>
        </Layout>
    )
}