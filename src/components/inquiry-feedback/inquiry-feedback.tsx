import React, { useCallback, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { inquiryActions } from '../../../reducers/inquiry-reducer'
import FetchInquiryFeedback from '../../pages/api/inquiry-feedback/fetch-inquiry-feedback/[id]'
import { useRouter } from 'next/router'
import { fetchInquiryFeedbackThunk } from '../../../reducers/inquiry-reducer/inquiry-thunks'
import { Box, Typography, styled } from '@mui/material'
import InquiredItem from '../../pages/tutors/inquiredItem'
import { StyledButton, StyledButtonOutlined } from '../../reusable/styles'
import ResponseCard from './response-card'
import { colorScheme } from '../../theme'
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';


const Container = styled(Box)(({ theme }) => ({
    width: '100%'
}))
const ThreadContainer = styled(Box)(({ theme }) => ({
    position: 'relative',
    padding: '0 10px 35px 10px',
    borderBottom: '1px solid',
    borderColor: theme.palette.mode === 'light' ? '#ddd' : colorScheme(theme).secondaryColor,
    [theme.breakpoints.down('sm')]: {
        padding: '0 10px 25px 10px',
        marginBottom:25
    }
}))

const ItemFooter = styled(Box)(() => ({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
}))
const ShowInquiredThread = styled(StyledButtonOutlined)(({ theme }) => ({
    position: 'absolute',
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : colorScheme(theme).secondaryColor,
    fontSize: 13,
    height: 30,
    left: '50%',
    bottom: -15,
    transform: 'translate(-50%)',
    color: colorScheme(theme).TextColor,
    border: `1px solid ${colorScheme(theme).borderColor}`,
    '&:hover': {
        color: colorScheme(theme).TextColor,
        backgroundColor: theme.palette.mode === 'light' ? '#fff' : colorScheme(theme).secondaryColor,
    },
    [theme.breakpoints.down('sm')]: {
        width: '60%'
    }

}))

type Props = {}

export default function InquiryFeedback({ }: Props) {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const params: any = router.query.params || []
    const inquiryFeedback = useAppSelector((state) => state.InquiryReducer.inquiryFeedback)
    const loadFeedback = useCallback(() => dispatch(fetchInquiryFeedbackThunk(params[1])), [params])
    const [showInquired, toggleInquired] = useState<boolean>(false)

    useEffect(() => {
        loadFeedback()
    }, [params])


    function handleResponseCard(target: 'hire' | 'cancel') {

    }


    return (
        <Container>
            <ThreadContainer>
                <Typography sx={{ lineHeight: 1.3 }}>
                    {inquiryFeedback.description}
                </Typography>
                <Typography sx={{ mt: 1, lineHeight: 1.3, fontSize: 14, fontWeight: 600 }}>
                    Take Action
                </Typography>

                <ItemFooter>
                    <ResponseCard
                        title="Hire Tutor"
                        btValue='Hire Tutor'
                        clickHandler={() => { }}
                        description="This tutor is ready to start working immediately, procceed and hire
                         the tutor."
                    />
                    <ResponseCard
                        title="Cancel Hiring"
                        btValue='Cancel'
                        clickHandler={() => { }}
                        description="You need to give a reason why you cancel
                         otherwise you won't be able to inquire again from this tutor."
                    />
                </ItemFooter>

                <ShowInquiredThread onClick={() => toggleInquired(!showInquired)}>
                    {showInquired ? 'Show' : 'Hide'} inquiry {!showInquired ? <KeyboardArrowUpOutlinedIcon /> : <ExpandMoreOutlinedIcon />}
                </ShowInquiredThread>
            </ThreadContainer>

            {!showInquired && (
                <Box sx={{ mt: 2.5 }}>
                    <InquiredItem inquiryId={inquiryFeedback.inquiryId} />
                </Box>
            )}

        </Container>
    )
}