import { Box, Menu, SxProps, Theme, colors, styled, useMediaQuery, useTheme } from '@mui/material'
import classes from '../../../styles/reusable.module.css'
import React from 'react'
import { ThemedText, colorScheme } from '../../../theme';
import { ButtonIcon, StyledButton } from '../../../reusable/styles';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { HiOutlineChevronDown } from "react-icons/hi2";
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import IntractionMenu from './interaction-menu';
import { mainActions } from '../../../../reducers/main-reducer';
import UserAvatar from '../../user/user-avatar';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';

const NavButton = styled(StyledButton)(({ theme }) => ({
    justifyContent: 'start',
    fontSize: 16,
    marginBottom: 5,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    height: 55,
    color: theme.palette.mode === 'light' ? '#000' : colorScheme(theme).TextColor,
    backgroundColor: 'transparent',
    transition: '0.3s all',
    '&:hover': {
        backgroundColor: theme.palette.mode === 'light' ? colors.grey[200] : colorScheme(theme).secondaryColor,
    }
}))

const NavButtonText = styled(ThemedText)(({ theme }) => ({
    color: '#fff', textAlign: 'left', lineHeight: 1.2, fontSize: 16, fontWeight: 500
}))



type Props = {


}

function InteractionPopper({ }: Props) {
    const dispatch = useAppDispatch()
    const isMobile = useMediaQuery('(max-width:600px)')
    const user = useAppSelector((state) => state.AuthReducer.user)
    const isSidebarOpen = useAppSelector((state) => state.MainReducer.isSidebarOpen)

    const buttonStyles: SxProps<Theme> = {
        justifyContent: isSidebarOpen && !isMobile ? 'center' : 'flex-start',
        backgroundColor: colors.teal[400],
        color: '#fff',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        '&:hover': {
            backgroundColor: colors.teal[400]
        }
    }

    function openCardMenu() {
        dispatch(mainActions.setIsSideBarOpen(false))
        dispatch(mainActions.setCardMenu({ component: 'account-menu', title: 'Account' }))
    }
    const fullname = `${user.firstName} ${user.lastName}`


    const NavButtonValue = () => (
        <>
            <NavButtonText sx={{ fontWeight: 600 }}>
                {user.interaction === 'employer ' ? user.pageInfo?.name : fullname}
            </NavButtonText>
            {isSidebarOpen && !isMobile ? <HiOutlineChevronDown fontSize={20} /> :
             !isSidebarOpen && isMobile ? <HiOutlineChevronDown fontSize={20} /> : <></>}
        </>
    )

    const imageURL = user.interaction === 'employer ' ? user.pageInfo?.photoURL : user.imageAsset?.secureURL
    return (
        <PopupState variant='popper'>
            {(popupState) => (

                <>
                    {isMobile ? (
                        <NavButton
                            onClick={openCardMenu}
                            sx={buttonStyles}
                        >
                            <UserAvatar
                                imageURL={imageURL}
                                avatarStyles={{ width: 30, height: 30, mr: isSidebarOpen ? 1 : 0 }}
                            />
                            {isSidebarOpen && <NavButtonValue />}

                        </NavButton>
                    ) : (
                        <NavButton
                            {...bindTrigger(popupState)}
                            sx={buttonStyles}
                        >
                            <UserAvatar
                                imageURL={imageURL}
                                avatarStyles={{ width: 30, height: 30, mr: !isSidebarOpen ? 1 : 0 }}
                            />

                            {!isSidebarOpen && <NavButtonValue />}
                        </NavButton>
                    )}

                    <Menu {...bindMenu(popupState)} open={popupState.isOpen}
                        classes={{
                            paper: classes.InteractionPaper
                        }}
                        slotProps={{
                            paper: {
                                style: {
                                    width: '27ch'
                                }

                            }
                        }}>

                        <IntractionMenu popupState={popupState} />
                    </Menu>
                </>
            )}
        </PopupState>

    )
}




export default InteractionPopper