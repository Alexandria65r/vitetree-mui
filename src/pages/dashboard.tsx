import React, { useEffect, useState, useCallback } from 'react'
import Layout from '../components/layout'
import { Box, IconButton, Typography, colors, styled } from '@mui/material'
import { colorScheme } from '../theme'
import { CSS_PROPERTIES } from '../reusable'
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/router'
import TestAPI from '../api-services/test'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import TestCardOptions from '../components/test-card-options'
import { SearchInput, SearchInputWrap } from '../reusable/styles'
import SideBar from '../components/side-bar'
import { testActions } from '../../reducers/test-reducer'
import CreateButtonOptions from '../components/menus/create-button-options'
import Link from 'next/link'
import { SlGraduation } from 'react-icons/sl'
import { BiDetail, BiSearchAlt } from 'react-icons/bi'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { FaQuestionCircle } from 'react-icons/fa'
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
        gap: 10,
        width: '96%',
        gridTemplateColumns: 'repeat(2,1fr)',
    }
}))
const DashCard = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    height: 180,
    padding: 10,
    borderRadius: CSS_PROPERTIES.radius10,
    borderLeft: `5px solid ${colors.teal[400]}`,
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

export default function Darshboard({ }: Props) {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const [isFetching, setFetching] = useState<boolean>()
    const user = useAppSelector((state) => state.AuthReducer.user)
    const testsList = useAppSelector((state) => state.TestReducer.testList)
    const params: any = router.query.params || []

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
    console.log(router)

    return (
        <Layout>
            <FlexContainer>

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
                        {dashCardList(user.role).map((card, index) => (
                            <Link key={index} href={card.route}>
                                <DashCard sx={{ borderColor: card.accent }} >
                                    <Box sx={(theme) => ({
                                        // width: 180,
                                        [theme.breakpoints.down('sm')]: {
                                            //width: 230,
                                        },
                                    })}>

                                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                            {card.icon}
                                        </Box>
                                        <Typography sx={{
                                            fontWeight: 600,
                                            textOverflow: 'ellipsis',
                                            overflow: 'hidden'
                                        }}>{card.title}</Typography>

                                    </Box>
                                </DashCard>

                            </Link>
                        ))}
                    </MappedCards>

                    {/* <ButtonIcon onClick={() => router.push('/create-new-test')}>
                        <AddIcon fontSize="medium" />
                    </ButtonIcon> */}
                </Container>
            </FlexContainer>
        </Layout>
    )
}



const dashCardList = (userRole: 'Tutor' | 'Student' | string) => {

    if (userRole === 'Tutor') {
        return [
            {
                title: 'Tests', route: '/yard/tests',
                accent: colors.teal[400],
                icon: <SlGraduation size={40} color={colors.teal[400]} />
            },
            {
                title: 'Courses', route: '/yard/courses',
                accent: colors.deepOrange[400],
                icon: <SlGraduation size={40} color={colors.deepOrange[400]} />
            },
            {
                title: 'Bids', route: '/yard/courses',
                accent: colors.cyan[400],
                icon: <BiDetail size={40} color={colors.cyan[400]} />
            }
        ]
    } else {
        return [
            {
                title: 'Assessments', route: '/yard/tests',
                accent: colors.teal[400],
                icon: <SlGraduation size={40} color={colors.teal[400]} />
            },
            {
                title: 'Learnning', route: '/learnning',
                accent: colors.deepOrange[400],
                icon: <SlGraduation size={40} color={colors.deepOrange[400]} />
            },
            {
                title: 'Stuck Overflow', route: `/forum/all`,
                accent: colors.cyan[400],
                icon: <FaQuestionCircle size={40} color={colors.cyan[400]} />
            },
            {
                title: 'My Posts', route: '/forum/my-posts',
                accent: colors.cyan[400],
                icon: <BiDetail size={40} color={colors.cyan[400]} />
            },
            {
                title: 'Hire Tutor', route: '/tutors',
                accent: colors.indigo[400],
                icon: <BiSearchAlt size={40} color={colors.indigo[400]} />
            }
        ]
    }
} 