import React from 'react'
import RenderBoardsAndWorkSpaces from '../components/render-boards-and-workspaces'
import Layout from '../components/layout'
import { ThemedText } from '../theme'
import { Box, styled } from '@mui/material'

const Container = styled(Box)(({ theme }) => ({
    padding: 15,
    [theme.breakpoints.up('xl')]: {
        width: '80%',
        margin: 'auto'
    }
}))


type Props = {}

export default function Workspaces({ }: Props) {
    return (<Layout>
        <Container>
            <ThemedText sx={{fontSize:18, mb:2, fontWeight:600}}>Workspaces</ThemedText>
            <RenderBoardsAndWorkSpaces />
        </Container>
    </Layout>
    )
}