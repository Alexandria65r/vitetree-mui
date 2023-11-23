import React, { useCallback, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import VideoCard from '../../components/course/video-card'
import { Box, styled } from '@mui/material'
import { ThemedText, colorScheme } from '../../theme'
import { courseActions } from '../../../reducers/course-reducer'
import CourseAPI from '../../api-services/course'
const Container = styled(Box)(() => ({

}))
const Header = styled(Box)(({ theme }) => ({
    marginBottom: 10,
    padding: 10,
    border: `1px solid ${colorScheme(theme).grayToSecondaryColor}`
}))

type Props = {
    mainCourseId: string
    activeId: string
    isPurchased: boolean
}

export default function RenderLectures({ mainCourseId, activeId, isPurchased }: Props) {
    const dispatch = useAppDispatch()
    const courses = useAppSelector((state) => state.CourseReducer.courses)

    const fetchCourseData = useCallback(async () => {
        if (mainCourseId) {
            const lectures = await CourseAPI.fetchCourseLectures(mainCourseId)
            if (lectures) {
                dispatch(courseActions.setCourses(lectures))
            }
        }

    }, [mainCourseId])

    useEffect(() => {
        fetchCourseData()
    }, [mainCourseId])




    const filtered = courses.filter((course) => course._id !== activeId)

    return (
        <Container>
            <Header>
                <ThemedText sx={{ m: 0, lineHeight: 1.2, fontSize: 18, fontWeight: 600 }}>
                    Courses Lectures ({courses?.length ? courses?.length - 1 : 0})
                </ThemedText>
            </Header>
            {filtered.map((lecture, index) => (
                <VideoCard key={lecture._id} video={lecture} isGrid={true} videoIndex={index} isPurchased={isPurchased} />
            ))}
        </Container>
    )
}


