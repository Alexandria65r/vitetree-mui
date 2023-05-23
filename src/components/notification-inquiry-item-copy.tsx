import React from 'react'
import { colorScheme } from '../theme'
import { Box, Typography, styled } from '@mui/material'
import moment from 'moment'
import Link from 'next/link'

const Card = styled(Box)(({ theme }) => ({
    flexBasis: '30%',
    cursor: 'pointer',
    minHeight: 50,
    marginTop: '10px',
    padding: '0px 10px',
    borderBottom: `1px solid ${colorScheme(theme).borderColor}`,
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
    
    title: string
    type: 'Bid' | 'Answer' | 'Inquiry' | string
    description: string
    createdAt: string
    open: () => void

}

export default function NotificationInquiryItem({ open, type, title, description, createdAt }: Props) {

    return (
            <Card onClick={open}>
                <Typography sx={{ flex: 1, fontSize: 15, fontWeight: 600 }}>
                    {title}
                </Typography>
                <Typography sx={{ fontSize: 14, lineHeight: 1.2, color: 'GrayText', fontWeight: 600 }}>
                    {type}
                </Typography>
                <Box sx={{ height: 30, overflow: 'clip', }}>
                    <Typography sx={{ flex: 1, mt: .3, whiteSpace: 'normal', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: 13, lineHeight: 1.2, color: 'GrayText', fontWeight: 500 }}>
                        {description}
                    </Typography>
                </Box>
                <CardFooter>
                    <Typography sx={{ fontSize: 13, lineHeight: 1.2, color: 'GrayText', fontWeight: 500 }}>
                        {moment(createdAt).fromNow()}
                    </Typography>
                </CardFooter>
            </Card>
    )
}