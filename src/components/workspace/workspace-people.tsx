import { Box, styled, useTheme } from '@mui/material'
import React from 'react'
import UserAvatar from '../user/user-avatar'
import { colorScheme } from '../../theme'
const Container = styled(Box)(({ theme }) => ({

    [theme.breakpoints.down('sm')]:{
        marginLeft:5
    }
}))
const MappedAvatars = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap:0
}))


type Props = {}

export default function WorkspacePeople({ }: Props) {
    const _theme = useTheme()
    return (
        <Container>
            <MappedAvatars>
                {[1, 2, 3, 4,5,6,7].map((person) => (
                    <UserAvatar key={person} avatarStyles={{
                        marginLeft:-1,
                        cursor:'pointer',
                        transition:'0.3s',
                        border:`3px solid ${colorScheme(_theme).lightToTertiary}`,
                        '&:hover':{
                            transform:'scale(1.07)'
                        }
                    }} />
                ))}
            </MappedAvatars>
        </Container>
    )
}