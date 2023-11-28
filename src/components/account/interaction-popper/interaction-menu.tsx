import React from 'react'
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
import { ThemedText, colorScheme } from '../../../theme';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { Box, colors, useTheme } from '@mui/material';
import { updateUserThunk } from '../../../../reducers/auth-reducer/auth-thunks';
import { authActions } from '../../../../reducers/auth-reducer/auth-reducer';
import { mainActions } from '../../../../reducers/main-reducer';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { PopupState } from 'material-ui-popup-state/hooks';
import UserAvatar from '../../user/user-avatar';

type Props = {
    popupState?: PopupState
}

export default function IntractionMenu({ popupState }: Props) {
    const _theme = useTheme()
    const dispatch = useAppDispatch()
    const user = useAppSelector((state) => state.AuthReducer.user)

    function updateUserAccountInteraction(interaction: 'creator' | 'fan') {
        dispatch(authActions.setAuhtUser({ ...user, interaction }))
        dispatch(mainActions.setCardMenu({ component: '',title:'' }))
        dispatch(updateUserThunk({
            update: { interaction },
            networkSatusList: ['updating', 'updating-success', 'updating-error']
        }))
        popupState?.close()
    }
   

    return (
        <>
            {user.role === 'creator' ? (
                <Link href={`/page/${user?.pageInfo?.pageId}`}>
                    <MenuItem onClick={() => updateUserAccountInteraction('creator')
                    } sx={(theme) => ({ borderBottom: `1px solid ${colorScheme(theme).greyToTertiary}` })}>
                        <UserAvatar
                            imageURL={user.pageInfo?.photoURL}
                            avatarStyles={{ mr: 1,border:`1px solid ${colorScheme(_theme).grayToSecondaryColor}` }}
                        />
                        <Box sx={{ flex: 1 }}>
                            <ThemedText sx={{ fontWeight: 600, fontSize: 15 }}>{user?.pageInfo?.name}</ThemedText>
                            <ThemedText sx={{ fontSize: 13, color: 'GrayText' }}>Creator</ThemedText>
                        </Box>
                        {user.interaction === 'creator' ? <RadioButtonCheckedIcon sx={{ color: colors.teal[500] }} /> : <></>}
                    </MenuItem>
                </Link>
            ) : (<Link href={`/account-setup`}>
                <MenuItem
                    sx={(theme) => ({ borderBottom: `1px solid ${colorScheme(theme).greyToTertiary}` })}>
                    <Box sx={{ flex: 1 }}>
                        <ThemedText sx={{ fontWeight: 600, fontSize: 15 }}>Want to become a creator?</ThemedText>
                        <ThemedText sx={{ fontSize: 13, color: 'GrayText' }}>Create a Page.</ThemedText>
                    </Box>
                </MenuItem>
            </Link>)}
            <Link href={`/find-creators/q=nothing`}>
                <MenuItem onClick={() => updateUserAccountInteraction('fan')}>
                    <UserAvatar
                        imageURL={user.imageAsset?.secureURL}
                        avatarStyles={{ mr: 1,border:`1px solid ${colorScheme(_theme).grayToSecondaryColor}` }}
                    />
                    <Box sx={{ flex: 1 }}>
                        <ThemedText sx={{ fontWeight: 600, fontSize: 15, textTransform: 'capitalize' }}>{`${user.firstName} ${user.lastName}`}</ThemedText>
                        <ThemedText sx={{ fontSize: 13, color: 'GrayText' }}>Member</ThemedText>
                    </Box>
                    {user.interaction === 'fan' ? <RadioButtonCheckedIcon sx={{ color: colors.teal[500] }} /> : <></>}
                </MenuItem>
            </Link>
        </>
    )
}