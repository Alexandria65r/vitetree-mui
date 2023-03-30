
import * as React from 'react'
import { Box, styled } from '@mui/material'
import Header from './header'
import ChatFooter from './chat-footer'
import ChatThread from '../threads/chat-thread'
import { MessageThread } from '../../reusable/interfaces'
import classes from '../../styles/chat.module.css'
import ReusablePopper from '../reusable-popper'
import SelectedImageViewer from './selected-image-viewer/selected-image-viewer'

const ChatContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  flex: 1,
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

const MappedMessages = styled(Box)(({ theme }) => ({
  width: '73%',
  margin: '0 auto',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    margin: '0 auto 70px auto',
  }
}))

const FooterContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 80,
  position: 'absolute',
  bottom: 0,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#f4fcff',
  [theme.breakpoints.down('sm')]: {
    padding: '0 13px'
  },
  
}))

const ChatFooterInner = styled(Box)(({ theme }) =>({
  width: '60%',
  margin: 'auto',
  display: 'flex',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  }
}))


type Props = {}

export default function Chat({ }: Props) {
  const messages: MessageThread[] = [
    {_id:'1', text: "", name: 'Jep', type: 'audio', owner: true },
    {_id:'2', text: "Nissan GTR R35", name: 'Jep', type: 'image', owner: false },
    {_id:'3', text: "", name: 'Jep', type: 'image', owner: true },
    {_id:'4', text: "Listen to this", name: 'Jep', type: 'audio', owner: false },
    {_id:'5', text: "that's greart", name: 'Jep', type: 'text', owner: false },
    {_id:'6', text: 'Good aswell', name: 'Rober', type: 'text', owner: true },
    {_id:'7', text: 'Im fine, thanks en you?', type: 'text', name: 'Jep', owner: false },
    {_id:'8', text: 'how are you?', name: 'Rober', type: 'text', owner: true }
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
      <FooterContainer>
        <ChatFooterInner>
          <ChatFooter showAttatchFile={true} showMic={true} showOptionsIcon={true} />
        </ChatFooterInner>
      </FooterContainer>
      <ReusablePopper />
      <SelectedImageViewer />
    </ChatContainer >
  )
}