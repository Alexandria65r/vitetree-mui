import { Box, Typography, styled } from '@mui/material'
import React from 'react'
import { StyledBox, StyledButton, StyledButtonOutlined, Textarea } from '../../reusable/styles'
import TutorItem from '../tutor-item'
import { useAppSelector } from '../../../store/hooks'

const Container = styled(Box)(({ theme }) => ({
    width: '80%',
    margin: '30px auto',
    display: 'flex',
    [theme.breakpoints.down("sm")]: {
        width: '97%',
        margin: '30px auto',
        display: 'block'
    }
}))
const TutorColumn = styled(Box)(({ theme }) => ({
    flexBasis: '45%',

}))
const BidColumn = styled(Box)(({ theme }) => ({
    flex: 1,
    marginLeft: 20,
    [theme.breakpoints.down("sm")]: {
        marginLeft: 0,
    }
}))


type Props = {}

export default function SendeBid({ }: Props) {
    const tutor = useAppSelector((state) => state.AuthReducer.user)
    return (
        <Container>
            <TutorColumn>
                <Typography sx={{ mb: 1, fontSize: 20, fontWeight: 600 }}>
                    Your Tutor Profile
                </Typography>
                <TutorItem tutor={tutor} mode='read-only' />
                <StyledBox sx={{ mt: 1, width: '100%' }}>

                    <Typography sx={{ my: .5, fontSize: 13, fontWeight: 500 }}>
                        Your tutor profile will be shared to the owner of the post.
                    </Typography>
                </StyledBox>
            </TutorColumn>
            <BidColumn>

                <StyledBox sx={{ my: 1, width: '100%', minHeight: 160 }}>

                </StyledBox>
                <Typography sx={{ my: .5, fontWeight: 600 }}>Cover Later</Typography>
                <Textarea
                    sx={{ width: '100%' }}
                    minRows={8}
                    placeholder='Write your later...'
                />
                <Box sx={{ display: 'flex', mt: 1, justifyContent: 'space-between' }}>
                    <StyledButtonOutlined sx={{ flexBasis: '49%' }}>Cancel</StyledButtonOutlined>
                    <StyledButton sx={{ flexBasis: '49%' }}>Submit</StyledButton>
                </Box>

            </BidColumn>
        </Container>
    )
}