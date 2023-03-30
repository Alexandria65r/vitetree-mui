import { Box, styled } from '@mui/material'
import React from 'react'
import { ButtonIcon } from '../../reusable/styles'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';
import { CSS_PROPERTIES } from '../../reusable';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { mainActions } from '../../../reducers';

const Container = styled(Box)(({ theme }) => ({
    padding: 10,
    marginBottom: 10,
    borderRadius: CSS_PROPERTIES.radius10,
    boxShadow: CSS_PROPERTIES.shadow,
    backgroundColor: '#fff',
    transition: '0.3s all'
}))



type Props = {}

export default function FilesOptions({ }: Props) {
    const dispatch = useAppDispatch()
    const showSelectedImage = useAppSelector((state) => state.MainReducer.showSelectedImage)

    function openSelectedImageViewer() {
        dispatch(mainActions.setShowSelectedImage(true))
        dispatch(mainActions.setPopperState({
            component: '',
            popperId: '',
            placement:''
        }))
    }
    return (
        <Container>
            <ButtonIcon>
                <OndemandVideoOutlinedIcon />
            </ButtonIcon>
            <ButtonIcon onClick={openSelectedImageViewer}>
                <ImageOutlinedIcon />
            </ButtonIcon>
        </Container>
    )
}