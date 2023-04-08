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
    boxShadow: `0 1px 3px 0 ${colorScheme(theme).chatBoarderColor}`,
    backgroundColor: colorScheme(theme).chatPrimaryColor,
    transition: '0.3s all'
}))

const Contain = styled(Box)(({ theme }) => ({
    padding: 10,
    margin: 5,
    borderRadius: CSS_PROPERTIES.radius10,
    boxShadow: `0 1px 3px 0 ${colorScheme(theme).chatBoarderColor}`,
    backgroundColor: '#fff',
    transition: '0.3s all'
}))



type Props = {
    
}

export default function ReactToMessage({ }: Props) {
    const dispatch = useAppDispatch()
    const showSelectedImage = useAppSelector((state) => state.MainReducer.showSelectedImage)
    const selectedMessage = useAppSelector((state)=> state.ChatReducer.selectedMessage)
    function openSelectedImageViewer() {
        dispatch(mainActions.setShowSelectedImage(true))
        dispatch(mainActions.setPopperState({
            component: '',
            popperId: '',
            placement:''
        }))
    }
    return (
        <Container sx={{
            borderTopLeftRadius: !selectedMessage.owner ? 0 : 10,
            borderBottomRightRadius: selectedMessage.owner ? 0 : 10,
        }}>
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