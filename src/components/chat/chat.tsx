
import * as React from 'react'
import { Box, styled } from '@mui/material'
import Header from './header'
import ChatFooter from './chat-footer'
import ChatThread from '../threads/chat-thread'
import { MessageThread } from '../../reusable/interfaces'
import classes from '../../styles/chat.module.css'

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
  backgroundColor: '#f4fcff',
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
  const messages:MessageThread[] = [
    { text: "",name:'Jep', type:'audio', owner: true },
    { text: "Nissan GTR R35",name:'Jep', type:'image', owner: false },
    { text: "",name:'Jep', type:'image', owner: true },
    { text: "Listen to this",name:'Jep', type:'audio', owner: false },
    { text: "that's greart",name:'Jep', type:'text', owner: false },
    { text: 'Good aswell',name:'Rober', type:'text', owner: true },
    { text: 'Im fine, thanks en you?', type:'text',name:'Jep', owner: false },
    { text: 'how are you?',name:'Rober', type:'text', owner: true }
  ]
  return (
    <ChatContainer>
      <Header />
      <ChatBody className={classes.ChatBody}>
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