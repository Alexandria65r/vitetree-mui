import { Box, SxProps, Theme, styled, useTheme } from '@mui/material'
import React from 'react'
import { colorScheme } from '../../theme'
import UserAvatar from '../user/user-avatar'

const Container = styled(Box)(({ theme }) => ({
    position: 'relative',
    height: 400,
    borderRadius: 10,
    backgroundColor: colorScheme(theme).grayToSecondaryColor,
    [theme.breakpoints.down('sm')]: {
        height: 160,
        margin: 10,
    },
}))


type Props = {}

export default function Banner({ }: Props) {
    const _theme = useTheme()
    const avatarStyles: SxProps<Theme> | undefined = {
        height: 180, width: 180,
        position: 'absolute',
        left: '50%',
        bottom: '-31px',
        transform: 'translateX(-50%)',
        [_theme.breakpoints.down('sm')]: {
            height: 80, width: 80,
            bottom: '-31px',
        }
    }
    return (
        <Container>
            <UserAvatar imageURL={''} avatarStyles={avatarStyles} />
        </Container>
    )
}
