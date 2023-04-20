import { Box, styled } from '@mui/material'
import React from 'react'
import { VideoCourse } from '../../reusable/interfaces'
import CourseCard from '../course/course-card'



const Container = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(3,1fr)',
    gap: 15,
    marginTop: 20,
    [theme.breakpoints.down('sm')]: {
        marginTop: 0,
        padding: 5,
        gap: 10,
        gridTemplateColumns: '1fr',
    },
}))



type Props = {
    courses: VideoCourse[]
}

export default function RenderCourses({ courses }: Props) {
    return (
        <Container>
            {courses.map((course, index) => (
                <CourseCard key={index} course={course} />
            ))}
        </Container>
    )
}