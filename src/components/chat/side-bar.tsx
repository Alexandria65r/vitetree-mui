import { styled, Box } from '@mui/material'
import React from 'react'
import { useAppSelector } from '../../../store/hooks'



const SideBarContainer = styled(Box)(({ theme }) => ({
    height: '100vh',
    transition: '0.3s all',
    transformOrigin: 'left',
    borderRight:`1px solid ${theme.palette.grey[200]}`,
    backgroundColor: '#fff'
}))
const ClosedBar = styled(Box)(({ theme }) => ({
    flexBasis: '100%',
    height: 'calc(100vh - 66px)',
    backgroundColor: '#fff'
}))
const OpenedBar = styled(Box)(({ theme }) => ({
    flexBasis: '100%',
    height: 'calc(100vh - 66px)',
    backgroundColor: '#fff'
}))
type Props = {}

export default function SideBar({ }: Props) {
    const isSidebarOpen = useAppSelector((state) => state.ChatReducer.isSidebarOpen)
    return (
        <SideBarContainer sx={(theme) => ({
            zIndex: 10,
            flexBasis: isSidebarOpen ? '23%' : '5%',
            [theme.breakpoints.down('sm')]: {
                position: 'absolute',
                zIndex: 60,
                width: isSidebarOpen ? '80%' : '0%',
            }
        })}>
            {isSidebarOpen ? (
                <OpenedBar></OpenedBar>
            ) : (
                <ClosedBar></ClosedBar>
            )
            }
        </SideBarContainer >
    )
}