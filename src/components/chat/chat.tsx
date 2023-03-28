
import * as React from 'react'
import { Box, styled } from '@mui/material'
import Header from './header'
import ChatFooter from './chat-footer'

const ChatContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  position: 'relative'
}))
const ChatBody = styled(Box)(({ theme }) => ({
  height: 'calc(100vh - 146px)',
  overflowY: 'scroll',
  marginTop: 66,
  padding: 10,
  backgroundColor: theme.palette.grey[100],
  [theme.breakpoints.down('sm')]:{
    height: 'calc(100vh - 51px)',
    marginTop: 50,
  }
}))



type Props = {}

export default function Chat({ }: Props) {

  return (
    <ChatContainer>
      <Header />
      <ChatBody>
        chat threads
      </ChatBody>
      <ChatFooter />
    </ChatContainer >
  )
}