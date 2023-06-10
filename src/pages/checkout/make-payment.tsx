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
import CreditCardForm from '../../components/payments/credit-card-form'
import { RiBankCard2Line } from 'react-icons/ri'
import CardItem from '../../components/account/card-item'
import { chargeThunk, fetchActiveCardThunk, purchaseCourseThunk } from '../../../reducers/auth-reducer/auth-thunks'
import { useRouter } from 'next/router'
import { AppSpinner } from '../../components/activity-indicators'

const Container = styled(Box)(({ theme }) => ({
    maxWidth: '90%',
    margin: '20px auto',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'start',
    justifyContent: 'space-between',
    [theme.breakpoints.down("sm")]: {
        maxWidth: '100%',
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
    borderRadius: CSS_PROPERTIES.radius5,
    borderEndEndRadius: 0,
    borderBottomLeftRadius: 0,
    // boxShadow: `0 1px 3px 0 ${colorScheme(theme).chatBoarderColor}`,
    [theme.breakpoints.down("sm")]: {

    }
}))

const CheckoutInfoColumn = styled(Box)(({ theme }) => ({
    flexBasis: '50%',
    padding: 15,
    minHeight: 200,
    borderRadius: CSS_PROPERTIES.radius5,
    backgroundColor: colorScheme(theme).secondaryColor,
    boxShadow: `0 1px 3px 0px ${theme.palette.mode === 'light' ? '#ddd' : 'transparent'}`,
    [theme.breakpoints.down("sm")]: {
        flexBasis: '100%',

    }
}))
const ReadyToPayColumn = styled(Box)(({ theme }) => ({
    flexBasis: '45%',
    padding: 10,
    minHeight: 260,
    borderRadius: CSS_PROPERTIES.radius5,
    backgroundColor: colorScheme(theme).secondaryColor,
    boxShadow: `0 1px 3px 0px ${theme.palette.mode === 'light' ? '#ddd' : 'transparent'}`,
    [theme.breakpoints.down("sm")]: {
        flexBasis: '100%',
        height: 260,
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
    borderBottom: `1px solid ${colorScheme(theme).borderColor}`
}))
const SubTotal = styled(Box)(({ theme }) => ({
    height: 50,
    display: 'flex',
    alignItems: 'center',
    padding: '0 0px',
    margin: '0 20px',
    //borderBottom: `1px solid ${colorScheme(theme).borderColor}`
}))
const Balance = styled(Box)(({ theme }) => ({
    height: 50,
    display: 'flex',
    alignItems: 'center',
    padding: '0 0px',
    margin: '0 0px',
    borderBottom: `1px solid ${colorScheme(theme).borderColor}`
}))
const PayButtonContainer = styled(Box)(({ theme }) => ({
    height: 50,
    display: 'flex',
    alignItems: 'center',
    padding: '0 0px',
    margin: '20px ',
    //borderBottom: `1px solid ${colorScheme(theme).borderColor}`
}))

type Props = {}

export default function Checkout({ }: Props) {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const cartItems = useAppSelector((state) => state.CartReducer.cartItems)
    const card = useAppSelector((state) => state.AuthReducer.card)
    const user = useAppSelector((state) => state.AuthReducer.user)
    const authNetworkStatus = useAppSelector((state) => state.AuthReducer.authNetworkStatus)



    const loadActiveCard = useCallback(() => dispatch(fetchActiveCardThunk()), [user])
    useEffect(() => {
        loadActiveCard()
    }, [dispatch, user])


    function getSubtotal() {
        return cartItems.reduce((s, item) => {
            const price = parseFloat(item.price)
            return s + price
        }, 0)
    }
    const fm = new FormatMoney({
        decimals: 2
    })
    const subtotal: any = fm.from(getSubtotal())



    function handlePay() {
        dispatch(purchaseCourseThunk({
            balance: parseInt(user.accountBalance ?? ''),
            subTotal: getSubtotal()
        }))
    }

    return (
        <Layout>
            <Container>
                <CheckoutHeader>
                    <Typography
                        sx={(theme) => ({
                            fontSize: 27,
                            fontWeight: 600,
                            [theme.breakpoints.down("sm")]: {
                                fontSize: 18
                            }
                        })}>
                        Your account balance
                    </Typography>
                </CheckoutHeader>
                <CheckoutInfoColumn>
                    <Box>
                        <Balance>
                            <Typography sx={{ flex: 1, fontSize: 20, fontWeight: 600 }}>
                                Balance(<span style={{ fontSize: 17 }}>USD</span>)
                            </Typography>
                            <Typography sx={{ color: colors.teal[400], fontSize: 22, fontWeight: 600 }}>
                                ${user.accountBalance}
                            </Typography>
                        </Balance>
                        <Typography
                            sx={(theme) => ({
                                my:1,
                                fontSize: 16,
                                fontWeight: 600,
                                [theme.breakpoints.down("sm")]: {
                                    fontSize: 18
                                }
                            })}>
                            Active Card
                        </Typography>
                        <CardItem card={card} StartIcon={RiBankCard2Line} showEndIcon={false} />
                    </Box>

                </CheckoutInfoColumn>
                <ReadyToPayColumn>
                    <SummaryHeader>
                        <Typography sx={{ fontSize: 22, fontWeight: 600 }}>
                            Order Summary
                        </Typography>
                    </SummaryHeader>

                    <ItemCount>
                        <Typography>
                            {cartItems.length} Items
                        </Typography>
                    </ItemCount>
                    <SubTotal>
                        <Typography sx={{ flex: 1, fontSize: 20, fontWeight: 600 }}>
                            Subtotal(<span style={{ fontSize: 17 }}>USD</span>)
                        </Typography>
                        <Typography sx={{ color: colors.teal[400], fontSize: 22, fontWeight: 600 }}>
                            ${subtotal}
                        </Typography>
                    </SubTotal>
                    <PayButtonContainer>
                        <StyledButton
                            onClick={handlePay}
                            sx={{ flex: 1, px: 2 }}>
                            Procceed to pay <AppSpinner visible={authNetworkStatus === 'deduct-account'} />
                        </StyledButton>
                    </PayButtonContainer>
                </ReadyToPayColumn>
            </Container>
        </Layout>
    )
}