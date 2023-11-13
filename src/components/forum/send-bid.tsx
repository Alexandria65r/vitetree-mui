import { Box, Typography, styled } from '@mui/material'
import React from 'react'
import { StyledBox, StyledButton, StyledButtonOutlined, Textarea } from '../../reusable/styles'
import TutorItem from '../tutor-item'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { bidsActions } from '../../../reducers/bids-reducer'
import { createBidThunk } from '../../../reducers/bids-reducer/bid-thunks'
import { AppSpinner } from '../activity-indicators'
import ForumItem from './post-item'

const Container = styled(Box)(({ theme }) => ({
    width: '80%',
    margin: '30px auto',
    display: 'flex',
    flexWrap:'wrap',
    [theme.breakpoints.down("sm")]: {
        width: '97%',
        margin: '30px auto',
        display: 'block'
    },
    // [theme.breakpoints.up("xl")]: {
    //     width: '67%',
       
    // }
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
    const dispatch = useAppDispatch()
    const post = useAppSelector((state) => state.ForumReducer.post)
    const tutor = useAppSelector((state) => state.AuthReducer.user)
    const bid = useAppSelector((state) => state.bidsReducer.bid)
    const bidsNetworkStatus = useAppSelector((state) => state.bidsReducer.bidsNetworkStatus)

    function handleOnChange({ target: { name, value } }: any) {
        dispatch(bidsActions.setBidProps({
            name,
            value
        }))
    }


    function handleSubmit() {
        dispatch(createBidThunk())
    }
    return (
        <Container>
            <Box sx={{flexBasis:'100%'}}>
                <ForumItem post={post} />
            </Box>
            <TutorColumn>
                <Typography sx={{ mb: 1, fontSize: 16, fontWeight: 500 }}>
                    Your Profile
                </Typography>
                <TutorItem tutor={tutor} mode='read-only' />
                <StyledBox sx={{ mt: 1, width: '100%' }}>

                    <Typography sx={{ my: .5, fontSize: 13, fontWeight: 500 }}>
                        Your tutor profile will be shared to the owner of the post.
                    </Typography>
                </StyledBox>
            </TutorColumn>
            <BidColumn>
                <Typography sx={{ mb: 1, fontSize: 16, fontWeight: 500 }}>
                   Bid Overview
                </Typography>
                <StyledBox sx={{ my: 1, width: '100%', minHeight: 60 }}>
                </StyledBox>
                <Typography sx={{ my: .5, fontWeight: 600 }}>Cover Later</Typography>
                <Textarea
                    onChange={handleOnChange}
                    name='coverLater'
                    value={bid.coverLater}
                    sx={{ width: '100%' }}
                    minRows={8}
                    placeholder='Write your later...'
                />
                <Box sx={{ display: 'flex', mt: 1, justifyContent: 'space-between' }}>
                    <StyledButtonOutlined sx={{ flexBasis: '49%' }}>Cancel</StyledButtonOutlined>
                    <StyledButton onClick={handleSubmit} sx={{ flexBasis: '49%' }}>
                        Submit <AppSpinner visible={bidsNetworkStatus === 'create-bid'} size={25} />
                    </StyledButton>
                </Box>

            </BidColumn>
        </Container>
    )
}