import React, { useCallback, useEffect } from 'react'
import Layout from '../../components/layout'
import { Box, Typography, colors, styled } from '@mui/material'
import { Avatar, ButtonIcon, StyledButton } from '../../reusable/styles'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { ThemedText, colorScheme } from '../../theme';
import { Router, useRouter } from 'next/router';
import CourseAPI from '../../api-services/course';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { courseActions } from '../../../reducers/course-reducer';
import { CSS_PROPERTIES } from '../../reusable';
import BuyCourseButton from '../../components/menus/buy-course-button';
import RenderLectures from './render-lectures';

const Container = styled(Box)(({ theme }) => ({
    maxWidth: '95%',
    margin: '20px auto',
    display: 'flex',
    gap: 20,
    [theme.breakpoints.down('sm')]: {
        gap: 10,
        maxWidth: '100%',
        margin: '0px auto',
        flexWrap: 'wrap'
    }
}))
const MainColumn = styled(Box)(({ theme }) => ({
    flexBasis: '65%',
    [theme.breakpoints.down('sm')]: {
        flexBasis: '100%'
    }

}))
const VideoPlayerContainer = styled(Box)(({ theme }) => ({
    height: 420,
    backgroundColor: '#000',
    [theme.breakpoints.down('sm')]: {
        height: 230,
    }
}))
const VideoPlayer = styled('video')(({ theme }) => ({
    height: 420,
    width: '100%',
    [theme.breakpoints.down('sm')]: {
        height: 230,
    }
}))
const CourseInfo = styled(Box)(({ theme }) => ({
    marginTop: 10,
    [theme.breakpoints.down('sm')]: {
        padding: '0 10px'
    }
}))

const CourseMoreOptions = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
        marginTop: 5,
    }
}))
const AuthorCol = styled(Box)(({ theme }) => ({
    flex: 1,
    display: 'flex',
    //gridTemplateColumns: 'repeat(2,1fr)',
    alignItems: 'center'
}))
const Description = styled(Box)(({ theme }) => ({
    marginTop: 10,
    minHeight: 60,
    padding: 10,
    borderRadius: CSS_PROPERTIES.radius5,
    backgroundColor: colorScheme(theme).secondaryColor,
    boxShadow: `0 1px 3px 0px ${theme.palette.mode === 'light' ? '#ddd' : 'transparent'}`
}))


const RelatedColumn = styled(Box)(({ theme }) => ({
    flexBasis: '30%',
    padding: 10,
    [theme.breakpoints.down('sm')]: {
        marginTop: 15,
        flexBasis: '100%',
        borderTop: `1px solid ${colorScheme(theme).borderColor}`
    }
}))

type Props = {}

export default function CoursePreview({ }: Props) {
    const router = useRouter()
    const id: any = router.query.id || []
    const dispatch = useAppDispatch()
    const course = useAppSelector((state) => state.CourseReducer.video)
    const fetchCourse = useCallback(async () => {
        const courseResponse = await CourseAPI.fetchCourse(id, 'introduction')
        if (courseResponse) {
            dispatch(courseActions.setVideo(courseResponse))
        }
    }, [id])


    useEffect(() => {
        fetchCourse()
    }, [id, dispatch, fetchCourse])





    return (
        <Layout>
            <Container>
                <MainColumn>
                    <VideoPlayerContainer>
                        <VideoPlayer controls
                            src={course.vidAsset.secureURL}
                            poster={course.imageAsset.secureURL}

                        />
                    </VideoPlayerContainer>
                    <CourseInfo>
                        <Typography sx={{ fontSize: 22, fontWeight: 'semibold' }}>
                            {course.title} {course.type}
                        </Typography>
                        <CourseMoreOptions>
                            <AuthorCol>
                                <Avatar sx={{ mr: 1 }}></Avatar>
                                <Box>
                                    <Typography sx={{ m: 0, lineHeight: 1.2, fontSize: 16, fontWeight: 500 }}>
                                        FreeMan
                                    </Typography>
                                    <Typography sx={{ p: 0, fontSize: 13, fontWeight: 400, color: colors.grey[600] }}>
                                        Verified Tutor
                                    </Typography>
                                </Box>
                            </AuthorCol>
                            <BuyCourseButton course={course} />
                            <ButtonIcon>
                                <MoreVertOutlinedIcon />
                            </ButtonIcon>
                        </CourseMoreOptions>
                        <Description>
                            <Typography sx={{ m: 0, lineHeight: 1.2, fontSize: 14, fontWeight: 500 }}>
                                {course.description}
                            </Typography>
                        </Description>
                    </CourseInfo>
                </MainColumn>
                <RelatedColumn>
                    
                    <RenderLectures />
                </RelatedColumn>
            </Container>
        </Layout>
    )
}