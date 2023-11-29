import React from 'react'
import Layout from '../../components/layout'
import { ThemedText } from '../../theme'
import { Box, colors, styled, useTheme } from '@mui/material'
import { StyledBox, StyledButton } from '../../reusable/styles'
import { useRouter } from 'next/router'

const Container = styled(Box)(({ theme }) => ({
    width: '35%',
    margin: '10px auto',
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

export default function Create({ }: Props) {
    const router = useRouter()
    const _theme = useTheme()
    const [postType, secondParam]:any = router.query.params || []
    return (
        <Layout>
            <Container>
                <Text sx={{ fontSize: 23, fontWeight: 600 }}>Post Detail</Text>

                <Balance>
                    
                </Balance>
            </Container>
        </Layout>
    )
}