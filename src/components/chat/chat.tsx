
import * as React from 'react'
import { Textarea, styled as styledJoy } from '@mui/joy'
import { Box, ButtonBase, styled, TextField, useMediaQuery } from '@mui/material'

import Header from './header'
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
const ChatContainer = styled(Box)(({ theme }) => ({
  flex: 1,
}))
const ChatBody = styled(Box)(({ theme }) => ({
  height: 'calc(100vh - 146px)',
  backgroundColor: theme.palette.grey[100]
}))
const ChatFooter = styled(Box)(({ theme }) => ({
  height: 80,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.palette.grey[100],
  [theme.breakpoints.down('sm')]: {
    padding: '0 10px'
  }
}))
const FooterRightCol = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  transition: '0.3s all'
}))
const ChatTextFieldWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexBasis: '55%',
  alignItems: 'center',
  position: 'relative',
  borderRadius: 29,
  height: 50,
  transition: '0.3s all',
  transiformOrigin: 'left',
  backgroundColor: theme.palette.grey[300],
  [theme.breakpoints.down('sm')]: {
    flex: 1,
  }
}))

const ChatTextField = styled(Textarea)(({ theme }) => ({
  flex: 1,
  border: 0,
  outline: 'none!important',
  resize: 'none',
  borderRadius: 29,
  display: 'flex',
  paddingTop: 6,
  alignItems: 'center',
  transition: '0.3s all',
  transiformOrigin: 'left',
  backgroundColor: theme.palette.grey[300],
  '&:focus': {
    outline: 'none!important',
    border: 0,
  }
}))

const EmojiPickerButton = styled(ButtonBase)(({ theme }) => ({
  width: 40,
  height: 40,
  marginLeft: '5px',
  borderRadius: '50%',
  backgroundColor: theme.palette.grey[300]
}))
// const ButtonIcon = styled(ButtonBase)(({ theme }) => ({
//   width: 45,
//   height: 45,
//   margin: '0 5px',
//   borderRadius: '50%',
//   backgroundColor: theme.palette.grey[300]
// }))


type Props = {}

export default function Chat({ }: Props) {
  const isMobile = useMediaQuery('(max-width:600px)')
  console.log(isMobile)
  const [isFocused, setIsFocused] = React.useState<boolean>(false)
  return (
    <ChatContainer>
      <Header />
      <ChatBody>

      </ChatBody>
      <ChatFooter>
        <ChatTextFieldWrapper>
          <EmojiPickerButton>
            <SentimentSatisfiedAltIcon />
          </EmojiPickerButton>
          <ChatTextField
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder='Write your message'
          />
        </ChatTextFieldWrapper>
        {isMobile && isFocused ? (
          <ButtonIcon>
            <ChevronLeftOutlinedIcon />
          </ButtonIcon>
        ) : (
          <FooterRightCol>
            <ButtonIcon>
              <AddPhotoAlternateOutlinedIcon />
            </ButtonIcon>
            <ButtonIcon>
              <KeyboardVoiceOutlinedIcon />
            </ButtonIcon>
            <ButtonIcon>
              <MoreHorizOutlinedIcon />
            </ButtonIcon>
          </FooterRightCol>
        )
        }

      </ChatFooter >
    </ChatContainer >
  )
}