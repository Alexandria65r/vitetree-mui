import React from 'react'
import Layout from '../../components/layout'
import { Box, Typography, styled } from '@mui/material'
import { CSS_PROPERTIES } from '../../reusable'
import { colorScheme } from '../../theme'


const Container = styled(Box)(({ theme }) => ({
    maxWidth: '90%',
    margin: '20px auto',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
}))
const CheckoutHeader = styled(Box)(({ theme }) => ({
    flexBasis: '100%',
    minHeight: 60,
    display: 'flex',
    alignItems: 'center',
    padding: '0 10px',
    marginBottom: 10,
    //backgroundColor: colorScheme(theme).secondaryColor,
    borderRadius: CSS_PROPERTIES.radius5,
    borderEndEndRadius: 0,
    borderBottomLeftRadius: 0,
    // boxShadow: `0 1px 3px 0 ${colorScheme(theme).chatBoarderColor}`
}))

const CheckoutInfoColumn = styled(Box)(({ theme }) => ({
    flexBasis: '50%',
    padding: 10,
    height: 460,
    borderRadius: CSS_PROPERTIES.radius5,
    backgroundColor: colorScheme(theme).secondaryColor,
    boxShadow: `0 1px 3px 0px ${theme.palette.mode === 'light' ? '#ddd' : 'transparent'}`
}))
const ReadyToPayColumn = styled(Box)(({ theme }) => ({
    flexBasis: '45%',
    padding: 10,
    height: 460,
    borderRadius: CSS_PROPERTIES.radius5,
    backgroundColor: colorScheme(theme).secondaryColor,
    boxShadow: `0 1px 3px 0px ${theme.palette.mode === 'light' ? '#ddd' : 'transparent'}`
}))

type Props = {}

export default function Checkout({ }: Props) {
    return (
        <Layout>
            <Container>
                <CheckoutHeader>
                    <Typography
                        sx={(theme) => ({
                            fontSize: 22,
                            fontWeight: 600,
                            [theme.breakpoints.down("sm")]: {
                                fontSize: 18
                            }
                        })}>
                        Course Checkout
                    </Typography>
                </CheckoutHeader>
                <CheckoutInfoColumn>info</CheckoutInfoColumn>
                <ReadyToPayColumn>ready to pay</ReadyToPayColumn>
            </Container>
        </Layout>
    )
}