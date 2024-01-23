import React from 'react'
import { useAppSelector } from '../../../store/hooks'
import OpenStateSideBar from './open-state-side-bar'
import ClosedStateSidBar from './closed-state-side-bar'
import { useMediaQuery } from '@mui/material'

type Props = {}

export default function RenderSideBar({ }: Props) {
    const isMobile = useMediaQuery('(max-width:600px)')
    const isSidebarOpen = useAppSelector((state) => state.MainReducer.isSidebarOpen)
    return isSidebarOpen && isMobile ? <OpenStateSideBar /> : isSidebarOpen && !isMobile ? <ClosedStateSidBar /> : <OpenStateSideBar />
}