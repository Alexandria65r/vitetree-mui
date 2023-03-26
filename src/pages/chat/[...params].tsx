import React from 'react'
import { Box, styled } from '@mui/material'
import Header from '../../components/chat/header'
import { useAppSelector } from '../../../store/hooks'
import SideBar from '../../components/chat/side-bar'
import Chat from '../../components/chat/chat'


const ChatContainer = styled(Box)(({ theme }) => ({
    display: 'flex'
}))

const ChatBody = styled(Box)(({ theme }) => ({
    flex: 1,
    height: 'calc(100vh - 66px)',
}))

type Props = {}

export default function ChatPage({ }: Props) {

    return (
        <Box>
            <Header />
            <ChatContainer>
                <SideBar />
                <ChatBody>
                    <Chat/>
                </ChatBody>
            </ChatContainer>
        </Box>
    )
}