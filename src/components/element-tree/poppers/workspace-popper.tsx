import { Box, Menu as PopperMenu, MenuItem, styled, useTheme, colors, useMediaQuery } from '@mui/material'
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state'
import React from 'react'
import { ButtonIcon, StyledButton, StyledInput } from '../../../reusable/styles'
import { ElipsisText, ThemedText, colorScheme } from '../../../theme'
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import RadioButtonCheckedOutlinedIcon from '@mui/icons-material/RadioButtonCheckedOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import { useAppDispatch, useAppSelector, useElementAction } from '../../../../store/hooks'
import { elementsActions } from '../../../../reducers/elements-reducer'
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import { HiOutlineChevronDown } from "react-icons/hi2";
import { FaFolder, FaRegFolder } from "react-icons/fa";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Router, useRouter } from 'next/router'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { workspaceActions } from '../../../../reducers/workspace-reducer'

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


type Props = {

}

export default function WorkspacePopper({ }: Props) {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const _theme = useTheme()
    const isSidebarOpen = useAppSelector((state) => state.MainReducer.isSidebarOpen)
    const isMobile = useMediaQuery('(max-width:600px)')



    return (
        <Container>
            <PopupState variant='popper'>
                {(popupState) => (<>
                    <NavButton
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
                            <ElipsisText text='Workspaces' color={''} lineClamp={1} sx={{ textAlign: 'left', ml: 1.5, flex: 1 }} />
                        </>
                        ) : (<>
                            {isMobile && <FaRegFolder size={20} />}
                            <ElipsisText
                                text={isMobile ? 'Workspace' : 'RC'}
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
                        {[1, 2, 3, 4].map((board) => (
                            <MenuListItem key={board}>
                                {true ? <RadioButtonUncheckedOutlinedIcon /> : <RadioButtonCheckedOutlinedIcon />}
                                workspace name {board}
                            </MenuListItem>
                        ))}

                        <MenuFooter>
                            <MenuListItem
                                onClick={() => {
                                    dispatch(workspaceActions.setIsFormOpen(true))
                                    popupState.close()
                                }}
                                sx={{
                                    flex: 1, bgcolor: colors.teal[500],
                                    borderRadius: 5,
                                    color: '#fff', '&:hover': { bgcolor: colors.teal[500] }
                                }}>
                                <AddOutlinedIcon />
                                New Workspace
                            </MenuListItem>
                            <MenuListItem
                                onClick={() => { 
                                    router.push('/workspaces') 
                                  popupState.close() }}
                                sx={{ flex: 1, borderRadius: 10, '&:hover': { bgcolor: colorScheme(_theme).greyToTertiary, } }}>
                                View Workspaces
                            </MenuListItem>
                        </MenuFooter>
                    </PopperMenu>
                </>
                )}
            </PopupState>
        </Container>
    )
}