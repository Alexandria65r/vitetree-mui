import React, { useCallback, useEffect } from 'react'
import Layout from '../components/layout'
import { ThemedText } from '../theme'
import { Box, colors, styled, useTheme } from '@mui/material'
import { StyledBox, StyledButton } from '../reusable/styles'
import { fetchPageThunk } from '../../reducers/page-reducer/page-thunks'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { formatMoney } from '../reusable/helpers'

const Container = styled(Box)(({ theme }) => ({
    width: '60%',
    margin: '80px auto',
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        margin: '0 auto',
    }
}))
const Balance = styled(StyledBox)(({ theme }) => ({
    display: 'flex',
    minHeight: 120,
    marginTop: 30,
    padding: 20,
    [theme.breakpoints.down('sm')]: {
        boxShadow: 'none!important',
        marginTop: 30,
        flexWrap: 'wrap',
        backgroundColor: 'transparent'
    }
}))
const LeftColumn = styled(Box)(({ theme }) => ({
    flex: 1,
    [theme.breakpoints.down('sm')]: {
        display: 'flex',
        flexBasis: '100%',
        flexWrap: 'wrap',
        justifyContent: 'center',
    }
}))
const RightColumn = styled(Box)(({ theme }) => ({
    flexBasis: '15%',
    [theme.breakpoints.down('sm')]: {
        display: 'flex',
        justifyContent: 'center',
        flexBasis: '100%',
        marginTop: 20,
    }
}))
const Text = styled(ThemedText)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        flexBasis: '100%',
        textAlign: 'center'
    }
}))


type Props = {}

export default function Payouts({ }: Props) {
    const _theme = useTheme()
    const dispatch = useAppDispatch()
    const user = useAppSelector((state) => state.AuthReducer.user)
    const page = useAppSelector((state) => state.PageReducer.page)

    const loadPageData = useCallback(() => {
        dispatch(fetchPageThunk(user.pageInfo?.pageId ?? ''))

    }, [user,dispatch])

    useEffect(() => {
        loadPageData()
    }, [user])





    return (
        <Layout>
            <Container>
                <Text sx={{ fontSize: 23, fontWeight: 600 }}>Payouts</Text>

                <Balance>
                    <LeftColumn>
                        <Text sx={{ flexBasis: '100%', fontSize: 15, fontWeight: 500 }}>Balance</Text>
                        <Text sx={{ fontSize: 32, mt: 2, fontWeight: 600, color: colors.teal[500] }}>
                            K{formatMoney(page.earnings.balance)}
                        </Text>
                    </LeftColumn>
                    <RightColumn >
                        <StyledButton sx={{ fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap' }}>Add payout method</StyledButton>
                    </RightColumn>
                </Balance>
            </Container>
        </Layout>
    )
}