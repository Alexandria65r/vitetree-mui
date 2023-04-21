import React, { useRef } from 'react'
import { StyledButton } from '../../reusable/styles'
import { Box, CircularProgress, colors, styled } from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';


const BrowseButton = styled(StyledButton)(() => ({
    justifySelf:'center',
    padding: '0 13px',
    fontSize: 13,
    backgroundColor: colors.blue[500],
    borderBottom:`4px solid ${colors.blue[400]}`
}))



type Props = {
    children: any
    mode?: 'create' | 'update'
    disabled: boolean
    loading: boolean
    removeFile: () => void
    getBlob: (blob: string | ArrayBuffer | null) => void
}

export default function BrowseFileButton({ children, mode, getBlob, disabled, loading, removeFile }: Props) {
    const fileRef: any = useRef()

    function browseFiles() {
        if (disabled || loading) return
        fileRef.current.click()
    }

    function fileOnChange({ target: { files } }: any) {

        const file = files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = () => {
                const blob = reader.result
                getBlob(blob)
            }

            reader.readAsDataURL(file)
        }
    }

    return (<>
        {disabled ? (<>
            <BrowseButton
                onClick={removeFile}
                sx={{
                    backgroundColor: colors.red[500],
                    borderBottom:`4px solid ${colors.red[400]}`,
                    position: 'absolute',
                    right: 10,
                    bottom: 10
                }}
            >
                {loading ? (<CircularProgress
                    size={16}
                    sx={{ color: '#fff', mr: 1 }}
                />) : <DeleteOutlineIcon fontSize='small' />}
                {loading ? ' Removing...' : mode === 'update' ? 'Change' : ' Remove'}
            </BrowseButton>
            <input type='file' onChange={fileOnChange} ref={fileRef} hidden />
        </>) : (<>
            <BrowseButton onClick={browseFiles}>
                {loading ? (<CircularProgress size={20} sx={{ color: '#fff' }} />) : children}
            </BrowseButton>
            <input type='file' onChange={fileOnChange} ref={fileRef} hidden />
        </>)}

    </>
    )
}