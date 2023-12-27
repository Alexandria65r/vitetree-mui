import React, { useCallback, useRef } from 'react'
import Layout from '../components/layout'
import { ThemedText, colorScheme } from '../theme'
import { Box, InputBase, MenuItem, Select, colors, styled, useTheme } from '@mui/material'
import { StyledButton } from '../reusable/styles'
import { useRouter } from 'next/router'

import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import { uploadFileThunk } from '../../reducers/main-reducer/main-thunks'
import { useAppDispatch, useAppSelector } from '../../store/hooks'

import { postActions } from '../../reducers/post-reducer'
import { useMeasure } from 'react-use'
import { createPostThunk } from '../../reducers/post-reducer/post-thunks'
import JobItem from '../components/job-item'
import SlateEditor from '../components/editor/SlateEditor'
import { Descendant } from 'slate'


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
        /// textAlign: 'center'
    }
}))
const TextInput = styled(InputBase)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {

    }
}))

const FormControl = styled(Box)(() => ({
    marginBlock: 10
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


    const setPostDefaults = useCallback(() => {
        dispatch(postActions.setPost({
            ...post,
            type: postType,
            author: { ...post?.author, pageName: user.pageInfo?.name ?? '' }
        }))
    }, [postType, post])

    React.useEffect(() => {
        setPostDefaults()
    }, [user, postType])



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
    function onValueUpdate() {

    }



    return (
        <Layout>
            <Container>
                <Text sx={{ flexBasis: '100%', mx: 1, fontSize: 23, fontWeight: 600 }}>Post a Job</Text>
                <FormCol>
                    <FormWrap>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            {postType === 'photo' && (
                                <Box sx={(theme) => ({ flex: 1, [theme.breakpoints.down('sm')]: { flexBasis: '50%' } })}>

                                </Box>

                            )}
                            {postType === 'video' && (
                                <Box sx={(theme) => ({ flex: 1, [theme.breakpoints.down('sm')]: { flexBasis: '50%' } })}>

                                </Box>
                            )}
                        </Box>
                        <TextInput hidden name='title'
                            onChange={handleTextChange} sx={{ fontSize: 23, mt: 2, fontWeight: 600 }}
                            placeholder='Add a title...' />

                        <FormControl>
                            <ThemedText sx={{ fontSize: 13, my: 1, lineHeight: 1.2 }}>
                                Job type
                            </ThemedText>
                            <Select fullWidth onChange={handleTextChange}
                                name='job_type' defaultValue='Job Type' >
                                <MenuItem value="Job Type">Job Type</MenuItem>
                                <MenuItem sx={{ textTransform: 'capitalize' }} value='Full-time'>Full-time</MenuItem>
                                <MenuItem sx={{ textTransform: 'capitalize' }} value='Part-time'>Part-time</MenuItem>
                                <MenuItem sx={{ textTransform: 'capitalize' }} value='Contract'>Contract</MenuItem>

                            </Select>
                        </FormControl>

                        <FormControl>
                            <ThemedText sx={{ fontSize: 13, my: 1, lineHeight: 1.2 }}>
                                Schedule
                            </ThemedText>
                            <Select fullWidth onChange={handleTextChange}
                                name='job_type' defaultValue='Work Schedule' >
                                <MenuItem value="Work Schedule">Work Schedule</MenuItem>
                                <MenuItem sx={{ textTransform: 'capitalize' }} value='Anytime'>Anytime</MenuItem>
                                <MenuItem sx={{ textTransform: 'capitalize' }} value='4hrs Shift'>4hrs Shift</MenuItem>
                                <MenuItem sx={{ textTransform: 'capitalize' }} value='8hrs Shift'>8hrs Shift</MenuItem>
                                <MenuItem sx={{ textTransform: 'capitalize' }} value='10hrs Shift'>10hrs Shift</MenuItem>
                                <MenuItem sx={{ textTransform: 'capitalize' }} value='12hrs Shift'>12hrs Shift</MenuItem>
                                <MenuItem sx={{ textTransform: 'capitalize' }} value='Night Shift'>Night Shift</MenuItem>
                            
                            </Select>
                        </FormControl>

                        <FormControl>
                            <ThemedText sx={{ fontSize: 13, my: 1, lineHeight: 1.2 }}>
                                Job Descritpion
                            </ThemedText>
                            <SlateEditor onValueUpdate={onValueUpdate} />
                        </FormControl>
                    </FormWrap>
                </FormCol>
                <PostPreview ref={PostPreviewRef}>
                    <ThemedText sx={{ flexBasis: '100%', fontSize: 18, mb: 2, fontWeight: 600 }}>Job Preview</ThemedText>
                    <JobItem />
                    <Box my={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <StyledButton onClick={() => dispatch(createPostThunk(postType))} sx={{ fontSize: 15, fontWeight: 600 }}>
                            Publish Job
                        </StyledButton>
                    </Box>
                </PostPreview>
            </Container>
        </Layout>
    )
}