import React from 'react'
import Layout from '../../components/layout'
import { ThemedText } from '../../theme'
import { Box, styled, useTheme } from '@mui/material'
import { StyledBox } from '../../reusable/styles'
import { useRouter } from 'next/router'
import TopTabTabs from '../../components/top-tab-bar'

const Container = styled(Box)(({ theme }) => ({
    width: '35%',
    margin: '10px auto',
    [theme.breakpoints.down('sm')]: {
        width: '95%',
        margin: '0 auto',
    }
}))

const PageTitle = styled(Box)(({ theme }) => ({
    padding: '0 10px',
    marginBottom: 10,
}))

const Balance = styled(StyledBox)(({ theme }) => ({
    display: 'flex',
    minHeight: 120,
    marginTop: 30,
    padding: 20,
    [theme.breakpoints.down('sm')]: {
        marginTop: 30,
        flexWrap: 'wrap',
    }
}))

const Text = styled(ThemedText)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        flexBasis: '100%',
    }
}))


type Props = {}

export default function Create({ }: Props) {
    const router = useRouter()
    const _theme = useTheme()
    const [postType, secondParam]: any = router.query.params || []
    return (
        <Layout>
            <Container>
                <PageTitle>
                    <Text sx={{ fontSize: 23, fontWeight: 600 }}>Feed</Text>
                </PageTitle>
                <Box sx={{ flexBasis: '100%' }}>
                    <TopTabTabs />
                </Box>
                <Balance>

                </Balance>
            </Container>
        </Layout>
    )
}