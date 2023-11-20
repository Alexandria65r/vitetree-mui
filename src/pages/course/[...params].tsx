import React, { useState, useEffect, useCallback } from 'react'
import Layout from '../../components/layout'
import { Box, Typography, styled, useTheme } from '@mui/material'
import { ThemedText, colorScheme } from '../../theme'
import { CSS_PROPERTIES } from '../../reusable'

import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { useRouter } from 'next/router'
import randomstring from 'randomstring'
import UploadCourseForm from '../../components/upload-course-form/upload-course-form'
import BrowseFileButton from '../../components/browse-file-button'
import UploadAPI from '../../api-services/upload'
import { courseActions } from '../../../reducers/course-reducer'
import CourseAPI from '../../api-services/course'
import { VideoCourseSchema } from '../../reusable/schemas'
import { Asset, VideoCourse } from '../../reusable/interfaces'
import VideoCard from '../../components/course/video-card'
import RenderLectures from '../course-detail/render-lectures'

const Container = styled(Box)(({ theme }) => ({
    width: '75%',
    padding: 20,
    margin: '0 auto',
    [theme.breakpoints.down("sm")]: {
        alignItems: 'center',
        width: '100%',
        padding: 0,
    },
    [theme.breakpoints.up("xl")]: {
        width: '65%',
    }
}))
const FlexContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    gap: 15,
    [theme.breakpoints.down("sm")]: {
        gap: 0,
        //margin: '10px auto',
        alignItems: 'center',
        width: '100%',
        padding: 0,
    }
}))

const TestHeader = styled(Box)(({ theme }) => ({
    flex: 1,
    minHeight: 60,
    display: 'flex',
    alignItems: 'center',
    padding: '0 10px',
    marginBottom: 10,
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
        flexBasis: '100%',
        marginBottom: 10
    }
}))
const TestFormContainer = styled(Box)(({ theme }) => ({
    justifySelf: 'flex-end',
    flex: 1,
    padding: 10,
    minHeight: 200,
    backgroundColor: colorScheme(theme).secondaryColor,
    borderRadius: CSS_PROPERTIES.radius5,
    boxShadow: `0 1px 3px 0 ${colorScheme(theme).chatBoarderColor}`,
    [theme.breakpoints.down("sm")]: {
        borderRadius: 0,
        flexBasis: '100%',
        marginLeft: 0,
        padding: 0,
    }
}))

const ThumbnailContainer = styled(Box)(({ theme }) => ({
    position: 'relative',
    height: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: CSS_PROPERTIES.radius5,
    backgroundColor: colorScheme(theme).secondaryColor,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    [theme.breakpoints.down("sm")]: {
        marginInline: 5
    }
}))





type Props = {}

export default function NewTest({ }: Props) {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const user = useAppSelector((state) => state.AuthReducer.user)
    const course = useAppSelector((state) => state.CourseReducer.video)
    const courses = useAppSelector((state) => state.CourseReducer.courses)
    const newVideo = useAppSelector((state) => state.CourseReducer.newVideo)

    const params: any = router.query.params || []
    const mainCourseId: any = params[0]
    const [imageAssests, setImageAssets] = useState<Asset>({
        publicId: '',
        secureURL: ''
    })


    const fetchCourseData = useCallback(async () => {
        if (typeof mainCourseId === 'string') {
            const mainCourse = await CourseAPI.fetchCourse(mainCourseId)
            if (mainCourse) {
                setImageAssets(mainCourse.imageAsset)
                dispatch(courseActions.setVideo(mainCourse))
            }
        }
    }, [mainCourseId])

    useEffect(() => {
        fetchCourseData()
    }, [mainCourseId])


    async function create() {
        const courseId = randomstring.generate(19)
        const newLecture: VideoCourse = {
            ...newVideo,
            _id: courseId,
            type: 'course',
            author: {
                authorId: user._id ?? '',
                public_id: '',
                name: ''
            },
            courseId: mainCourseId ?? '',
        }
        const newCourse = await CourseAPI.create(newLecture)

        if (newCourse) {
            console.log(newCourse)
            dispatch(courseActions.setCourses([...courses, newLecture]))
            dispatch(courseActions.setNewVideo(VideoCourseSchema))
            return newCourse 
        }
    }

    return (
        <Layout>
            <Container>
                <TestHeader>
                    <Typography
                        sx={(theme) => ({
                            fontSize: 18,
                            fontWeight: 600,
                            [theme.breakpoints.down("sm")]: {
                                fontSize: 15
                            }
                        })}>
                        Course Video
                    </Typography>
                </TestHeader>
                <FlexContainer>
                    <TestInfoCol>
                        <VideoCard video={course} videoIndex={0} />
                        <RenderLectures mainCourseId={course?.courseId ?? ''} activeId={course._id} isPurchased={true}  />
                    </TestInfoCol>
                    <TestFormContainer>
                        <UploadCourseForm mode={params[1]} submitHandler={create} />
                    </TestFormContainer>
                </FlexContainer>
            </Container>
        </Layout>
    )
}