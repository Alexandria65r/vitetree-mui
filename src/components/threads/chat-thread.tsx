import { Avatar, Box, styled, Typography } from '@mui/material'
import React from 'react'
import { MessageThread } from '../../reusable/interfaces'
import { ThreadAudio, ThreadHeader, ThreadImage, ThreadOption } from './thread-pieces'
import classes from '../../styles/thread.module.css'
import * as types from '../../reusable'
import { colorScheme } from '../../theme'
export const ThreadContainer = styled(Box)(({ theme }) => ({
  flexBasis: '100%',
  flexWrap: 'wrap'

}))
const ThreadBody = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: 5,
  margin: '20px 0',
  borderRadius: 10,
  boxShadow: `0 1px 3px 0 ${colorScheme(theme).chatBoarderColor}`,
  backgroundColor: colorScheme(theme).primaryColor,
  [theme.breakpoints.down("sm")]: {
    margin: '20px 0 5px 0',
  }
}))


const ThreadText = styled(Typography)(({ theme }) => ({
  fontSize: 15,
  color: colorScheme(theme).TextColor
}))
const MessageTextWrap = styled(Box)(({ theme }) => ({
  width: 'inherit',
  padding: '2px 8px',
  marginTop: 2,
  borderRadius: 5,
  backgroundColor: colorScheme(theme).chatPrimaryColor
}))

export const ChatAvatar = styled(Avatar)(({ theme }) => ({
  margin: '0 10px 0 0',
  color: theme.palette.grey[400],
  backgroundColor: colorScheme(theme).chatPrimaryColor,
  boxShadow: `0 1px 3px 0 ${colorScheme(theme).chatBoarderColor}`,
  [theme.breakpoints.down("sm")]: {
    display: 'none'
  }
}))


type Props = {
  message: MessageThread
}



type ThreadTypeProps = {
  message: MessageThread
}

function RenderThreadType({ message }: ThreadTypeProps) {
  switch (message.type) {
    case 'image':
      return <ThreadImage message={message} />
    case 'audio':
      return <ThreadAudio message={message} />

    default:
      return <></>
  }
}


export default function ChatThread({ message }: Props) {
  const { ReactToMessage, MessageMoreOptions } = types.REUSABLE_POPPER
  const popperId = !message.owner ? `${message._id}${ReactToMessage.popperId}` : `${message._id}${MessageMoreOptions.popperId}`
  return (<ThreadContainer className={classes.ThreadContainer}
    sx={(theme) => ({
      display: !message.owner ? 'flex' : 'grid',
      gridTemplateColumns: '1fr 30px',
      [theme.breakpoints.down("sm")]: {
        gridTemplateColumns: '1fr',
      }
    })}>
    {!message.owner && <ChatAvatar></ChatAvatar>}
    <ThreadBody id={popperId} sx={{
      justifySelf: message.owner ? 'right' : 'left',
      borderTopLeftRadius: !message.owner ? 0 : 10,
      borderBottomRightRadius: message.owner ? 0 : 10,
    }}>
      <ThreadHeader message={message} />
      <RenderThreadType message={message} />

      {message.text && (
        <MessageTextWrap sx={{
          justifySelf: message.owner ? 'right' : 'left',
          borderTopLeftRadius: !message.owner ? 0 : 10,
          borderBottomRightRadius: message.owner ? 0 : 10,
        }}>
          <ThreadText> {message.text}</ThreadText>
        </MessageTextWrap>
      )}
    </ThreadBody>
    <ThreadOption message={message} />
  </ThreadContainer>
  )
}

