import React, { useRef } from 'react'
import Layout from '../../components/layout'
import { ThemedText } from '../../theme'
import { Box, InputBase, colors, styled, useTheme } from '@mui/material'
import { StyledButton } from '../../reusable/styles'
import { useRouter } from 'next/router'
import PostItem from '../feed/post-item'
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import { uploadFileThunk } from '../../../reducers/main-reducer/main-thunks'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import ReusableFileSelector from '../../components/post/reusable-file-selector'
import { postActions } from '../../../reducers/post-reducer'
import { useMeasure } from 'react-use'
import { createPostThunk } from '../../../reducers/post-reducer/post-thunks'


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
    width: '412px',
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
    const dispatch = useAppDispatch()
    const router = useRouter()
    const _theme = useTheme()

    const [PostPreviewRef, { width, height }] = useMeasure()

    const user = useAppSelector((state) => state.AuthReducer.user)
    const post = useAppSelector((state) => state.PostReducer.post)
    const [postType, secondParam]: any = router.query.params || []


    React.useEffect(() => {
        setPostDefaults()
    }, [user])

    console.log(post)
    function setPostDefaults() {
        const [postType, secondParam]: any = router.query.params || []
        dispatch(postActions.setPost({
            ...post,
            type: postType,
            author: { ...post?.author, pageName: user.pageInfo?.name ?? '' }
        }))
    }

    async function imageUploadHandler(base64: string) {
        const { payload } = await dispatch(uploadFileThunk({ base64, resource_type: 'image', preset: 'image_preset' }))
        dispatch(postActions.setPost({ ...post, postAssets: { ...post?.postAssets, image: payload } }))
        console.log(payload)
    }

    async function videoUploadHandler(base64: string) {
        const { payload } = await dispatch(uploadFileThunk({ base64, resource_type: 'auto', preset: 'video_preset' }))
        dispatch(postActions.setPost({ ...post, postAssets: { ...post?.postAssets, video: payload } }))
    }

    async function deleteFile(base64: string) {
        const uploadedFile = await dispatch(uploadFileThunk({ base64, resource_type: 'video', preset: 'video_preset' }))

    }


    console.log(width)



    const BrowseImage = () => (
        <StyledButton sx={{
            fontSize: '14px',
            px: 2,
            borderRadius: 2,
            bgcolor: colors.amber[500]
        }}>
            <PhotoSizeSelectActualIcon />
        </StyledButton>
    )

    const BrowseVideo = () => (
        <StyledButton sx={{
            fontSize: '14px',
            px: 2,
            borderRadius: 2,
        }}>
            <SmartDisplayIcon />
        </StyledButton>
    )



    function handleTextChange({ target }: any) {
        dispatch(postActions.setPost({ ...post, [target.name]: target.value }))
    }



    return (
        <Layout>
            <Container>
                <Text sx={{ flexBasis: '100%', fontSize: 23, fontWeight: 600 }}>Create {postType} post</Text>
                <FormCol>
                    <FormWrap>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Box sx={(theme) => ({ flexBasis: '35%', [theme.breakpoints.down('sm')]: { flexBasis: '50%' } })}>
                                <ReusableFileSelector file_type='image' browseButton={<BrowseImage />} uploadFile={imageUploadHandler} deleteFile={deleteFile} />
                            </Box>
                            <Box sx={(theme) => ({ flexBasis: '55%', [theme.breakpoints.down('sm')]: { flexBasis: '50%' } })}>
                                <ReusableFileSelector file_type='video' browseButton={<BrowseVideo />} uploadFile={videoUploadHandler} deleteFile={deleteFile} />
                            </Box>
                        </Box>
                        <TextInput name='title'
                            onChange={handleTextChange} sx={{ fontSize: 23, mt: 2, fontWeight: 600 }}
                            placeholder='Add a title...' />
                        <Box>
                            <TextInput name='description'
                                onChange={handleTextChange} sx={{ fontSize: 16, mt: 2, fontWeight: 600 }}
                                placeholder='Caption text or description...' />
                        </Box>
                    </FormWrap>
                </FormCol>
                <PostPreview ref={PostPreviewRef}>
                    <ThemedText sx={{ flexBasis: '100%', fontSize: 18, mb: 2, fontWeight: 600 }}>Post Preview</ThemedText>
                    <PostItem post={post} />
                    <Box my={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <StyledButton onClick={() => dispatch(createPostThunk(postType))} sx={{ fontSize: 16, fontWeight: 600 }}>
                            Publish Post
                        </StyledButton>
                    </Box>
                </PostPreview>
            </Container>
        </Layout>
    )
}