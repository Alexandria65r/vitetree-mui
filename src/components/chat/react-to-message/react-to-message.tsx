import { Box, styled } from '@mui/material'
import React from 'react'
import { ButtonIcon } from '../../../reusable/styles'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';
import { CSS_PROPERTIES } from '../../../reusable';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { mainActions } from '../../../../reducers';
import SentimentSatisfiedSharpIcon from '@mui/icons-material/SentimentSatisfiedSharp';
import SentimentDissatisfiedSharpIcon from '@mui/icons-material/SentimentDissatisfiedSharp';
import Add from '@mui/icons-material/Add';
import { colorScheme } from '../../../theme';

const Container = styled(Box)(({ theme }) => ({
    padding: 10,
    margin:5,
    borderRadius: CSS_PROPERTIES.radius10,
    boxShadow: colorScheme(theme).chatBoarderColor,
    backgroundColor: colorScheme(theme).chatPrimaryColor,
    transition: '0.3s all'
}))

const Contain = styled(Box)(({ theme }) => ({
    padding: 10,
    margin: 5,
    borderRadius: CSS_PROPERTIES.radius10,
    boxShadow: CSS_PROPERTIES.shadow,
    backgroundColor: '#fff',
    transition: '0.3s all'
}))



type Props = {}

export default function ReactToMessage({ }: Props) {
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
                <SentimentSatisfiedSharpIcon />
            </ButtonIcon>
            <ButtonIcon>
                <SentimentDissatisfiedSharpIcon />
            </ButtonIcon>
            <ButtonIcon >
                <Add />
            </ButtonIcon>
        </Container>
    )
}