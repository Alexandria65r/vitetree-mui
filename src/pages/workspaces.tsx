import React from 'react'
import RenderBoardsAndWorkSpaces from '../components/render-boards-and-workspaces'
import Layout from '../components/layout'
import { ThemedText, colorScheme } from '../theme'
import { Box, styled, useTheme } from '@mui/material'
import { ButtonIcon, StyledButton } from '../reusable/styles'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { workspaceActions } from '../../reducers/workspace-reducer'


const Container = styled(Box)(({ theme }) => ({
    padding: 15,
    [theme.breakpoints.up('xl')]: {
        width: '80%',
        margin: 'auto'
    }
}))
const Head = styled(Box)(({ theme }) => ({
    display: 'flex',
    padding: 15,
    gap:10,
    alignItems: 'center',
    [theme.breakpoints.up('xl')]: {

    }
}))


type Props = {}

export default function Workspaces({ }: Props) {
    const dispatch = useAppDispatch()
    const _theme = useTheme()
    const workspaces = useAppSelector((state)=>state.WorkspaceReducer.workspaces)
    return (<Layout>
        <Container>
            <Head>
                <ThemedText sx={{ flex: 1, fontSize: 18, fontWeight: 600 }}>Workspaces</ThemedText>
                <StyledButton onClick={() => dispatch(workspaceActions.setIsFormOpen(true))}
                    sx={{ fontSize: 14 }}>
                    <AddOutlinedIcon />
                    Create
                </StyledButton>
                <ButtonIcon
                    sx={{ backgroundColor: colorScheme(_theme).grayToSecondaryColor }}>
                    <SearchOutlinedIcon />
                </ButtonIcon>
            </Head>
            <RenderBoardsAndWorkSpaces workspaces={workspaces} />
        </Container>
    </Layout>
    )
}