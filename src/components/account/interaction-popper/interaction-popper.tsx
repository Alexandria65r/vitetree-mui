import { Box, Menu, SxProps, Theme, colors, styled, useMediaQuery, useTheme } from '@mui/material'
import classes from '../../../styles/reusable.module.css'
import React from 'react'
import { ThemedText, colorScheme } from '../../../theme';
import { StyledButton } from '../../../reusable/styles';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import IntractionMenu from './interaction-menu';
import { mainActions } from '../../../../reducers/main-reducer';
import UserAvatar from '../../user/user-avatar';


const NavButton = styled(StyledButton)(({ theme }) => ({
    justifyContent: 'start',
    fontSize: 16,
    flexBasis: '100%',
    marginBottom: 5,
    borderRadius: 29,
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
        width: '100%',
        justifyContent: isSidebarOpen && !isMobile ? 'center' : 'flex-start',
        backgroundColor: colors.teal[400],
        color: '#fff',
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
        <Box>
            <NavButtonText sx={{ fontWeight: 600 }}>
                {user.interaction === 'creator' ? user.pageInfo?.name : fullname}
            </NavButtonText>
            <NavButtonText sx={{ fontSize: 13 }}>
                {user.interaction === 'creator' ? 'creator' : 'Member'}
            </NavButtonText>
        </Box>
    )

    const imageURL = user.interaction === 'creator' ? user.pageInfo?.photoURL : user.imageAsset?.secureURL
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
                                avatarStyles={{ mr: 1 }}
                            />
                            <NavButtonValue />
                        </NavButton>
                    ) : (
                        <NavButton
                            {...bindTrigger(popupState)}
                            sx={buttonStyles}
                        >
                            <UserAvatar
                                imageURL={imageURL}
                                avatarStyles={{ mr: 1 }}
                            />

                            {!isSidebarOpen && <NavButtonValue />}
                        </NavButton>
                    )}

                    <Menu {...bindMenu(popupState)} open={popupState.isOpen}
                        classes={{
                            paper: classes.InteractionPaper
                        }}
                        PaperProps={{
                            style: {
                                width: '27ch'
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