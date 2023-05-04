import React from 'react'
import { colorScheme } from '../theme'
import { Box, Typography, styled } from '@mui/material'



const Card = styled(Box)(({ theme }) => ({
    flexBasis: '30%',
    cursor: 'pointer',
    minHeight: 50,
    marginTop: '10px',
    padding: '0px 10px',
    //backgroundColor: colorScheme(theme).secondaryColor,
    borderBottom: `1px solid ${colorScheme(theme).borderColor}`,
    //borderRadius: CSS_PROPERTIES.radius5,
    //boxShadow: `0 1px 3px 0 ${colorScheme(theme).chatBoarderColor}`,
    [theme.breakpoints.down("sm")]: {
        flexBasis: '100%',
        marginTop: '10px',
        marginLeft: 0,
    }
}))

const CardFooter = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    padding: 10,
    justifyContent: 'flex-end'
}))

type Props = {
    type: 'Bid' | 'Answer'
    isOpen: boolean
    setOpen: (bool: boolean) => void
}

export default function NotificationItem({ type, isOpen, setOpen }: Props) {
    return (
        <Card onClick={() => setOpen(!isOpen)}>
            <Typography sx={{ flex: 1, fontSize: 15, fontWeight: 600 }}>
                {type === 'Answer' ? 'Chemistry rate of a chemical reaction' : 'Physics assignment'}
            </Typography>
            <Typography sx={{ fontSize: 14, lineHeight: 1.2, color: 'GrayText', fontWeight: 600 }}>
                {type}
            </Typography>
            <Typography sx={{ flex: 1,mt:.3, fontSize: 13, lineHeight: 1.2, color: 'GrayText', fontWeight: 500 }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, necessitatibus?
            </Typography>
            <CardFooter>
                <Typography sx={{ fontSize: 14, lineHeight: 1.2, color: 'GrayText', fontWeight: 500 }}>
                    {type === 'Answer' ? '17Min' : 'now'}
                </Typography>
            </CardFooter>
        </Card>
    )
}