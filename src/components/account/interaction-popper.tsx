import { Box, Menu, Popper, SxProps, Theme, colors, styled, useMediaQuery, useTheme } from '@mui/material'
import classes from '../../styles/reusable.module.css'
import React, { useState } from 'react'
import { ThemedText, colorScheme } from '../../theme';
import { StyledButton } from '../../reusable/styles';
import { useAppSelector } from '../../../store/hooks';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu, bindPopover } from 'material-ui-popup-state';
import Link from 'next/link';


const NavButton = styled(StyledButton)(({ theme }) => ({
    justifyContent: 'flex-start',
    fontSize: 16,
    flexBasis: '100%',
    marginBottom: 5,
    borderRadius: 29,
    height: 45,
    color: theme.palette.mode === 'light' ? '#000' : colorScheme(theme).TextColor,
    backgroundColor: 'transparent',
    transition: '0.3s all',
    '&:hover': {
        backgroundColor: theme.palette.mode === 'light' ? colors.grey[200] : colorScheme(theme).secondaryColor,
    }
}))

// const Menu = styled(Box)(({ theme }) => ({
//     width: '100%',
//     padding: 10,
//     borderRadius: 10,
//     backgroundColor: colorScheme(theme).grayToSecondaryColor
// }))


type Props = {


}

function InteractionPopper({ }: Props) {
    const isMobile = useMediaQuery('(max-width:600px)')
    const _theme = useTheme()
    const user = useAppSelector((state) => state.AuthReducer.user)
    const isSidebarOpen = useAppSelector((state) => state.MainReducer.isSidebarOpen)
    const page = useAppSelector((state) => state.PageReducer.page)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl);


    function togglePopper(event: React.MouseEvent<HTMLButtonElement>) {
        setAnchorEl(anchorEl ? null : event.currentTarget)
    }


    const buttonStyles: SxProps<Theme> = {
        width: '100%',
        justifyContent: isSidebarOpen && !isMobile ? 'center' : 'flex-start',
        backgroundColor: colors.teal[400],
        color: '#fff',
        '&:hover': {
            backgroundColor: colors.teal[400]
        }
    }



    return (
        <PopupState variant='popper'>
            {(popupState) => (

                <>
                    <NavButton
                        {...bindTrigger(popupState)}
                        sx={buttonStyles}
                    >
                        <AccountCircleOutlinedIcon sx={{ mr: isSidebarOpen && !isMobile ? 0 : 1, fontSize: 28 }} />
                        Profile
                    </NavButton>
                    <Menu {...bindMenu(popupState)} open={popupState.isOpen}
                        classes={{
                            paper: classes.InteractionPaper
                        }}
                        PaperProps={{
                            style: {
                                width: '27ch'
                            }
                        }}>
                        <Link href={`/page/${user.pageId}`}>
                            <MenuItem sx={{ display: 'block' }}>
                                <Box>Page Name</Box>
                                <ThemedText sx={{ fontSize: 13, color: 'GrayText' }}>Creator</ThemedText>
                            </MenuItem>
                        </Link>
                        <Link href={`/find-creators/q=nothing`}>
                            <MenuItem sx={{ display: 'block' }}>
                                <ThemedText>{`${user.firstName} ${user.lastName}`}</ThemedText>
                                <ThemedText sx={{ fontSize: 13, color: 'GrayText' }}>Member</ThemedText>
                            </MenuItem>
                        </Link>
                    </Menu>
                </>
            )}
        </PopupState>

    )
}




export default InteractionPopper