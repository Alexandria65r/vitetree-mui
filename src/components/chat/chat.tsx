
import * as React from 'react'
import { Box, styled } from '@mui/material'
import Header from './header'
import ChatFooter from './chat-footer'
import ChatThread from './chat-thread'

const ChatContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  position: 'relative'
}))
const ChatBody = styled(Box)(({ theme }) => ({
  height: 'calc(100vh - 146px)',
  overflowY: 'auto',
  marginTop: 66,
  padding: 10,
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'flex-end',
  backgroundColor: theme.palette.grey[100],
  [theme.breakpoints.down('sm')]: {
    height: 'calc(100vh - 51px)',
    marginTop: 50,
  }
}))

const MappedMessages = styled(Box)(({theme}) => ({
  width: '73%',
  margin: '0 auto',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    margin: '0 auto 70px auto',
  }
}))



type Props = {}

export default function Chat({ }: Props) {
  const messages = [
    { body: "that's greart",name:'Jep', owner: false },
    { body: 'Good aswell',name:'Rober', owner: true },
    { body: 'Im fine, thanks en you?',name:'Jep', owner: false },
    { body: 'how are you?',name:'Rober', owner: true }
  ]
  return (
    <ChatContainer>
      <Header />
      <ChatBody>
        <MappedMessages>
          {messages.reverse().map((message, index) => (
            <ChatThread key={index} message={message} />
          ))}

        </MappedMessages>
      </ChatBody>
      <ChatFooter />
    </ChatContainer >
  )
}