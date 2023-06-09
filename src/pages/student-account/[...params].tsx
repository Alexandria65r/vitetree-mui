import React, { useCallback, useEffect, useState } from 'react'
import Layout from '../../components/layout'
import { Box, TextField, Typography, colors, styled } from '@mui/material'
import { CSS_PROPERTIES } from '../../reusable'
import { colorScheme } from '../../theme'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { FormatMoney } from 'format-money-js'
import CreditCardForm from '../../components/payments/credit-card-form'
import { AppSpinner } from '../../components/activity-indicators'
import { StyledButton } from '../../reusable/styles'
import CardItem from '../../components/account/card-item'
import { RiBankCard2Line } from 'react-icons/ri'
import { fetchActiveCardThunk, topupAccountThunk } from '../../../reducers/auth-reducer/auth-thunks'

const Container = styled(Box)(({ theme }) => ({
    maxWidth: '70%',
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
    flexBasis: '50%',
    padding: 10,
    minHeight: 260,
    borderRadius: CSS_PROPERTIES.radius10,
    backgroundColor: colorScheme(theme).secondaryColor,
    boxShadow: `0 1px 3px 0px ${theme.palette.mode === 'light' ? '#ddd' : 'transparent'}`,
    [theme.breakpoints.down("sm")]: {
        order: 2,
        flexBasis: '100%',

    }
}))
const ReadyToPayColumn = styled(Box)(({ theme }) => ({
    flexBasis: '45%',
    padding: 10,
    minHeight: 160,
    borderRadius: CSS_PROPERTIES.radius10,
    backgroundColor: colorScheme(theme).secondaryColor,
    boxShadow: `0 1px 3px 0px ${theme.palette.mode === 'light' ? '#ddd' : 'transparent'}`,
    [theme.breakpoints.down("sm")]: {
        order: 1,
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
const PayButtonContainer = styled(Box)(({ theme }) => ({
    height: 50,
    display: 'flex',
    alignItems: 'center',
    padding: '0 0px',
    margin: '20px ',
    //borderBottom: `1px solid ${colorScheme(theme).borderColor}`
}))


const Label = styled('label')(() => ({
    flexBasis: '100%',
    fontSize: 14
}))

const TextInput = styled(TextField)(() => ({
    marginTop: 5
}))
const FormContainer = styled(Box)(() => ({
    width: '100%',
    padding: 10,
}))

const FormControl = styled(Box)(() => ({
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '20px 0'
}))

type Props = {}

export default function Checkout({ }: Props) {
    const dispatch = useAppDispatch()
    const user = useAppSelector((state) => state.AuthReducer.user)
    const cartItems = useAppSelector((state) => state.CartReducer.cartItems)
    const [amount, setAmount] = useState<string>("0")
    const isErr = useAppSelector((state) => state.AuthReducer.isError)
    const card = useAppSelector((state) => state.AuthReducer.card)
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
                        Topup Account
                    </Typography>
                </CheckoutHeader>
                <CheckoutInfoColumn>
                    <Box>
                        <Typography
                            sx={(theme) => ({
                                mb: 1,
                                fontSize: 20,
                                fontWeight: 600,
                                [theme.breakpoints.down("sm")]: {
                                    fontSize: 18
                                }
                            })}>
                            Active Card
                        </Typography>
                        <CardItem card={card} StartIcon={RiBankCard2Line} showEndIcon={false} />
                    </Box>
                    <FormControl>
                        {/* <Label sx={{ flexBasis: '100%', }}>Card number</Label> */}
                        <Typography
                            sx={(theme) => ({
                                my: 1,
                                fontSize: 20,
                                fontWeight: 600,
                                [theme.breakpoints.down("sm")]: {
                                    fontSize: 18
                                }
                            })}>
                            Enter topup amount
                        </Typography>
                        <TextInput sx={{ flexBasis: '100%' }}
                            error={isErr && amount === "0"
                            }
                            value={amount}
                            onChange={({ target }: any) => setAmount(target.value)}
                            name="cardNumber"
                            label='Card number'
                            placeholder='1234 1234 1234 1234' />
                    </FormControl>

                    <FormControl onClick={() => { }} sx={{ justifyContent: 'flex-end' }}>
                        <StyledButton
                            onClick={() => dispatch(topupAccountThunk(amount))}
                            sx={{ px: 2 }}>
                            Continue <AppSpinner size={20} visible={authNetworkStatus === 'topup-account'} />
                        </StyledButton>
                    </FormControl>
                </CheckoutInfoColumn>
                <ReadyToPayColumn>
                    <SummaryHeader>
                        <Typography sx={{ fontSize: 20, fontWeight: 600 }}>
                            Your Balance
                        </Typography>
                    </SummaryHeader>

                    <SubTotal>
                        <Typography sx={{ flex: 1, fontSize: 20, fontWeight: 600 }}>
                            Amount(<span style={{ fontSize: 17 }}>USD</span>)
                        </Typography>
                        <Typography sx={{ color: colors.teal[400], fontSize: 26, fontWeight: 600 }}>
                            ${user?.accountBalance}
                        </Typography>
                    </SubTotal>
                </ReadyToPayColumn>
            </Container>
        </Layout>
    )
}