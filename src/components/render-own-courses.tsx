import React, { useEffect, useState, useCallback } from 'react'
import Layout from './layout'
import { Box, IconButton, colors, styled } from '@mui/material'
import { colorScheme } from '../theme'
import { CSS_PROPERTIES } from '../reusable'
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { SearchInput, SearchInputWrap } from '../reusable/styles'
import SideBar from './side-bar'
import CreateButtonOptions from './menus/create-button-options'
import CourseAPI from '../api-services/course'
import { courseActions } from '../../reducers/course-reducer'
import RenderCourses from './render-courses'
import { fetchPurchasedCourses } from '../../reducers/course-reducer/course-thunks'



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
    [theme.breakpoints.down("sm")]: {
        width: '100%',
    }
}))


const Card = styled(Box)(({ theme }) => ({
    position: 'relative',
    minHeight: 180,
    // padding: 10,
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

export default function RenderOwnCourses({ }: Props) {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const [isFetching, setFetching] = useState<boolean>()
    const user = useAppSelector((state) => state.AuthReducer.user)
    const courses = useAppSelector((state) => state.CourseReducer.courses)
    const [yard, _courses, purchased]: any = router.query.params

    const fetchDashboardData = useCallback(async () => {
        setFetching(true)
        if (user._id) {
            if (purchased === "purchased") {
                dispatch(fetchPurchasedCourses())
            } else {
                const courses = await CourseAPI.fetchOwnCourses(user._id ?? '', 'introduction')
                if (courses) {
                    setFetching(false)
                    dispatch(courseActions.setCourses(courses))
                }
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
                        <RenderCourses courses={courses} />
                    </MappedCards>
                    <ButtonIcon onClick={() => router.push('/create-new-test')}>
                        <AddIcon fontSize="medium" />
                    </ButtonIcon>
                </Container>
            </FlexContainer>
        </Layout>
    )
}