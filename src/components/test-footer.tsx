import { Box, Button, styled } from '@mui/material'
import React, { useState } from 'react'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Section } from '../reusable/interfaces';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { testActions } from '../../reducers/test-reducer';


const FooterContainer = styled(Box)(({ theme }) => ({
    padding: 10,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '20px 0'
}))
const FormControl = styled(Box)(({ theme }) => ({
    margin: '0 10px'
}))


const StyledButton = styled(Button)(({ theme }) => ({
    textTransform: 'capitalize',
    height: 45,
    borderRadius: 5,
    [theme.breakpoints.down('sm')]: {
        flexBasis: '100%',
        borderRadius: 5,
        margin: '6px 0'
    }
}))


type Props = {
    prevQuestion: () => void;
    nextQuestion: () => void
}

export default function TestFooter({ prevQuestion,nextQuestion }: Props) {
   



    return (
        <FooterContainer>
            <FormControl >
                <StyledButton onClick={prevQuestion} startIcon={<ChevronLeftIcon />} variant='outlined'>Prev Question </StyledButton>
            </FormControl>
            <FormControl sx={{ justifySelf: 'flex-end' }} >
                <StyledButton onClick={nextQuestion} variant='outlined' endIcon={<ChevronRightIcon />} >Next Question </StyledButton>
            </FormControl>
        </FooterContainer>
    )
}