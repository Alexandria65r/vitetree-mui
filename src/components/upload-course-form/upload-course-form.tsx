import { Box, CircularProgress, MenuItem, Select, TextField, Typography, colors, styled } from '@mui/material'
import React, { useState } from 'react'
import { CSS_PROPERTIES } from '../../reusable'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { Section, VideoCourse } from '../../reusable/interfaces'
import { StyledButton, Textarea } from '../../reusable/styles'
import AddIcon from '@mui/icons-material/Add';
import { colorScheme } from '../../theme'
import BrowseFileButton from '../browse-file-button'
import UploadAPI from '../../api-services/upload'
import { courseActions } from '../../../reducers/course-reducer'
import { useRouter } from 'next/router'
import { AppSpinner } from '../activity-indicators'
import { createToastThunk } from '../../../reducers/main-reducer/main-thunks'

const ChoicesContainer = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        marginLeft: 0
    }
}))

const TextInput = styled(TextField)(() => ({
    flex: 1
}))
const FormContainer = styled(Box)(() => ({
    width: '100%',
    padding: 10,
}))
const FormControl = styled(Box)(() => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '20px 0'
}))


const BrowseFilesContainer = styled(Box)(({ theme }) => ({
    display: 'flex', gap: 5,
    [theme.breakpoints.down('sm')]: {
        gap: 3
    }
}))
const VideoContainer = styled(Box)(({ theme }) => ({
    flex: 1,
    position: 'relative',
    minHeight: 220,
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: CSS_PROPERTIES.radius5,
    // backgroundColor: colorScheme(theme).primaryColor,
    border: ` 1px dashed ${colorScheme(theme).darkGreyToTertiary}`,
    [theme.breakpoints.down('sm')]: {
        minHeight: 160,
    }

}))

const Video = styled('video')(() => ({
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
    top: 0,
    zIndex: 60,
    position: 'absolute'
}))


const ThumbnailContainer = styled(Box)(({ theme }) => ({
    flex: 1,
    position: 'relative',
    //height: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: CSS_PROPERTIES.radius5,
    // backgroundColor: colorScheme(theme).primaryColor,
    border: ` 1px dashed ${colorScheme(theme).darkGreyToTertiary}`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover'
}))


type Props = {
    mode: 'create' | "update" | 'add-lectures' | '',
    submitHandler: () => VideoCourse | any
}

