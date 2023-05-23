import { Box, Typography, styled } from '@mui/material'
import React from 'react'
import { StyledBox, Textarea } from '../../reusable/styles'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import ForumItem from './post-item'
import SlateEditor from '../editor/SlateEditor'
import { Descendant } from 'slate'
import { createAcademicAnswerThunk } from '../../../reducers/academic-answers-reducer/academic-answers-thunks'
import PostAcademicAnswerItem from './post-academic-answer-item'

const Container = styled(Box)(({ theme }) => ({
    width: '90%',
    margin: '20px auto',
    //display: 'flex',
    [theme.breakpoints.down("sm")]: {
        width: '97%',
        display: 'block'
    }
}))
const TutorColumn = styled(Box)(({ theme }) => ({
    //flexBasis: '50%',

}))
const BidColumn = styled(Box)(({ theme }) => ({
    flex: 1,
    marginLeft: 20,
    [theme.breakpoints.down("sm")]: {
        marginLeft: 0,
    }
}))


type Props = {}

export default function AnswerQuesttion({ }: Props) {
    const dispatch = useAppDispatch()
    const post = useAppSelector((state) => state.ForumReducer.post)


    function createAnswer(data: Descendant[]) {
        dispatch(createAcademicAnswerThunk(data))
    }
    return (
        <Container>
            <TutorColumn>
                <ForumItem post={post} />
                <Typography sx={{ my: .8, fontWeight: 600 }}>Answers</Typography>
                 {/* <SlateEditor onValueUpdate={createAnswer} onCancel={()=>{}} />   */}
                <PostAcademicAnswerItem />
            </TutorColumn>


            {/* <BidColumn>
                <Typography sx={{ fontWeight: 600 }}>Asnwers</Typography>

                <StyledBox sx={{ mt: 1, width: '100%', minHeight: 120 }}>

                </StyledBox>
                <StyledBox sx={{ mt: 1, width: '100%', minHeight: 120 }}>

                </StyledBox>

            </BidColumn> */}
        </Container>
    )
}