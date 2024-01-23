import React, { useContext } from 'react'
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
import { ColorModeContext, ThemedText, colorScheme } from '../../../theme';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { Box, colors, useTheme } from '@mui/material';
import { updateUserThunk } from '../../../../reducers/auth-reducer/auth-thunks';
import { authActions } from '../../../../reducers/auth-reducer/auth-reducer';
import { mainActions } from '../../../../reducers/main-reducer';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { PopupState } from 'material-ui-popup-state/hooks';
import UserAvatar from '../../user/user-avatar';
import { Role } from '../../../reusable/interfaces';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { getAuth, signOut } from 'firebase/auth'
import Cookies from 'js-cookie'
import * as types from '../../../reusable/index'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';


type Props = {
    popupState?: PopupState
}

export default function IntractionMenu({ popupState }: Props) {
    const _theme = useTheme()
    const dispatch = useAppDispatch()
    const user = useAppSelector((state) => state.AuthReducer.user)
    const { toggleColorMode } = useContext(ColorModeContext)
    function updateUserAccountInteraction(interaction: Role) {
        dispatch(authActions.setAuhtUser({ ...user, interaction }))
        dispatch(mainActions.setCardMenu({ component: '', title: '' }))
        dispatch(updateUserThunk({
            update: { interaction },
            networkSatusList: ['updating', 'updating-success', 'updating-error']
        }))
        popupState?.close()
    }



    async function logout() {
        const auth = getAuth()
        try {
            await signOut(auth)
            Cookies.remove(types.PUSHMEPAL_AUTH_TOKEN)
            window.location.href = '/'
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <>

            <Link href={`/account-setup`}>
                <MenuItem
                    sx={(theme) => ({ borderBottom: `1px solid ${colorScheme(theme).greyToTertiary}` })}>
                    <Box sx={{ flex: 1 }}>
                        <ThemedText sx={{ fontWeight: 600, fontSize: 15, color: colors.amber[500] }}>Upgrade Plan</ThemedText>
                        <ThemedText sx={{ fontSize: 13, color: 'GrayText' }}>Current ( <b>Free</b> ).</ThemedText>
                    </Box>
                </MenuItem>
            </Link>
            <Link href={`/account/${user._id}`}>
                <MenuItem onClick={() => updateUserAccountInteraction('job seeker')}>
                    <UserAvatar
                        imageURL={user.imageAsset?.secureURL}
                        avatarStyles={{ mr: 1, border: `1px solid ${colorScheme(_theme).grayToSecondaryColor}` }}
                    />
                    <Box sx={{ flex: 1 }}>
                        <ThemedText sx={{ fontWeight: 600, fontSize: 15, textTransform: 'capitalize' }}>{`${user.firstName} ${user.lastName}`}</ThemedText>
                        <ThemedText sx={{ fontSize: 13, color: 'GrayText' }}>Member</ThemedText>
                    </Box>
                    {/* {user.interaction === 'job seeker' ? <RadioButtonCheckedIcon sx={{ color: colors.teal[500] }} /> : <></>} */}
                </MenuItem>
            </Link>

            <MenuItem
                onClick={toggleColorMode}
                sx={(theme) => ({ height: 45, borderTop: `1px solid ${colorScheme(theme).greyToTertiary}` })}>
                {_theme.palette.mode === 'light' ? <DarkModeOutlinedIcon sx={{mr:1}} /> : <LightModeOutlinedIcon sx={{mr:1}} />}
                <ThemedText sx={{  fontWeight: 600, fontSize: 14, textTransform: 'capitalize' }}>
                    Switch to {_theme.palette.mode === 'light' ? 'Dark' : 'Light'} Mode
                </ThemedText>

            </MenuItem>

            <MenuItem
                sx={(theme) => ({ height: 45, borderTop: `1px solid ${colorScheme(theme).greyToTertiary}` })}>
                <LogoutOutlinedIcon sx={{ mr: 1 }} />
                <Box sx={{ flex: 1 }}>
                    <ThemedText sx={{ fontWeight: 600, fontSize: 15 }}>Log Out</ThemedText>
                </Box>
            </MenuItem>

        </>
    )
}