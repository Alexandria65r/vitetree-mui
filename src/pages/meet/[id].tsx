import { Add, VideoCall } from '@mui/icons-material'
import { Box, styled } from '@mui/material'
import { NextRouter, useRouter } from 'next/router'
import React from 'react'
import Layout from '../../components/layout'
import { ButtonIcon } from '../../reusable/styles'
import KeyboardVoiceOutlinedIcon from '@mui/icons-material/KeyboardVoiceOutlined';
import VideocamOffOutlinedIcon from '@mui/icons-material/VideocamOffOutlined';
import MicOffOutlinedIcon from '@mui/icons-material/MicOffOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import CallEndOutlinedIcon from '@mui/icons-material/CallEndOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';

const Container = styled(Box)(({ theme }) => ({
    width: '90%',
    margin: 'auto',
    [theme.breakpoints.down("sm")]: {
        width: '100%',
        backgroundColor: theme.palette.grey[900]
    }
}))

const VideoContainer = styled(Box)(({ theme }) => ({
    height: 500,
    marginTop: 20,
    backgroundColor: theme.palette.grey[900],
    [theme.breakpoints.down("sm")]: {
        marginTop: 0,
        height: 'calc(100vh - 100px)',
    }
}))
const VideoOptions = styled(Box)(({ theme }) => ({
    marginTop: 20,
    display: 'flex',

    [theme.breakpoints.down("sm")]: {
        height: 100,
        marginTop: 0,
        //marginBottom: -3,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 29,
        borderTopRightRadius: 29,
        backgroundColor: theme.palette.grey[800]
    }
}))

type Props = {}

export default function Meet({ }: Props) {

    const router: NextRouter = useRouter()


    return (

        <Container>
            <VideoContainer></VideoContainer>
            <VideoOptions>
                <ButtonIcon>
                    <KeyboardVoiceOutlinedIcon />
                </ButtonIcon>
                <ButtonIcon>
                    <VideocamOutlinedIcon />
                </ButtonIcon>
                <ButtonIcon>
                    <PersonAddAltOutlinedIcon />
                </ButtonIcon>
                <ButtonIcon onClick={() => router.back()} color='danger' sx={(theme) => ({
                    backgroundColor: '#ff4949',
                    color: '#fff'
                })}>
                    <CallEndOutlinedIcon />
                </ButtonIcon>
            </VideoOptions>
        </Container>

    )
}