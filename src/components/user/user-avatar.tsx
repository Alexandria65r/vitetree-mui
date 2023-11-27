import React, { useState, useCallback, useEffect, useRef } from 'react'
import { Avatar as AvatarIcon, Box, SxProps, Theme, Typography, styled, useTheme } from "@mui/material"
import { ActiveIndicator, Avatar, ButtonIcon } from "../../reusable/styles"
import { Asset, UserAvatarAsset } from '../../reusable/interfaces'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { fetchUserAvatarThunk, updateUserThunk } from '../../../reducers/auth-reducer/auth-thunks'
import ImageIcon from '@mui/icons-material/Image';
import { colorScheme } from '../../theme'
import { createToastThunk, uploadFileThunk } from '../../../reducers/main-reducer/main-thunks'
import { updatePageThunk } from '../../../reducers/page-reducer/page-thunks'
import styles from './user-avatar.module.css'


type Props = {
    mode?: 'author' | 'read-only'
    userId?: string
    imageURL?: string
    changeImagePreview?: any
    avatarStyles: SxProps<Theme>
    changeProfileImage?: () => void
}


const BrowseImage = styled(ButtonIcon)(({ theme }) => ({
    position: 'absolute',
    zIndex: 200,
    bottom: -4,
    left: '50%',
    color: '#000',
    transform: 'translateX(87%)',
    backgroundColor: '#fff',
    boxShadow: `0 1px 3px 0 ${colorScheme(theme).shadowColor}`,
    '&:hover': {
        backgroundColor: '#fff',
    },
    [theme.breakpoints.down('sm')]: {
        width: 35,
        height: 35,
        bottom: -6,
        transform: 'translateX(60%)',
    }
}))

export default function UserAvatar({ userId, imageURL, changeImagePreview, avatarStyles, changeProfileImage, mode }: Props) {
    const dispatch = useAppDispatch()
    const page = useAppSelector((state) => state.PageReducer.page)
    const [userAvatar, setUserAvatar] = useState<UserAvatarAsset>({
        publicId: '',
        secureURL: '',
        initials: ''
    })

    const [base64, setBase64] = useState<string | ArrayBuffer | null>('')

    const loadAvatarData = useCallback(async () => {
        if (!imageURL) {
            const { payload } = await dispatch(fetchUserAvatarThunk(userId ?? ''))
            if (payload) {
                setUserAvatar(payload)
            }
        }
    }, [userId])


    useEffect(() => {
        loadAvatarData()
    }, [dispatch])

    const fileRef: any = useRef()

    function fileOnChange({ target: { files } }: any) {
        const reader = new FileReader()
        reader.onload = async () => {
            const base64 = reader.result
            setBase64(base64)
            const response = await dispatch(uploadFileThunk({
                base64,
                resource_type: 'image',
                preset: 'image_preset'
            }))

            if (response.payload.publicId) {
                page.imageAssets
                const { payload } = await dispatch(updatePageThunk({
                    imageAssets: {
                        ...page.imageAssets,
                        profile: response.payload
                    }
                }))

                if (payload) {
                    dispatch(createToastThunk('Profile image updated succesfully'))
                }
            }
        }
        reader.readAsDataURL(files[0])
    }


    return (
        <Box onClick={changeProfileImage} className={styles.avatar}>
            {changeImagePreview || base64 || userAvatar.secureURL || imageURL ? (
                <Box>
                    <Avatar sx={avatarStyles}>
                        <img src={changeImagePreview || base64 || userAvatar.secureURL || imageURL} alt="" height='100%' width='100%'
                            style={{ borderRadius: '50%', objectFit: 'cover' }}
                        />
                    {mode === 'author' && (
                        <BrowseImage className={styles.profileButton} onClick={() => fileRef.current.click()}>
                            <ImageIcon />
                        </BrowseImage>
                    )}
                    </Avatar>
                </Box>) : (
                <Box>
                    <AvatarIcon
                        sx={avatarStyles}>

                    {mode === 'author' && (
                        <BrowseImage className={styles.profileButton} onClick={() => fileRef.current.click()}>
                            <ImageIcon />
                        </BrowseImage>
                    )}
                    </AvatarIcon>
                </Box>
            )}
            <input type='file' ref={fileRef} hidden onChange={fileOnChange} />
        </Box>
    )
}