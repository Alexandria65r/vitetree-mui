import { Box } from '@mui/joy'
import React from 'react'
import NavBar from './navbar'

type Props = {
    children: any
}

export default function Layout({ children }: Props) {
    return (
        <Box>
            <NavBar />
            {children}
        </Box>
    )
}