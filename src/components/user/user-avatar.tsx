import React, { useState, useCallback, useEffect } from 'react'
import { Avatar as AvatarIcon, Box, SxProps, Theme, Typography, useTheme } from "@mui/material"
import { ActiveIndicator, Avatar } from "../../reusable/styles"
import { Asset, UserAvatarAsset } from '../../reusable/interfaces'
import { useAppDispatch } from '../../../store/hooks'
import { fetchUserAvatarThunk } from '../../../reducers/auth-reducer/auth-thunks'



type Props = {
    userId?: string
    imageURL?: string
    changeImagePreview?: any
    avatarStyles: SxProps<Theme>
    changeProfileImage?: () => void
}

export default function UserAvatar({ userId, imageURL, changeImagePreview, avatarStyles, changeProfileImage }: Props) {
    const dispatch = useAppDispatch()
    const [userAvatar, setUserAvatar] = useState<UserAvatarAsset>({
        publicId: '',
        secureURL: '',
        initials: ''
    })

    const loadAvatarData = useCallback(async () => {
        if (!imageURL) {
            const { payload } = await dispatch(fetchUserAvatarThunk(userId??''))
            if (payload) {
                setUserAvatar(payload)
            }
        }
    }, [userId])


    useEffect(() => {
        loadAvatarData()
    }, [dispatch])






    return (
        <Box onClick={changeProfileImage}>
            {changeImagePreview ||userAvatar.secureURL ||  imageURL ? (<>
                <Avatar sx={avatarStyles}>
                    <img src={changeImagePreview || userAvatar.secureURL || imageURL} alt="" height='100%' width='100%'
                        style={{ borderRadius: '50%', objectFit: 'cover' }} />
                </Avatar>
            </>) : (
                <AvatarIcon
                    sx={avatarStyles}>
                </AvatarIcon>
            )}
        </Box>
    )
}