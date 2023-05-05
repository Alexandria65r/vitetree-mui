import { Box, Typography, colors, styled } from '@mui/material'
import React from 'react'
import { CSS_PROPERTIES } from '../reusable'
import { colorScheme } from '../theme'
import { ButtonIcon, StyledButton } from '../reusable/styles'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';


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
        flexBasis: '100%',
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
}))





type Props = {
    setOpen: (bool: boolean) => void
}

export default function TutorItem({ setOpen }: Props) {
    return (
        <TutorContainer>
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
                        Robert Ching'ambu
                    </Typography>
                    <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                        Primary qualifictions
                    </Typography>
                    <Typography sx={{ fontSize: 13, color: 'GrayText', fontWeight: 500 }}>
                        Degree in Math - unza
                    </Typography>
                    <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                        Subjects
                    </Typography>
                    <Typography sx={{ fontSize: 13, color: 'GrayText', fontWeight: 500 }}>
                        Math, Physics and Chemistry
                    </Typography>
                    <Typography sx={{ mt: .5, fontSize: 14, fontWeight: 600 }}>
                        Profile
                    </Typography>
                    <Typography sx={{ fontSize: 13, color: 'GrayText', fontWeight: 500 }}>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                        Vitae sunt consectetur provident
                        voluptates doloremque eligendi quis a facere labore nobis?
                    </Typography>
                </Box>
                <ItemFooter>
                    <ButtonIcon sx={{ color: colors.teal[400] }}>
                        <FavoriteBorderOutlinedIcon fontSize='small' />
                    </ButtonIcon>
                    <StyledButton
                        onClick={() => setOpen(true)}
                        sx={{ px: 1, flexBasis: '60%', fontSize: 15 }}>
                        <AddCommentOutlinedIcon fontSize='small' sx={{ mr: 1 }} />
                        Send Inquiry
                    </StyledButton>
                </ItemFooter>
            </TutorItemBody>
        </TutorContainer>
    )
}