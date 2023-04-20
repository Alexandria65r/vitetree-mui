import { Box, ButtonBase, MenuItem, Select, TextField, colors, styled } from '@mui/material'
import React, { useState } from 'react'
import { CSS_PROPERTIES } from '../../reusable'
import SelectWithCheckMarks from '../form-inputs/select-with-checkmarks'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { testActions } from '../../../reducers/test-reducer'
import { Section } from '../../reusable/interfaces'
import { StyledButton, Textarea } from '../../reusable/styles'
import AddIcon from '@mui/icons-material/Add';
import { colorScheme } from '../../theme'
import BrowseFileButton from '../browse-file-button'
import UploadAPI from '../../api-services/upload'
import { courseActions } from '../../../reducers/course-reducer'

const ChoicesContainer = styled(Box)(({ theme }) => ({
    //marginLeft: 20,
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




// const StyledButton = styled(ButtonBase)(({ theme }) => ({
//     textTransform: 'capitalize',
//     //flexBasis: '20%',
//     justifySelf: 'flex-end',
//     fontWeight: 600,
//     height: 50,
//     color: '#fff',
//     fontSize: 16,
//     padding: '0 10px',
//     borderRadius: CSS_PROPERTIES.radius5,
//     backgroundColor: colors.teal[400],
//     [theme.breakpoints.down("sm")]: {
//         flexBasis: '25%',
//     }
// }))

const VideoContainer = styled(Box)(({ theme }) => ({
    position: 'relative',
    height: 220,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: CSS_PROPERTIES.radius5,
    backgroundColor: colorScheme(theme).primaryColor
}))

const Video = styled('video')(() => ({
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
    position: 'absolute'
}))




type Props = {
    mode: 'create' | "update",
    submitHandler: () => void
}

export default function UploadCourseForm({ mode, submitHandler }: Props) {
    const dispatch = useAppDispatch()
    const newTest = useAppSelector((state) => state.TestReducer.newTest)
    const isErr = useAppSelector((state) => state.TestReducer.isErr)

    const course = useAppSelector((state) => state.CourseReducer.video)
    const [videoIsLoading, setVideoLoading] = useState<boolean>(false)


    let newSections: Section[] = [...newTest.sections]



    function handleOnChange({ target: { name, value } }: any) {
        dispatch(courseActions.setVideoProperties({
            name,
            value
        }))
    }


    function handleSubmit() {
        if (!(course.title && course.description && course.imageAsset.secureURL && course.vidAsset.secureURL)) {
            console.log('rrr')
            dispatch(courseActions.setError(true))
            return true
        } else {
            dispatch(courseActions.setError(false))
            submitHandler()
            return false
        }
    }


    async function getVideoBlob(base64: string | ArrayBuffer | null) {
        setVideoLoading(true)
        const response = await UploadAPI.uploadFile({ base64, resource_type: 'video', preset: 'video_preset' })
        console.log(response)
        if (response.secure_url) {
            setVideoLoading(false)
            dispatch(courseActions.setVideoAssets({
                publicId: response.public_id,
                secureURL: response.secure_url
            }))
        }
    }

    async function removeFile() {
        setVideoLoading(true)
        const { data } = await UploadAPI.DeleteAsset('video', course.imageAsset.publicId)
        console.log(data)
        if (data.success) {
            setVideoLoading(false)
            dispatch(courseActions.setVideoAssets({
                publicId: '',
                secureURL: ''
            }))
        }
    }



    return (
        <FormContainer>
            <ChoicesContainer>
                <VideoContainer>
                    {!course.vidAsset.secureURL ? (
                        <BrowseFileButton removeFile={removeFile}
                            disabled={course.vidAsset.secureURL !== ''}
                            loading={videoIsLoading}
                            getBlob={getVideoBlob}>
                            Browse
                        </BrowseFileButton>

                    ) : (
                        <Video
                            controls
                            src={course.vidAsset.secureURL}
                            preload={course.imageAsset.secureURL}
                        />
                    )}
                </VideoContainer>
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

                <FormControl>
                    <Textarea minRows={2}
                        value={course.description}
                        name="description"
                        onChange={handleOnChange}
                        sx={{ flex: 1, borderColor: isErr && !course.description ? colors.red[400] : colors.grey[400] }}
                        placeholder={`Course Description`} />
                </FormControl>

                <FormControl onClick={handleSubmit} sx={{ justifyContent: 'flex-end' }}>
                    <StyledButton sx={{ px: 2 }}>
                        <AddIcon fontSize='small' />
                        {mode}
                    </StyledButton>
                </FormControl>
            </ChoicesContainer>
        </FormContainer>
    )
}