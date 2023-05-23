import React, { useCallback, useEffect } from 'react'
import { Box, Skeleton, Typography, styled } from '@mui/material'
import { StyledBox, StyledButton, StyledButtonOutlined, Textarea } from '../../reusable/styles'
import TutorItem from '../tutor-item'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { bidsActions } from '../../../reducers/bids-reducer'
import { createBidThunk, fetchBid } from '../../../reducers/bids-reducer/bid-thunks'
import { AppSpinner } from '../activity-indicators'
import ForumItem from './post-item'
import { useRouter } from 'next/router'
import { bidModel } from '../../models/bid'
import { forumActions } from '../../../reducers/forum-reducer'
import { PostSchema } from '../../reusable/schemas'

const Container = styled(Box)(({ theme }) => ({
    width: '80%',
    margin: '30px auto',
    display: 'flex',
    flexWrap: 'wrap',
    [theme.breakpoints.down("sm")]: {
        width: '97%',
        margin: '10px auto',
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

export default function ViewBid({ }: Props) {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const post = useAppSelector((state) => state.ForumReducer.post)
    const tutor = useAppSelector((state) => state.AuthReducer.user)
    const bid = useAppSelector((state) => state.bidsReducer.bid)
    const bidsNetworkStatus = useAppSelector((state) => state.bidsReducer.bidsNetworkStatus)

    const params = router.query.params || []
    const bidId = params[4]



    function handleOnChange({ target: { name, value } }: any) {
        dispatch(bidsActions.setBidProps({
            name,
            value
        }))
    }

    const loadBid = useCallback(() => {
        dispatch(fetchBid(bidId ?? ''))
    }, [bidId])

    useEffect(() => {
        loadBid()

        return () => {
            dispatch(forumActions.setPost(PostSchema))
            dispatch(bidsActions.setBid(bidModel))
        }
    }, [bidId])

    return (
        <Container>
            {/* <Box sx={{ flexBasis: '100%' }}>
                <ForumItem post={post} />
            </Box> */}
            <TutorColumn>
                <Typography sx={{ mb: 1, fontSize: 18, fontWeight: 600 }}>
                    Tutor Profile
                </Typography>
                <TutorItem tutor={tutor} mode='read-only' />
            </TutorColumn>
            <BidColumn>
                <Typography sx={{ mt: 1, fontSize: 16, fontWeight: 500 }}>
                    Bid Overview
                </Typography>
                <StyledBox sx={{ my: 1, width: '100%', minHeight: 60 }}>
                </StyledBox>
                <StyledBox>
                    <Typography sx={{ my: .5, fontWeight: 500 }}>Cover later</Typography>
                    {bid.coverLater ?
                        <Typography sx={{color:'GrayText' }}>{bid.coverLater} </Typography> :
                        (<>
                            <Skeleton />
                            <Skeleton />
                            <Skeleton width={300} />
                        </>)}
                </StyledBox>

                <Box sx={{ display: 'flex', mt: 1, justifyContent: 'space-between' }}>
                    <StyledButtonOutlined sx={{ flexBasis: '49%' }}>Shortlist</StyledButtonOutlined>
                    <StyledButton
                        onClick={() => router.push(`/complete-hiring-process/${bid.author.id}/postid/${bid.postId}`)}
                        sx={{ flexBasis: '49%' }}>
                        Hire <AppSpinner visible={bidsNetworkStatus === 'create-bid'} size={25} />
                    </StyledButton>
                </Box>

            </BidColumn>
        </Container>
    )
}