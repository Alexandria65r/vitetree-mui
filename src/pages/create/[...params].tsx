import React from 'react'
import Layout from '../../components/layout'
import { ThemedText } from '../../theme'
import { Box, InputBase, colors, styled, useTheme } from '@mui/material'
import { StyledBox, StyledButton } from '../../reusable/styles'
import { useRouter } from 'next/router'
import ReusableDropzone from '../../components/reusable-dropzone'
import PostItem from '../feed/post-item'
import { Post } from '../../database/schema'

const Container = styled(Box)(({ theme }) => ({
    width: '65%',
    display: 'flex',
    gap: 20,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    margin: '10px auto',
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        margin: '0 auto',
    }
}))
const FormCol = styled(Box)(({ theme }) => ({
    flexBasis: '50%',
    minHeight: 120,
    marginTop: 30,
    [theme.breakpoints.down('sm')]: {
        flexBasis: '100%',
        boxShadow: 'none!important',
        marginTop: 30,
        flexWrap: 'wrap',
        backgroundColor: 'transparent'
    }
}))
const FormWrap = styled(Box)(({ theme }) => ({
    width: '90%',
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
        width: '95%',
    }
}))
const PostPreview = styled(Box)(({ theme }) => ({
    flexBasis: '40%',
    [theme.breakpoints.down('sm')]: {
        flexBasis: '95%',
        margin: 'auto',
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
const TextInput = styled(InputBase)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {

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
                <Text sx={{ flexBasis: '100%', fontSize: 23, fontWeight: 600 }}>Create {postType} post</Text>
                <FormCol>
                    <FormWrap>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Box sx={(theme) => ({ flexBasis: '35%', [theme.breakpoints.down('sm')]: { flexBasis: '50%' } })}>
                                <ReusableDropzone buttonValue='Select image' />
                            </Box>
                            <Box sx={(theme) => ({ flexBasis: '55%', [theme.breakpoints.down('sm')]: { flexBasis: '50%' } })}>
                                <ReusableDropzone buttonValue='Select video' />
                            </Box>
                        </Box>
                        <TextInput sx={{ fontSize: 23, mt: 2, fontWeight: 600 }} placeholder='Add a title...' />
                        <Box>
                            <TextInput sx={{ fontSize: 16, mt: 2, fontWeight: 600 }} placeholder='Caption text or description...' />
                        </Box>
                    </FormWrap>
                </FormCol>
                <PostPreview>
                    <ThemedText sx={{ flexBasis: '100%', fontSize: 18, mb: 2, fontWeight: 600 }}>Post Preview</ThemedText>
                    <PostItem />
                </PostPreview>
            </Container>
        </Layout>
    )
}