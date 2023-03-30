import { Avatar, Box, styled, Typography } from '@mui/material'
import React from 'react'
import { MessageThread } from '../../reusable/interfaces'
import { ThreadAudio, ThreadHeader, ThreadImage, ThreadOption } from './thread-pieces'
import classes from '../../styles/thread.module.css'

export const ThreadContainer = styled(Box)(({ theme }) => ({
  flexBasis: '100%',
  flexWrap: 'wrap'

}))
const ThreadBody = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: 5,
  margin: '20px 0',
  borderRadius: 10,
  boxShadow: '0 1px 3px 0 #ccc',
  backgroundColor: '#fff',
}))


const ThreadText = styled(Typography)(({ theme }) => ({
  fontSize: 13
}))
const MessageTextWrap = styled(Box)(({ theme }) => ({
  width: 'inherit',
  padding: '5px 8px',
  marginTop: 2,
  borderRadius: 5,
  backgroundColor: theme.palette.grey[100]
}))

export const ChatAvatar = styled(Avatar)(({ theme }) => ({
  margin: '0 10px 0 0',
  color:theme.palette.grey[400],
  backgroundColor:'#fff',
  boxShadow:'0 1px 3px 0 #ccc'
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

  return (<ThreadContainer className={classes.ThreadContainer} sx={{
    display: !message.owner ? 'flex' : 'grid',
    gridTemplateColumns: '1fr 30px'
  }}>
    {!message.owner && <ChatAvatar></ChatAvatar>}
    <ThreadBody sx={{
      justifySelf: message.owner ? 'right' : 'left', margin: '20px 0',
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

