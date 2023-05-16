import React, { useCallback, useEffect } from 'react'
import Layout from '../../components/layout'
import { Box, Typography, colors, styled } from '@mui/material'
import { CSS_PROPERTIES } from '../../reusable'
import { colorScheme } from '../../theme'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import CartItemCard from '../../components/cart-item'
import { deleteCartItemThunk } from '../../../reducers/cart-reducer/cart-thunks'
import { StyledButton } from '../../reusable/styles'
import { FormatMoney } from 'format-money-js'
import { Router, useRouter } from 'next/router'
import { fetchTutorThunk } from '../../../reducers/tutors-reducer/tutors-thunks'
import TutorItem from '../../components/tutor-item'
import FetchInquiryFeedback from '../api/inquiry-feedback/fetch-inquiry-feedback/[id]'
import { fetchInquiryFeedbackThunk } from '../../../reducers/inquiry-reducer/inquiry-thunks'
import { Task } from '../../models/task'
import Randomstring from 'randomstring'
import { createHiredTask } from '../../../reducers/task-reducer/task-thunks'

const Container = styled(Box)(({ theme }) => ({
    maxWidth: '60%',
    margin: '20px auto',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'start',
    justifyContent: 'space-between',
    [theme.breakpoints.down("sm")]: {
        maxWidth: '97%',
        margin: '10px auto',
    }
}))
const CheckoutHeader = styled(Box)(({ theme }) => ({
    flexBasis: '100%',
    height: 60,
    display: 'flex',
    alignItems: 'center',
    padding: '0 10px',
    marginBottom: 10,
    //backgroundColor: colorScheme(theme).secondaryColor,
    borderRadius: CSS_PROPERTIES.radius10,
    borderEndEndRadius: 0,
    borderBottomLeftRadius: 0,
    // boxShadow: `0 1px 3px 0 ${colorScheme(theme).chatBoarderColor}`,
    [theme.breakpoints.down("sm")]: {

    }
}))

const CheckoutInfoColumn = styled(Box)(({ theme }) => ({
    flexBasis: '45%',
    //padding: 10,
    minHeight: 260,
    borderRadius: CSS_PROPERTIES.radius10,
    backgroundColor: colorScheme(theme).secondaryColor,
    boxShadow: `0 1px 3px 0px ${theme.palette.mode === 'light' ? '#ddd' : 'transparent'}`,
    [theme.breakpoints.down("sm")]: {
        flexBasis: '100%',

    }
}))
const ReadyToPayColumn = styled(Box)(({ theme }) => ({
    flexBasis: '50%',
    padding: 10,
    minHeight: 260,
    borderRadius: CSS_PROPERTIES.radius10,
    backgroundColor: colorScheme(theme).secondaryColor,
    boxShadow: `0 1px 3px 0px ${theme.palette.mode === 'light' ? '#ddd' : 'transparent'}`,
    [theme.breakpoints.down("sm")]: {
        flexBasis: '100%',
        height: 'auto',
        margin: '10px 0',
    }
}))


const SummaryHeader = styled(Box)(({ theme }) => ({
    height: 60,
    display: 'flex',
    alignItems: 'center',
    padding: '0 20px'
}))
const ItemCount = styled(Box)(({ theme }) => ({
    height: 50,
    display: 'flex',
    alignItems: 'center',
    padding: '0 0px',
    margin: '0 20px',
    borderBottom: `1px solid ${theme.palette.mode === 'light' ? colorScheme(theme).borderColor : colorScheme(theme).primaryColor}`
}))
const SubTotal = styled(Box)(({ theme }) => ({
    height: 50,
    display: 'flex',
    alignItems: 'center',
    padding: '0 0px',
    margin: '0 20px',
    //borderBottom: `1px solid ${colorScheme(theme).borderColor}`
}))
const PayButtonContainer = styled(Box)(({ theme }) => ({
    minHeight: 50,
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    padding: '0 0px',
    margin: '20px ',
    //borderBottom: `1px solid ${colorScheme(theme).borderColor}`
}))

type Props = {}

export default function Checkout({ }: Props) {
    const dispatch = useAppDispatch()
    const cartItems = useAppSelector((state) => state.CartReducer.cartItems)
    const user = useAppSelector((state) => state.AuthReducer.user)
    const tutor = useAppSelector((state) => state.TutorsReducer.tutor)
    const inquiryFeedback = useAppSelector((state) => state.InquiryReducer.inquiryFeedback)
    const router = useRouter()
    const params = router.query.params || []

    const loadData = useCallback(() => {
        dispatch(fetchTutorThunk(params[0]))
        dispatch(fetchInquiryFeedbackThunk(params[2]))
    }, [params])

    useEffect(() => {
        loadData()
    }, [params])


    function hireTutor() {
        dispatch(createHiredTask())
    }


    const fm = new FormatMoney({
        decimals: 2
    })
    const subtotal: any = fm.from(parseFloat(inquiryFeedback.serviceTerms.price))



    return (
        <Layout>
            <Container>
                <CheckoutHeader>
                    <Typography
                        sx={(theme) => ({
                            fontSize: 25,
                            fontWeight: 600,
                            [theme.breakpoints.down("sm")]: {
                                fontSize: 22
                            }
                        })}>
                        Tutor Profile
                    </Typography>
                </CheckoutHeader>
                <CheckoutInfoColumn>
                    <TutorItem tutor={tutor} mode='read-only' />
                </CheckoutInfoColumn>
                <ReadyToPayColumn>
                    <SummaryHeader>
                        <Typography sx={{ fontSize: 22, fontWeight: 600 }}>
                            Service Summary
                        </Typography>
                    </SummaryHeader>

                    <ItemCount>
                        <Typography sx={{ flex: 1, fontSize: 15, fontWeight: 600 }}>
                            {inquiryFeedback.service.label}
                        </Typography>
                        <Typography sx={{ fontSize: 15, fontWeight: 500 }}>
                            Due Date: {inquiryFeedback.serviceTerms.dueDate}
                        </Typography>
                    </ItemCount>
                    <SubTotal>
                        <Typography sx={{ flex: 1, fontSize: 20, fontWeight: 600 }}>
                            Subtotal(<span style={{ fontSize: 17 }}>USD</span>)
                        </Typography>
                        <Typography sx={{ color: colors.teal[400], fontSize: 22, fontWeight: 600 }}>
                            {inquiryFeedback.serviceTerms.price}
                        </Typography>
                    </SubTotal>
                    <PayButtonContainer>
                        {!user?.studentInfo?.accountBalance ? (<>
                            <StyledButton sx={{ flex: 1, px: 2 }}
                                onClick={() => router.push('/student-account/recharge')}
                            >
                                Recharge your account
                            </StyledButton>
                            <Typography sx={{ flexBasis: '100%', mt: 1, lineHeight: 1.2, fontSize: 13, fontWeight: 500 }}>
                                This is your student account. Money in your student
                                account can be used to purchase schooyard products in a sercure way.
                            </Typography>
                        </>) : (
                            <StyledButton sx={{ flex: 1, px: 2 }}
                                onClick={hireTutor}
                            >
                                Hire Tutor
                            </StyledButton>
                        )}
                    </PayButtonContainer>
                </ReadyToPayColumn>
            </Container>
        </Layout>
    )
}