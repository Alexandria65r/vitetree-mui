import { Box, styled, useTheme } from '@mui/material'
import React from 'react'
import UserAvatar from '../user/user-avatar'
import { colorScheme } from '../../theme'
import { useWorkspacePeople } from '../../../store/hooks'
const Container = styled(Box)(({ theme }) => ({

    [theme.breakpoints.down('sm')]: {
        marginLeft: 5
    }
}))
const MappedAvatars = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: 0
}))


type Props = {}

export default function WorkspacePeople({ }: Props) {
    const _theme = useTheme()
    const people = useWorkspacePeople()
    return (
        <Container>
            <MappedAvatars>
                {people.map((person) => (
                    <UserAvatar
                        initials={person.initials}
                        key={person.email}
                        avatarStyles={{
                            fontSize: 13,
                            width: 35,
                            height: 35,
                            marginLeft: -1,
                            cursor: 'pointer',
                            transition: '0.3s',
                            border: `3px solid ${colorScheme(_theme).lightToTertiary}`,
                            '&:hover': {
                                transform: 'scale(1.07)'
                            }
                        }} />
                ))}
            </MappedAvatars>
        </Container>
    )
}