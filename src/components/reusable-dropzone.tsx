import { Box, Hidden, LinearProgress, Typography, colors, styled, useTheme } from '@mui/material'
import React, { Fragment, useCallback } from 'react'
import { CSS_PROPERTIES } from '../reusable'
import { ButtonIcon, StyledButton } from '../reusable/styles'
import { colorScheme } from '../theme'
import { useDropzone } from 'react-dropzone'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { DropzoneItem, dropzoneActions } from '../../reducers/dropzone-reducer'
import { uploadFileThunk } from '../../reducers/dropzone-reducer/dropzone-thunks'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Randomstring from 'randomstring'

const Container = styled(Box)(({ theme }) => ({
    minHeight: 140,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    border: `1px dashed`,
    borderRadius: CSS_PROPERTIES.radius10,
}))
const DropzoneContainer = styled(Box)(({ theme }) => ({
    // height: 140,
    padding: '10px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    // border: `1px dashed`,
    borderRadius: CSS_PROPERTIES.radius10,
}))

const MappedUploadedFiles = styled(Box)(({ theme }) => ({
    //display: 'flex',
    gap: 5,
    flexBasis: '100%',
    padding: '10px',
    borderTop: `1px dashed`,
}))

const FileItem = styled(Box)(({ theme }) => ({
    position: 'relative',
    display: 'flex',
    // alignItems: 'flex-end',
    gap: 5
}))

const Image = styled(Box)(({ theme }) => ({
    width: 50,
    height: 50,
    marginBottom: 5,
    borderRadius: 0,
    backgroundColor: colorScheme(theme).primaryToGrey100Color
}))

const Text = styled(Typography)(({ theme }) => ({

}))


type Props = {

}

export default function ReusableDropzone({ }: Props) {
    const _theme = useTheme()
    const dispatch = useAppDispatch()
    const { dropzoneList } = useAppSelector((state) => state.DropzoneReducer)

    const onDrop = useCallback((acceptedFiles: any) => {
        acceptedFiles.forEach((file: any) => {
            console.log(file)
            const reader = new FileReader()
            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = () => {
                // Do whatever you want with the file contents
                const base64:any = reader.result
                uploadFile(file.name, file.type.split('/')[1], base64)
            }
            reader.readAsDataURL(file)
        })

    }, [])


    function uploadFile(name: string, fileType: string, base64: string ) {
        const item: DropzoneItem = {
            publicId: Randomstring.generate(16),
            name,
            fitleType: fileType,
            status: 'uploading'
        }
        dispatch(dropzoneActions.setNewUpload(item))
        dispatch(uploadFileThunk({ base64, publicId: item.publicId}))
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <Fragment>
            <Container
                sx={{ borderColor: isDragActive ? colorScheme(_theme).dropzoneBorder : colorScheme(_theme).borderColor400 }}>

                <DropzoneContainer {...getRootProps()}>
                    <input {...getInputProps()} />
                    <StyledButton sx={{
                        fontSize: '14px',
                        px: 2,
                        borderRadius: 29,
                        bgcolor: _theme.palette.mode === 'light' ? colors.lime[400] : colorScheme(_theme).primaryColor
                    }}>
                        {isDragActive ? 'Drop your files here' : 'Browse Files'}
                    </StyledButton>
                </DropzoneContainer>

                {dropzoneList.length ? (
                    <MappedUploadedFiles
                        sx={{ borderColor: isDragActive ? colorScheme(_theme).dropzoneBorder : colorScheme(_theme).borderColor400 }}
                    >
                        {dropzoneList.map((item, index) => (
                            <FileItem key={index} className='FileItem'>
                                <Image>

                                </Image>
                                <Box sx={{ flex: 1 }}>
                                    <Text sx={{
                                        width: '200px',
                                        lineHeight: 1.2, fontSize: '14px',
                                        whiteSpace: 'nowrap',
                                        overflowX: 'hidden',
                                        textOverflow: 'ellipsis',
                                        [_theme.breakpoints.down('sm')]: {
                                            width: '235px',
                                        }
                                    }}>{item.name}</Text>
                                    <Text sx={{ fontSize: '13px' }}>{item.fitleType}</Text>
                                    <Box sx={{ display: 'flex', position: 'relative', width: '100%' }}>
                                        <LinearProgress color='info' variant='indeterminate'
                                            sx={{ flex: 1, mt: 1, visibility: item.status === 'uploading' ? 'visible' : 'hidden' }}
                                        />
                                    </Box>
                                </Box>
                                <ButtonIcon onClick={() => dispatch(dropzoneActions.delete(item.publicId))}>
                                    <CloseOutlinedIcon />
                                </ButtonIcon>
                            </FileItem>

                        ))}
                    </MappedUploadedFiles>
                ) : <></>}
            </Container>
        </Fragment>
    )
}