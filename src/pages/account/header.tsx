
import { Box, Typography, styled } from '@mui/material'
import React from 'react'
import { useAppSelector } from '../../../store/hooks'
import { ActiveIndicator, Avatar as AvatarContainer, ButtonIcon } from '../../reusable/styles'


const TopHeader = styled(Box)(() => ({
    height: 180,
    display: 'flex',
    alignItems: 'center',
    //backgroundColor:'#ddd'
}))
const Avatar = styled(AvatarContainer)(({ theme }) => ({
    width: 140,
    height: 140,
    [theme.breakpoints.down("sm")]: {
        width: 120,
        height: 120,
    }

}))
const UsernameColumn = styled(Box)(({ theme }) => ({
    position: 'relative',
    margin: '-15px 0 0 15px',
    [theme.breakpoints.down("sm")]: {
        margin: '0px 0 0 15px',
    }
}))


type Props = {
    height?: number
}

export default function Header({ height }: Props) {
    const user = useAppSelector((state) => state.AuthReducer.user)
    return (
        <TopHeader sx={{ height: height ? height : 180 }}>
            <Avatar></Avatar>
            <UsernameColumn>
                <Typography sx={{ fontSize: 18, fontWeight: 500 }}>
                    {user.firstName} {user.lastName}
                </Typography>
                <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
                    {user.email}
                </Typography>
                <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
                    Available
                </Typography>
                <ActiveIndicator sx={{ position: 'absolute', left: 55, bottom: 3 }}></ActiveIndicator>
            </UsernameColumn>
        </TopHeader>
    )
}