import React from 'react'
import { Box, ButtonBase, styled, useMediaQuery } from '@mui/material'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import MicIcon from '@mui/icons-material/Mic';
import KeyboardVoiceOutlinedIcon from '@mui/icons-material/KeyboardVoiceOutlined';
import { BiImageAdd } from 'react-icons/bi'
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import { ImAttachment } from 'react-icons/im'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import { ButtonIcon } from '../../reusable/styles';
import { Textarea } from '@mui/joy';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

const Container = styled(Box)(({ theme }) => ({
    width: '100%',
    height: 80,
    display: 'flex',
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.grey[100],
    [theme.breakpoints.down('sm')]: {
        padding: '0 13px'
    },

}))

const ChatTextFieldWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexBasis: '55%',
    alignItems: 'center',
    position: 'relative',
    borderRadius: 29,
    minHeight: 50,
    transition: '0.3s all',
    transformOrigin: 'left',
    backgroundColor: theme.palette.grey[300],
    [theme.breakpoints.down('sm')]: {
        flex: 1,
        width: '5%',
    },
}))

const FooterRightCol = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    transition: '0.3s all',
}))

const ChatTextField = styled(Textarea)(({ theme }) => ({
    flex: 1,
    border: 0,
    outline: 'none!important',
    resize: 'none',
    borderRadius: 29,
    paddingTop: 6,
    alignItems: 'center',
    transition: '0.3s all',
    transformOrigin: 'left',
    backgroundColor: theme.palette.grey[300],

}))

const EmojiPickerButton = styled(ButtonBase)(({ theme }) => ({
    width: 30,
    height: 30,
    margin: '5px',
    borderRadius: '50%',
    backgroundColor: theme.palette.grey[300]
}))
const IconButton = styled(ButtonIcon)(({ theme }) => ({
    transition: '0.3s all',
}))
type Props = {}

export default function ChatFooter({ }: Props) {
    const isMobile = useMediaQuery('(max-width:600px)')
    const is360 = useMediaQuery('(max-width:375px)')
    const isXs = useMediaQuery('(max-width:320px)')
    console.log(isMobile)
    const [isFocused, setIsFocused] = React.useState<boolean>(false)
    const [typedText, setTypedText] = React.useState<string>("")
    return (
        <Container>
            <ChatTextFieldWrapper sx={{}}>
                <EmojiPickerButton>
                    <SentimentSatisfiedAltIcon />
                </EmojiPickerButton>
                <ChatTextField
                   // color='success'
                    onChange={({ target }) => setTypedText(target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={!isFocused && isMobile ? 'Message...' : 'Write your message'}
                />

            </ChatTextFieldWrapper>

            {typedText && (
                <ButtonIcon sx={(theme) => ({
                    color: typedText ? theme.palette.primary.light : ''
                })}>
                    <SendOutlinedIcon />
                </ButtonIcon>
            )}

            {isMobile && isFocused ? (
                <ButtonIcon>
                    <ChevronLeftOutlinedIcon />
                </ButtonIcon>
            ) : (
                <FooterRightCol>

                    <IconButton>
                        <AddPhotoAlternateOutlinedIcon />
                    </IconButton>


                    {!isXs ? (
                        <IconButton>
                            <KeyboardVoiceOutlinedIcon />
                        </IconButton>
                    ) : <></>}

                    < IconButton >
                        <MoreHorizOutlinedIcon />
                    </IconButton>

                </FooterRightCol>
            )
            }

        </Container >
    )
}