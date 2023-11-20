import React, { useEffect, useState } from 'react'
import Layout from '../components/layout'
import { Box, Typography, styled } from '@mui/material'
import { colorScheme } from '../theme'
import { CSS_PROPERTIES } from '../reusable'

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { useRouter } from 'next/router'
import randomstring from 'randomstring'
import UploadCourseForm from '../components/upload-course-form/upload-course-form'
import BrowseFileButton from '../components/browse-file-button'
import UploadAPI from '../api-services/upload'
import { courseActions } from '../../reducers/course-reducer'
import CourseAPI from '../api-services/course'
import { VideoCourseSchema } from '../reusable/schemas'
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';



const Container = styled(Box)(({ theme }) => ({
    width: '75%',
    padding: 20,
    margin: '0 auto',
    [theme.breakpoints.down("sm")]: {
        alignItems: 'center',
        width: '95%',
        padding: 0,
    },
    [theme.breakpoints.up("xl")]: {
        width: '60%',
    }
}))
const FlexContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    gap: 15,
    [theme.breakpoints.down("sm")]: {
        gap: 0,
        //margin: '10px auto',
        alignItems: 'center',
        width: '100%',
        padding: 0,
    }
}))

const TestHeader = styled(Box)(({ theme }) => ({
    flex: 1,
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
const TestInfoCol = styled(Box)(({ theme }) => ({
    flexBasis: '35%',
    height: 200,
    borderRadius: CSS_PROPERTIES.radius5,
    backgroundColor: colorScheme(theme).secondaryColor,
    boxShadow: `0 1px 3px 0 ${colorScheme(theme).chatBoarderColor}`,
    [theme.breakpoints.down("sm")]: {
        flexBasis: '100%',
        marginBottom: 10
    }
}))
const TestFormContainer = styled(Box)(({ theme }) => ({
    justifySelf: 'flex-end',
    flex: 1,
    padding: 10,
    minHeight: 200,
    backgroundColor: colorScheme(theme).secondaryColor,
    borderRadius: CSS_PROPERTIES.radius5,
    boxShadow: `0 1px 3px 0 ${colorScheme(theme).chatBoarderColor}`,
    [theme.breakpoints.down("sm")]: {
        flexBasis: '100%',
        marginLeft: 0,
        padding: 0,
    }
}))

const ThumbnailContainer = styled(Box)(({ theme }) => ({
    position: 'relative',
    height: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: CSS_PROPERTIES.radius5,
    backgroundColor: colorScheme(theme).secondaryColor,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover'
}))





type Props = {}

export default function NewTest({ }: Props) {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const user = useAppSelector((state) => state.AuthReducer.user)
    const course = useAppSelector((state) => state.CourseReducer.newVideo)
    const [thumbLocal, setThumbLocal] = useState<string | ArrayBuffer | null>('')
    const [imageIsLoading, setImageIsLoading] = useState<'removing...' | 'uploading...' | ''>('')


    useEffect(() => {
        return () => {
            dispatch(courseActions.setNewVideo(VideoCourseSchema))
        }
    }, [])

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

    async function removeFile() {
        setImageIsLoading('removing...')
        const { data } = await UploadAPI.DeleteAsset('image', course.imageAsset.publicId)
        console.log(data)
        if (data.success) {
            setImageIsLoading('')
            setThumbLocal('')
            dispatch(courseActions.setImageAssets({
                publicId: '',
                secureURL: ''
            }))
        }
    }


    async function create() {
        const courseId = randomstring.generate(19)
        const newCourse = await CourseAPI.create({
            ...course,
            _id: courseId,
            courseId: courseId,
            type: 'introduction',
            author: {
                authorId: user._id ?? '',
                public_id: user.imageAsset?.publicId ?? '',
                name: user.tutorInfo?.name ?? ''
            },
        })

        if (newCourse) {
            console.log(newCourse)
            router.push(`/course/${newCourse._id}/add-lectures`)
        }
    }

    return (
        <Layout>
            <Container>
                <TestHeader>
                    <Typography
                        sx={(theme) => ({
                            fontSize: 22,
                            fontWeight: 600,
                            [theme.breakpoints.down("sm")]: {
                                fontSize: 18
                            }
                        })}>
                        Create Course
                    </Typography>
                </TestHeader>
                <FlexContainer>
                    <TestInfoCol>
                        <ThumbnailContainer
                            sx={{ backgroundImage: `url(${thumbLocal || course.imageAsset.secureURL})` }} >
                            <Box>
                                {!thumbLocal && !course.imageAsset.secureURL && (
                                    <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 1 }}>
                                        <AddPhotoAlternateOutlinedIcon sx={{ fontSize: 40 }} />
                                    </Box>
                                )}
                                <BrowseFileButton removeFile={removeFile}
                                    disabled={thumbLocal !== '' || course.imageAsset.secureURL !== ''}
                                    loading={imageIsLoading}
                                    getBlob={getThumbnailBlob}>
                                    Browse video cover
                                </BrowseFileButton>
                            </Box>
                        </ThumbnailContainer>

                    </TestInfoCol>
                    <TestFormContainer>
                        <UploadCourseForm mode="create" submitHandler={create} />
                    </TestFormContainer>
                </FlexContainer>
            </Container>
        </Layout >
    )
}