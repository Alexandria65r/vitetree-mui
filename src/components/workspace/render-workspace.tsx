import { Box, styled } from '@mui/material'
import React from 'react'
import { ThemedText } from '../../theme'
import { useSelectedWorkspace } from '../../../store/hooks'


const Header = styled(Box)(({ theme }) => ({
    display: 'flex',
    padding: 15,
    gap: 10,
    alignItems: 'center',
    [theme.breakpoints.up('xl')]: {

    }
}))


type Props = {}

export default function RenderWorkspace({ }: Props) {
    const workspace = useSelectedWorkspace()

    return (
        <Header>
            <ThemedText sx={{ flex: 1, fontSize: 18, textTransform: 'capitalize', fontWeight: 600 }}>
                {workspace.name} Workspace
            </ThemedText>
        </Header>
    )
}