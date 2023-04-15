import { Box, Typography, colors, styled } from '@mui/material'
import React from 'react'
import { colorScheme } from '../theme'
import { CSS_PROPERTIES } from '../reusable'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { StyledButton } from '../reusable/styles'
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { mainActions } from '../../reducers'





type Props = {}

const Container = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 400,
    transform: 'translate(-50%, -50%)',
    borderRadius: CSS_PROPERTIES.radius10,
    backgroundColor: colorScheme(theme).secondaryColor,
    padding: 10,
}))




export default function DeleteTest({ }: Props) {
    const deleteTestModal = useAppSelector((state) => state.MainReducer.deleteTestModal)
    const dispatch = useAppDispatch()
    function cancelDelete() {
        dispatch(mainActions.setDeleteTestModal({
            component: 'close',
            testId: '',
            subject: ''
        }))
    }
    return (
        <Container sx={{ boxShadow: 24 }}>
            <Typography id="modal-modal-title" sx={{ fontWeight: 600, }} variant="h6" component="h2">
                Delete
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 1, lineHeight: 1.2 }}>
                This test data will be deleted. Are you sure you want to delete
                <b> {deleteTestModal.subject}</b>?
            </Typography>
            <Box sx={{ display: 'flex', mt: 2, justifyContent: 'space-between' }}>
                <StyledButton
                    onClick={cancelDelete}
                    sx={(theme) => ({
                        height: 40,
                        flexBasis: '48%',
                        color: colorScheme(theme).TextColor,
                        backgroundColor: theme.palette.mode === 'light' ? colors.grey[300] : colorScheme(theme).secondaryColor
                    })}>Cancel</StyledButton>
                <StyledButton sx={{ height: 40, flexBasis: '48%', backgroundColor: colors.red[400] }}>
                    <DeleteOutlineOutlinedIcon fontSize='small' sx={{ mr: 1 }} />
                    Delete
                </StyledButton>
            </Box>
        </Container>
    )
}