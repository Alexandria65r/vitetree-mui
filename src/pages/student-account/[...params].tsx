import React from 'react'
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

type Props = {}

export default function Checkout({ }: Props) {
    const dispatch = useAppDispatch()
    const user = useAppSelector((state) => state.AuthReducer.user)
    const cartItems = useAppSelector((state) => state.CartReducer.cartItems)

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
                        Recharge Account
                    </Typography>
                </CheckoutHeader>
                <CheckoutInfoColumn>
                    <CreditCardForm />
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
                            ${user?.studentInfo?.accountBalance}
                        </Typography>
                    </SubTotal>
                </ReadyToPayColumn>
            </Container>
        </Layout>
    )
}