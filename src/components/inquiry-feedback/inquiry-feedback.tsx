import React, { useCallback, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { inquiryActions } from '../../../reducers/inquiry-reducer'
import FetchInquiryFeedback from '../../pages/api/inquiry-feedback/fetch-inquiry-feedback/[id]'
import { useRouter } from 'next/router'
import { fetchInquiryFeedbackThunk } from '../../../reducers/inquiry-reducer/inquiry-thunks'
import { Box, Typography, styled } from '@mui/material'
import InquiredItem from '../../pages/tutors/inquiredItem'
import { StyledButton, StyledButtonOutlined } from '../../reusable/styles'
import ResponseCard from './response-card'

const Container = styled(Box)(({ theme }) => ({
    width: '100%'
}))

const ItemFooter = styled(Box)(() => ({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
}))

type Props = {}

export default function InquiryFeedback({ }: Props) {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const params: any = router.query.params || []
    const inquiryFeedback = useAppSelector((state) => state.InquiryReducer.inquiryFeedback)
    const loadFeedback = useCallback(() => dispatch(fetchInquiryFeedbackThunk(params[1])), [params])

    useEffect(() => {
        loadFeedback()
    }, [params])


    return (
        <Container>
            <Box sx={{ p: 1.3, borderBottom: 1, borderColor: 'divider' }}>
                <Typography>
                    {inquiryFeedback.description}
                </Typography>

                <ItemFooter>
                    <ResponseCard
                        title="Cancel Hiring"
                        btValue='Cancel'
                        clickHandler={() => { }}
                        description="You need to give a reason why you cancel
                         otherwise you won't be able to inquire again from this tutor."
                    />
                    <ResponseCard
                        title="Hire Tutor"
                        btValue='Purchase Service'
                        clickHandler={() => { }}
                        description="Hire tutor by purchasing the service, dont 
                        worry your money is protected and only to give to the tutor when you're satisfied"
                    />
                </ItemFooter>

            </Box>
            <InquiredItem inquiryId={inquiryFeedback.inquiryId} />
        </Container>
    )
}