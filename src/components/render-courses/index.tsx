import { Box, styled } from '@mui/material'
import React from 'react'
import { VideoCourse } from '../../reusable/interfaces'
import CourseCard from '../course/course-card'
import VideoCard from '../course/video-card'
import { useAppSelector } from '../../../store/hooks'



const Container = styled(Box)(({ theme }) => ({
    display: 'grid',
  //  width:'80%',
    margin:'20px auto',
    gridTemplateColumns: 'repeat(3,1fr)',
    gap: 15,
    [theme.breakpoints.down('sm')]: {
        padding:'5px 12px',
        marginTop: 0,
        gap: 10,
        gridTemplateColumns: '1fr',
    },

}))



type Props = {
    courses: VideoCourse[]
}

export default function RenderCourses({ courses }: Props) {
    const isSidebarOpen = useAppSelector((state) => state.MainReducer.isSidebarOpen)
    return (
        <Container sx={(theme) => ({
            [theme.breakpoints.up('xl')]: {
                gridTemplateColumns: isSidebarOpen ? 'repeat(5,1fr)' : 'repeat(4,1fr)'
            }
        })}>
            {courses.map((course, index) => (
                <VideoCard key={index} video={course} videoIndex={index} />
            ))}
        </Container>
    )
}