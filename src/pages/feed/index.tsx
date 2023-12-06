import React from 'react'
import Layout from '../../components/layout'
import { ThemedText, colorScheme } from '../../theme'
import { Box, styled, useTheme } from '@mui/material'
import { useRouter } from 'next/router'
import TopTabTabs from '../../components/top-tab-bar'
import PostItem from './post-item'
import { PostSchema } from '../../models/post'
import { useEffectOnce } from 'react-use'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { postActions } from '../../../reducers/post-reducer'
import { fetchPostsThunk } from '../../../reducers/post-reducer/post-thunks'


const Container = styled(Box)(({ theme }) => ({
    width: '30%',
    margin: '10px auto',
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        margin: '0 auto',
    }
}))

const PageTitle = styled(Box)(() => ({
    padding: '0 10px',
    marginBottom: 10,
}))
const MappedPosts = styled(Box)(() => ({
    marginTop: 18,
    display: 'grid',
    gap: 10,
    paddingBottom: 15

}))




const Text = styled(ThemedText)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        flexBasis: '100%',
    }
}))


type Props = {}

export default function Create({ }: Props) {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const _theme = useTheme()
    const isSidebarOpen = useAppSelector((state) => state.MainReducer.isSidebarOpen)
    const posts = useAppSelector((state) => state.PostReducer.posts)
    const [postType, secondParam]: any = router.query.params || []

    useEffectOnce(() => {
        dispatch(fetchPostsThunk())
    })


    return (
        <Layout>
            <Container sx={{ width: isSidebarOpen ? '30%' : '33%' }}>
                <PageTitle>
                    <Text sx={{ fontSize: 23, fontWeight: 600 }}>Feed</Text>
                </PageTitle>
                <Box sx={{ flexBasis: '100%', borderBottom: `0px solid ${colorScheme(_theme).borderColor}` }}>
                    <TopTabTabs />
                </Box>
                <MappedPosts>
                    {posts.map((post) => (
                        <PostItem key={post.postId} post={post} />
                    ))}
                </MappedPosts>
            </Container>
        </Layout>
    )
}