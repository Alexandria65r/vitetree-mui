import { Box, styled } from '@mui/material'
import React from 'react'
import { StyledButton, StyledButtonOutlined } from '../../reusable/styles'
import { inquiryActions } from '../../../reducers/inquiry-reducer'
import { StudentInquiry, UserSchema } from '../../reusable/schemas'
import { useAppDispatch } from '../../../store/hooks'
import { tutorsActions } from '../../../reducers/tutors-reducer'


const ItemFooter = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 10,
}))

type Props = {}

export default function InquiredFooter({ }: Props) {
    const dispatch = useAppDispatch()

    function handleClose() {
        dispatch(inquiryActions.setInquiry(StudentInquiry))
        dispatch(tutorsActions.setTutor(UserSchema))
    }


    return (
        <ItemFooter>
            <StyledButtonOutlined
                onClick={handleClose}
                sx={{ flexBasis: '48%', }}>
                Close
            </StyledButtonOutlined>
            <StyledButton sx={{ flexBasis: '48%' }}>Update</StyledButton>
        </ItemFooter>
    )
}