export default function UploadCourseForm({ mode, submitHandler }: Props) {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const isErr = useAppSelector((state) => state.TestReducer.isErr)
    const course = useAppSelector((state) => state.CourseReducer.newVideo)
    const [videoIsLoading, setVideoLoading] = useState<'removing...' | 'uploading...' | ''>('')
    const [thumbLocal, setThumbLocal] = useState<string | ArrayBuffer | null>('')
    const [imageIsLoading, setImageIsLoading] = useState<'removing...' | 'uploading...' | ''>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    function handleOnChange({ target: { name, value } }: any) {
        dispatch(courseActions.setVideoProperties({
            name,
            value
        }))
    }

    async function handleSubmit() {
        if (!(course.title && course.description && course.imageAsset.secureURL && course.vidAsset.secureURL)) {
            console.log('rrr')
            dispatch(courseActions.setError(true))
            return true
        } else {
            setIsLoading(true)
            dispatch(courseActions.setError(false))
            const course = await submitHandler()
            if (course) {
                if (mode === 'add-lectures') {
                    dispatch(createToastThunk('A new lecture has been added'))
                } else if (mode === 'create') {
                    dispatch(createToastThunk('Course has been created successfully'))
                } else if (mode == 'update') {
                    dispatch(createToastThunk('Course has been updated successfully'))
                }
                setIsLoading(false)
                setThumbLocal('')
            }
            return false
        }
    }


    async function getVideoBlob(base64: string | ArrayBuffer | null) {
        setVideoLoading('uploading...')
        try {
            const response = await UploadAPI.uploadFile({ base64, resource_type: 'video', preset: 'video_preset' })
            console.log(response)
            if (response?.secure_url) {
                setVideoLoading('')
                dispatch(courseActions.setVideoAssets({
                    publicId: response.public_id,
                    secureURL: response.secure_url
                }))
            } else  {
                dispatch(createToastThunk('An error orccured, please try again!'))
                setVideoLoading('')
            }

        } catch (error) {
            dispatch(createToastThunk('An error orccured, please try again!'))
            setVideoLoading('')
        }
    }


    async function getThumbnailBlob(base64: string | ArrayBuffer | null) {
        setImageIsLoading('uploading...')
        setThumbLocal(base64)
        const response = await UploadAPI.uploadFile({ base64, resource_type: 'image', preset: 'image_preset' })
        console.log(response)
        if (response.secure_url) {
            setImageIsLoading('')
            dispatch(courseActions.setImageAssets({
                publicId: response.public_id,
                secureURL: response.secure_url
            }))
        }
    }



    async function removeFile(resource_type: 'video' | 'image') {

        if (resource_type === 'image') {
            setImageIsLoading('removing...')
        } else {
            setVideoLoading('removing...')
        }

        const id = resource_type === 'image' ? course.imageAsset.publicId : course.vidAsset.publicId
        const { data } = await UploadAPI.DeleteAsset(resource_type, id)
        console.log(data)
        if (data.success) {
            if (resource_type === 'image') {
                setThumbLocal('')
                setImageIsLoading('')
                dispatch(courseActions.setImageAssets({
                    publicId: '',
                    secureURL: ''
                }))
            } else {
                setVideoLoading('')
                dispatch(courseActions.setVideoAssets({
                    publicId: '',
                    secureURL: ''
                }))
            }
        }
    }

    return (
        <FormContainer>
            <ChoicesContainer>
                <BrowseFilesContainer sx={{ display: course.vidAsset.secureURL ? 'flex' : 'flex' }}>
                    <ThumbnailContainer
                        sx={{ backgroundImage: `url(${thumbLocal || course?.imageAsset?.secureURL})` }} >
                        <BrowseFileButton mode="update" removeFile={() => removeFile('image')}
                            disabled={course.imageAsset.secureURL !== ''}
                            loading={imageIsLoading}
                            getBlob={getThumbnailBlob}>
                            Browse cover
                        </BrowseFileButton>
                    </ThumbnailContainer>

                    <VideoContainer>
                        <Box sx={(theme) => ({
                            flexBasis: '60%',
                            [theme.breakpoints.down("sm")]: {
                                flexBasis: '90%',
                            }
                        })}>
                            {!course.vidAsset.secureURL && mode === 'create' ? (
                                <Typography sx={{ flexBasis: '100%', textAlign: 'center', fontSize: 15, fontWeight: 500 }}>
                                    Upload video introduction to the course
                                </Typography>

                            ) : (<Typography sx={{ flexBasis: '100%', textAlign: 'center', fontSize: 15, fontWeight: 500 }}>
                                Upload a lecture where you are teaching.Video should be less than <b>100Mb</b>.
                            </Typography>)}
                            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 1 }}>
                                <BrowseFileButton removeFile={() => removeFile('video')}
                                    disabled={course.vidAsset.secureURL !== ''}
                                    loading={videoIsLoading}
                                    getBlob={getVideoBlob}>
                                    Browse video
                                </BrowseFileButton>
                            </Box>
                        </Box>

                        {course.vidAsset.secureURL && (
                            <Video
                                style={{ borderRadius: 10 }}
                                controls
                                src={course.vidAsset.secureURL}
                                poster={course.imageAsset.secureURL}
                            />
                        )}
                    </VideoContainer>
                </BrowseFilesContainer>
                <FormControl>
                    <TextInput sx={{ flexBasis: '50%' }}
                        error={isErr && !course.title
                        }
                        value={course.title}
                        onChange={handleOnChange}
                        name="title"
                        label='Title of the course'
                        placeholder='Title of the course' />
                </FormControl>
                {mode !== 'add-lectures' && (
                    <FormControl>
                        <Select fullWidth onChange={handleOnChange}
                            error={isErr && !course.price}
                            value={course.price || undefined}
                            name='price' defaultValue='Select Pricing' >
                            <MenuItem value="Select Pricing">Select Pricing</MenuItem>
                            <MenuItem value="$9.60">$9.60</MenuItem>
                            <MenuItem value="$12.60">$12.60</MenuItem>
                            <MenuItem value="$24.60">$24.60</MenuItem>
                            <MenuItem value="Free">Free</MenuItem>
                        </Select>
                    </FormControl>
                )}

                <FormControl>
                    <Textarea minRows={2}
                        value={course.description}
                        name="description"
                        onChange={handleOnChange}
                        sx={{ flex: 1, borderColor: isErr && !course.description ? colors.red[400] : colors.grey[400] }}
                        placeholder={`Course Description`} />
                </FormControl>


                <FormControl onClick={handleSubmit} sx={{ justifyContent: 'flex-end' }}>
                    <StyledButton
                        sx={{ px: 2, cursor: course.imageAsset.secureURL && course.vidAsset.secureURL ? 'pointer' : 'not-allowed' }}>
                        {isLoading ? <AppSpinner visible={true} size={18} /> : <AddIcon fontSize='small' />}
                        {mode === 'add-lectures' ? 'update course' : mode}
                    </StyledButton>
                </FormControl>
            </ChoicesContainer>
        </FormContainer>
    )
}