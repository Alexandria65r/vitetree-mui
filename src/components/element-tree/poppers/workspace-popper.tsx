import { Box, Menu as PopperMenu, MenuItem, styled, useTheme, colors, useMediaQuery } from '@mui/material'
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state'
import React, { useCallback, useEffect } from 'react'
import { ButtonIcon, StyledButton } from '../../../reusable/styles'
import { ElipsisText, ThemedText, colorScheme } from '../../../theme'
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import RadioButtonCheckedOutlinedIcon from '@mui/icons-material/RadioButtonCheckedOutlined';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import { HiOutlineChevronDown } from "react-icons/hi2";
import { FaRegFolder } from "react-icons/fa";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useRouter } from 'next/router'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { workspaceActions } from '../../../../reducers/workspace-reducer'
import { fetchWorkspacesThunk, selectWorkspaceThunk } from '../../../../reducers/workspace-reducer/workspace-thunks'
import { getNameInitials } from '../../../reusable/helpers'
import { boardActions } from '../../../../reducers/boards-reducer'
import { BoardSchema } from '../../../models/board'
import { listGroupActions } from '../../../../reducers/list-group-reducer'
import { elementsActions } from '../../../../reducers/elements-reducer'

const Container = styled(Box)(() => ({
    display: 'flex'
}))




const MenuListItem = styled(MenuItem)(() => ({
    fontSize: 14,
    gap: 10
}))

const NavButton = styled(StyledButton)(({ theme }) => ({
    justifyContent: 'flex-start',
    fontSize: 16,
    flexBasis: '100%',
    marginBottom: 5,
    borderRadius: 29,
    height: 45,
    color: theme.palette.mode === 'light' ? '#000' : colorScheme(theme).TextColor,
    backgroundColor: colorScheme(theme).lightToprimaryColor,
    transition: '0.3s all',
    '&:hover': {
        backgroundColor: theme.palette.mode === 'light' ? colors.grey[200] : colorScheme(theme).secondaryColor,
    }
}))

const MenuHead = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '6px 14px',
    borderBottom: `1px solid ${colorScheme(theme).greyToTertiary}`
}))
const MenuFooter = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: 10,
    padding: 6,
    marginTop: 4,
    borderTop: `1px solid ${colorScheme(theme).greyToTertiary}`
}))
const MenuButton = styled(StyledButton)(({ theme }) => ({
    fontSize: 14,
    height: 35,
    whiteSpace: 'nowrap'
}))


type Props = {

}

export default function WorkspacePopper({ }: Props) {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const _theme = useTheme()
    const isSidebarOpen = useAppSelector((state) => state.MainReducer.isSidebarOpen)
    const workspaces = useAppSelector((state) => state.WorkspaceReducer.workspaces)
    const selected_workspace = useAppSelector((state) => state.WorkspaceReducer.selectedWorkspace)
    const isMobile = useMediaQuery('(max-width:600px)')

    if (router.pathname !== '/w/[...params]') return null

    return (
        <Container>
            <PopupState variant='popper'>
                {(popupState) => (<>
                    <NavButton
                        key={selected_workspace._id}
                        {...bindTrigger(popupState)}
                        sx={(theme) => ({
                            flex: 1,
                            borderRadius: isSidebarOpen ? 2 : 0,
                            margin: isSidebarOpen ? .5 : 0,
                            color: isSidebarOpen ? '#fff' : '',
                            backgroundColor: isSidebarOpen ? colors.teal[500] : '',
                            justifyContent: isSidebarOpen && !isMobile ? 'center' : 'flex-start',
                            borderBottom: `1px solid ${!isSidebarOpen ? colorScheme(theme).greyToTertiary : 'transparent'}`,
                            '&:hover': {
                                backgroundColor: isSidebarOpen ? colors.teal[500] : '',
                            }
                        })}
                    >
                        {!isSidebarOpen ? (<>
                            <FaRegFolder size={20} />
                            <ElipsisText text={selected_workspace?.name ?? 'Workspaces'} color={''} lineClamp={1} sx={{ fontWeight: 500, textAlign: 'left', ml: 1.5, flex: 1 }} />
                        </>
                        ) : (<>
                            {isMobile && <FaRegFolder size={20} />}
                            <ElipsisText
                                text={isMobile ? selected_workspace?.name ?? 'Workspace' : getNameInitials(selected_workspace?.name)}
                                color={'#fff'} lineClamp={1}
                                sx={{
                                    flex: 1, textAlign: isMobile ? 'left' : 'center',
                                    ml: isMobile ? 1.5 : 0, color: '#fff', fontWeight: 600
                                }} />
                        </>)}
                        <HiOutlineChevronDown size={20} />
                    </NavButton>




                    <PopperMenu {...bindMenu(popupState)}
                        transformOrigin={{
                            horizontal: 'left',
                            vertical: 'top'
                        }}
                        anchorOrigin={{
                            horizontal: 'center',
                            vertical: 'bottom'
                        }}

                        slotProps={{
                            paper: {
                                style: {
                                    borderRadius: 10
                                }
                            }
                        }}
                    >

                        <MenuHead>
                            <ThemedText sx={{ flex: 1, fontSize: 16, fontWeight: 600 }}>Workspaces</ThemedText>
                            <ButtonIcon sx={{ width: 40, height: 40, mr: -.5 }}>
                                <SearchOutlinedIcon />
                            </ButtonIcon>
                        </MenuHead>
                        {workspaces.map((workspace, index) => (
                            <MenuListItem key={`${workspace?._id}-index`}
                                onClick={() => {
                                    dispatch(selectWorkspaceThunk(workspace))
                                    console.log(workspace)
                                    popupState.close()
                                }}
                            >
                                {workspace?.name === selected_workspace?.name ? < RadioButtonCheckedOutlinedIcon sx={{ color: colors.teal[500] }} /> : <RadioButtonUncheckedOutlinedIcon />}
                                {workspace?.name}
                            </MenuListItem>
                        ))}

                        <MenuFooter>
                            <MenuButton
                                onClick={() => {
                                    dispatch(workspaceActions.setIsFormOpen(true))
                                    popupState.close()
                                }}
                                sx={{
                                    flex: 1,
                                    color: '#fff',
                                }}>
                                <AddOutlinedIcon />
                                New Workspace
                            </MenuButton>
                            <MenuButton
                                onClick={() => {
                                    router.push('/workspaces')
                                    popupState.close()
                                }}
                                sx={{
                                    flex: 1,
                                    color: colorScheme(_theme).TextColor,
                                    bgcolor: colorScheme(_theme).greyToTertiary,
                                    '&:hover': { bgcolor: colorScheme(_theme).greyToTertiary, }
                                }}>
                                View Workspaces
                            </MenuButton>
                        </MenuFooter>
                    </PopperMenu>
                </>
                )}
            </PopupState>
        </Container>
    )
}