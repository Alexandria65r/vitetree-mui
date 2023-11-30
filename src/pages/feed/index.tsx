import React from 'react'
import Layout from '../../components/layout'
import { ThemedText, colorScheme } from '../../theme'
import { Box, styled, useTheme } from '@mui/material'
import { useRouter } from 'next/router'
import TopTabTabs from '../../components/top-tab-bar'
import PostItem from './post-item'

const Container = styled(Box)(({ theme }) => ({
    width: '35%',
    margin: '10px auto',
    [theme.breakpoints.down('sm')]: {
        width: '95%',
        margin: '0 auto',
    }
}))

const PageTitle = styled(Box)(() => ({
    padding: '0 10px',
    marginBottom: 10,
}))
const MappedPosts = styled(Box)(() => ({
    marginTop:18,
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
                <Box sx={{ flexBasis: '100%',borderBottom:`0px solid ${colorScheme(_theme).borderColor}` }}>
                    <TopTabTabs />
                </Box>
                <MappedPosts>
                    {[1, 2, 3, 4, 5, 6].map((post) => (
                        <PostItem key={post} />
                    ))}
                </MappedPosts>
            </Container>
        </Layout>
    )
}