import { Box, Typography, styled, useTheme } from '@mui/material'
import React, { Fragment, useCallback } from 'react'
import { CSS_PROPERTIES } from '../reusable'
import { colorScheme } from '../theme'
import { useDropzone } from 'react-dropzone'
import { useAppDispatch, useAppSelector } from '../../store/hooks'


const Container = styled(Box)(({ theme }) => ({
    width: '100%',
    minHeight: 140,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    border: `2px dashed`,
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

const FileIte = styled(Box)(({ theme }) => ({
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
    uploadFile: (base64: string) => void
    browseButton: React.ReactNode
}

export default function ReusableDropzone({ browseButton, uploadFile }: Props) {
    const _theme = useTheme()
    const dispatch = useAppDispatch()
   

    const onDrop = useCallback((acceptedFiles: any) => {
        acceptedFiles.forEach((file: any) => {
            console.log(file)
            const reader = new FileReader()
            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = () => {
                // Do whatever you want with the file contents
                const base64: any = reader.result
                uploadFile(base64)
            }
            reader.readAsDataURL(file)
        })

    }, [])


    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <Fragment>
            <Container
                sx={{ borderColor: isDragActive ? colorScheme(_theme).quaternay : colorScheme(_theme).grayToSecondaryColor }}>

                <DropzoneContainer {...getRootProps()}>
                    <input {...getInputProps()} />
                    {browseButton}
                </DropzoneContainer>

           
            </Container>
        </Fragment>
    )
}