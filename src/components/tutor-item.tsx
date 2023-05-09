import { Box, Typography, colors, styled } from '@mui/material'
import React from 'react'
import { CSS_PROPERTIES } from '../reusable'
import { colorScheme } from '../theme'
import { ButtonIcon, StyledButton } from '../reusable/styles'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import { User } from '../reusable/interfaces'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { tutorsActions } from '../../reducers/tutors-reducer'
import { inquiryActions } from '../../reducers/inquiry-reducer'
import Randomstring from 'randomstring'
import { teal } from '@mui/material/colors'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { nomalizedText } from '../reusable/helpers'



const TutorContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexBasis: '49%',
    minHeight: 260,
    borderRadius: CSS_PROPERTIES.radius10,
    backgroundColor: colorScheme(theme).secondaryColor,
    boxShadow: `0 1px 3px 0px ${theme.palette.mode === 'light' ? '#ddd' : 'transparent'}`,
    flexWrap: 'wrap',
    justifyContent: 'center',
    [theme.breakpoints.down("sm")]: {

    }
}))
const TutorImage = styled(Box)(({ theme }) => ({
    margin: 1,
    // flexBasis: '35%',
    //borderRadius: CSS_PROPERTIES.radius10,
    backgroundColor: theme.palette.mode === 'light' ? colors.grey[300] : colorScheme(theme).primaryColor,
    flexBasis: 80,
    height: 80,
    marginTop: 10,
    borderRadius: '50%',
    justifySelf: 'center',
    [theme.breakpoints.down("sm")]: {
        flexBasis: 100,
        height: 100,
    }
}))
const TutorItemBody = styled(Box)(({ theme }) => ({
    flexBasis: '100%',
    //flex: 1,
    [theme.breakpoints.down("sm")]: {
        flexBasis: '100%'
    }

}))
const ItemFooter = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    minHeight: 60,
    margin: 10,
    borderRadius: CSS_PROPERTIES.radius10,
    backgroundColor: colorScheme(theme).secondaryColor,
    // boxShadow: `0 1px 3px 0px ${theme.palette.mode === 'light' ? '#ddd' : 'transparent'}`,
    [theme.breakpoints.down('sm')]: {
        width: '80%',
        margin: 'auto',
    }
}))





type Props = {
    tutor: User,
    mode: 'Send inquiry' | 'View inquiry' | ''
}





export default function TutorItem({ tutor, mode }: Props) {
    const dispatch = useAppDispatch()
    const user = useAppSelector((state) => state.AuthReducer.user)
    const inquiry = useAppSelector((state) => state.InquiryReducer.inquiry)
    const selectedTutor = useAppSelector((state) => state.TutorsReducer.tutor)
    const inquiryId = Randomstring.generate(17)

    function viewTutor() {
        if (mode == 'View inquiry') {

        } else {
            dispatch(inquiryActions.setInquiry({
                ...inquiry,
                _id: inquiryId,
                authorId: user._id ?? '',
                tutorId: tutor._id ?? ''
            }))
        }

        dispatch(inquiryActions.setInquiryNetworkStatus(''))
        dispatch(tutorsActions.setTutor(tutor))
    }

    return (
        <TutorContainer
            sx={{
                border: 1,
                transition: '0.3s all',
                borderColor: selectedTutor._id === tutor._id ? colors.teal[400] : 'transparent'
            }}>
            <TutorImage></TutorImage>
            <TutorItemBody>
                <Box sx={(theme) => ({
                    p: 1,
                    textAlign: 'center',
                    [theme.breakpoints.down('sm')]: {
                        width: '80%',
                        margin: 'auto',
                    }
                })}>
                    <Typography sx={{ my: .5, fontSize: 16, fontWeight: 600 }}>
                        {tutor.firstName} {tutor.lastName}
                    </Typography>
                    <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                        Primary qualifictions
                    </Typography>
                    <Typography sx={{ fontSize: 13, color: 'GrayText', fontWeight: 500 }}>
                        {tutor.tutorInfo?.qualifications} - {tutor.tutorInfo?.collage}
                    </Typography>
                    <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                        Subjects
                    </Typography>
                    <Typography sx={{ fontSize: 13, color: 'GrayText', fontWeight: 500 }}>
                        {tutor.tutorInfo?.subjects.map((subject, index) => (
                            <>
                                {subject}
                                {nomalizedText(tutor.tutorInfo?.subjects ?? [], index)}
                            </>
                        ))}
                    </Typography>
                    <Typography sx={{ mt: .5, fontSize: 14, fontWeight: 600 }}>
                        Profile
                    </Typography>
                    <Typography sx={{ fontSize: 13, color: 'GrayText', fontWeight: 500 }}>
                        {tutor.tutorInfo?.description}
                    </Typography>
                </Box>
                <ItemFooter>
                    <ButtonIcon sx={{
                        color: colors.teal[400],
                        border: 1,
                        borderColor: colors.teal[400],
                        backgroundColor: 'transparent',
                        transition: '0.3s all',
                        '&:hover': {
                            color: '#fff',
                            backgroundColor: colors.teal[400]
                        }
                    }}>
                        <FavoriteBorderOutlinedIcon fontSize='small' />
                    </ButtonIcon>
                    <StyledButton
                        onClick={viewTutor}
                        sx={{
                            px: 1,
                            flexBasis: '60%',
                            fontSize: 15,
                            color: colors.teal[400],
                            border: 1,
                            borderColor: colors.teal[400],
                            backgroundColor: 'transparent',
                            transition: '0.3s all',
                            '&:hover': {
                                color: '#fff',
                                backgroundColor: colors.teal[400]
                            }
                        }}>
                        {mode == 'View inquiry' ? (
                            <VisibilityOutlinedIcon fontSize='small' sx={{ mr: 1 }} />
                        ) : (
                            <AddCommentOutlinedIcon fontSize='small' sx={{ mr: 1 }} />
                        )}
                        {mode}
                    </StyledButton>
                </ItemFooter>
            </TutorItemBody>
        </TutorContainer>
    )
}