import { Box, SxProps, Theme, styled, useTheme } from '@mui/material'
import React, { useRef, useState } from 'react'
import { colorScheme } from '../../theme'
import UserAvatar from '../user/user-avatar'
import { StyledButton } from '../../reusable/styles'
import ImageIcon from '@mui/icons-material/Image';
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { createToastThunk, uploadFileThunk } from '../../../reducers/main-reducer/main-thunks'
import { updatePageThunk } from '../../../reducers/page-reducer/page-thunks'
import styles from './banner.module.css'

const Container = styled(Box)(({ theme }) => ({
    position: 'relative', height: '100%', marginBottom: '65px',
    [theme.breakpoints.down('sm')]: {
        height: 160,
        margin: 10,
    },
}))
const BannerWrapper = styled(Box)(({ theme }) => ({
    height: 260,
    borderRadius: 10,
    backgroundColor: colorScheme(theme).grayToSecondaryColor,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    border: `1px solid ${colorScheme(theme).grayToSecondaryColor}`,
    [theme.breakpoints.down('sm')]: {
        height: 130,
        margin: 5,
    },
}))
const SetCoverButton = styled(StyledButton)(({ theme }) => ({
    position: 'absolute',
    left: '50%',
    top: '50%',
    fontSize: 14,
    padding: '0 15px',
    transform: 'translate(-50%,-50%)',
    borderRadius: 25,
    backgroundColor: '#00000054',
    fontWeight: 600,
    [theme.breakpoints.down('sm')]: {
        transform: 'translate(-50%,-80%)',
    },
}))

type Props = {
    mode?: 'author' | 'read-only'
}

export default function Banner({ mode }: Props) {
    const _theme = useTheme()
    const dispatch = useAppDispatch()
    const page = useAppSelector((state) => state.PageReducer.page)


    const [base64, setBase64] = useState<string | ArrayBuffer | null>('')
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
                    pageId: page.pageId,
                    target: 'other',
                    update: {
                        imageAssets: {
                            ...page.imageAssets,
                            background: response.payload
                        }

                    }
                }))

                if (payload) {
                    dispatch(createToastThunk('Cover image updated succesfully'))
                }
            }
        }
        reader.readAsDataURL(files[0])
    }




    return (
        <Container>
            <BannerWrapper
                className={styles.container}
                sx={{ backgroundImage: `url(${base64 || page.imageAssets.background.secureURL})` }}>
                {mode === 'author' && (
                    <SetCoverButton className={styles.coverButton} onClick={() => fileRef?.current?.click()}>
                        <ImageIcon />
                        Set cover
                    </SetCoverButton>
                )}

            </BannerWrapper>

            <UserAvatar imageURL={page.imageAssets.profile.secureURL} mode={mode} avatarStyles={avatarStyles} />
            <input type='file' ref={fileRef} hidden onChange={fileOnChange} />
        </Container>
    )
}


const avatarStyles: SxProps<Theme> = (_theme) => ({
    height: 180, width: 180,
    position: 'absolute',
    left: '18%',
    bottom: '-248px',
    border: `1px solid ${colorScheme(_theme).grayToSecondaryColor}`,
    [_theme.breakpoints.down('sm')]: {
        left: '50%',
        transform: 'translateX(-50%)',
        height: 80, width: 80,
        bottom: '-31px',
    },
    [_theme.breakpoints.up('md')]: {
        left: '11%',
        bottom: '-248px',
    },
    [_theme.breakpoints.up('xl')]: {
        left: '18%',
        bottom: '-248px',
    }
})