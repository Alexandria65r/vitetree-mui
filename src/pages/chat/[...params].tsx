import React from 'react'
import { Box, styled } from '@mui/material'
import SideBar from '../../components/side-bar'
import Chat from '../../components/chat/chat'


const ChatContainer = styled(Box)(({ theme }) => ({
    display: 'flex'
}))
 


type Props = {}

export default function ChatPage({ }: Props) {

    return (
        <Box>
            <ChatContainer>
                <SideBar />
                <Chat />
            </ChatContainer>
        </Box>
    )
}