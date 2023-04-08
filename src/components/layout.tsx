import { Box } from '@mui/joy'
import React from 'react'
import NavBar from './navbar'
import _app from '../pages/_app'

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