import { Box, styled } from '@mui/material'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import { ButtonIcon } from '../../../reusable/styles'
import CloseIcon from '@mui/icons-material/Close';
import { mainActions } from '../../../../reducers/main-reducer'
import AddIcon from '@mui/icons-material/Add';
import CropSharpIcon from '@mui/icons-material/CropSharp';
import ChatFooter from '../chat-footer'
import { colorScheme } from '../../../theme'


const FixedContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    width: 'calc(100vw - 5%)',
    position: 'fixed',
    bottom: 0,
    height: 'calc(100vh - 66px)',
    zIndex: 30,
    backgroundColor: colorScheme(theme).primaryColor,
    [theme.breakpoints.down("sm")]: {
        width: '100vw',
        height: 'calc(100vh - 0px)',
    }
}))
const Container = styled(Box)(({ theme }) => ({
    position: 'relative',
    width: '60%',
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
        width: '90%'
    }


}))
const ImageContainer = styled(Box)(({ theme }) => ({
    position: 'relative',
    height: 400,
    borderRadius:10,
    backgroundColor: colorScheme(theme).threadChildColor,
    [theme.breakpoints.down('sm')]: {
        height: 200
    }

}))

const OptionsContainer = styled(Box)(({ theme }) => ({
    position: 'relative',
    height: 50,
    marginTop: 20,
    display: 'flex',
    borderRadius:10,
    [theme.breakpoints.down('sm')]: {

    }

}))

const FooterContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    marginTop: 20,
    bottom: 0,

    alignItems: 'center',
    backgroundColor: colorScheme(theme).primaryColor,
    [theme.breakpoints.down('sm')]: {
        padding: '0'
    },

}))


const CloseButton = styled(ButtonIcon)(({ theme }) => ({
    position: 'absolute',
    top: 5,
    right: -100,
    zIndex: 60,
    [theme.breakpoints.down('sm')]: {
        right: 0,
        top: -115,
    },

}))


type Props = {}

export default function SelectedImageViewer({ }: Props) {
    const dispatch = useAppDispatch()
    const showSelectedImage = useAppSelector((state) => state.MainReducer.showSelectedImage)

    if (!showSelectedImage) return null


    return (
        <FixedContainer>
            <Container>
                <CloseButton onClick={() => dispatch(mainActions.setShowSelectedImage(false))}>
                    <CloseIcon />
                </CloseButton>

                <ImageContainer>

                </ImageContainer>

                <OptionsContainer>
                    <ButtonIcon>
                        <AddIcon />
                    </ButtonIcon>
                    <ButtonIcon>
                        <CropSharpIcon />
                    </ButtonIcon>
                </OptionsContainer>


                <FooterContainer>
                    <ChatFooter showSendIcon={true} />
                </FooterContainer>
            </Container>
        </FixedContainer>
    )
}