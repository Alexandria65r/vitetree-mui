import React from 'react'
import { Box, styled } from '@mui/material'
import Header from '../../components/chat/header'
import { useAppSelector } from '../../../store/hooks'
import SideBar from '../../components/chat/side-bar'
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