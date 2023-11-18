import React from 'react'
import { useAppSelector } from '../../../store/hooks'
import VideoCard from '../../components/course/video-card'
import { Box, styled } from '@mui/material'
import { ThemedText } from '../../theme'
const Container = styled(Box)(() => ({

}))
const Header = styled(Box)(() => ({
    marginBottom:10
}))

type Props = {}

export default function RenderLectures({ }: Props) {
    const course = useAppSelector((state) => state.CourseReducer.video)
    return (
        <Container>
            <Header>
                <ThemedText sx={{ m: 0, lineHeight: 1.2, fontSize: 18, fontWeight: 600 }}>
                    Courses Lectures (10)
                </ThemedText>
            </Header>
            <VideoCard video={course} isGrid={true} videoIndex={0} />
        </Container>
    )
}


