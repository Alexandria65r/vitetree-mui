import { styled, Box, ButtonBase, colors } from '@mui/material'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { colorScheme } from '../../theme'
import { CSS_PROPERTIES } from '../../reusable'
import { StyledButton } from '../../reusable/styles'
import Cookies from 'js-cookie'
import * as types from '../../reusable'
import { useRouter } from 'next/router'
import { getAuth, signOut } from "firebase/auth";

const SideBarContainer = styled(Box)(({ theme }) => ({
    transition: '0.3s all',
    transformOrigin: 'left',
    borderRight: `1px solid ${colorScheme(theme).borderColor}`,
    backgroundColor: colorScheme(theme).sideBarColor
}))
const ClosedBar = styled(Box)(({ theme }) => ({
    flexBasis: '100%',
    height: 'calc(100vh - 66px)',
    backgroundColor: colorScheme(theme).sideBarColor
}))
const OpenedBar = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    flexBasis: '100%',
    height: 'calc(100vh - 66px)',
    backgroundColor: colorScheme(theme).sideBarColor
}))

const ReusableButton = styled(StyledButton)(({ theme }) => ({
    flexBasis: '90%',
    alignSelf: 'flex-end',
    fontWeight: 600,
    fontSize: 16,
    [theme.breakpoints.down("sm")]: {
        flexBasis: '90%',
    }

}))



type Props = {}

export default function SideBar({ }: Props) {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const isSidebarOpen = useAppSelector((state) => state.MainReducer.isSidebarOpen)


    async function logout() {
        const auth = getAuth()
        try {
            await signOut(auth)
            Cookies.remove(types.SCHOOYARD_AUTH_TOKEN)
            window.location.href = '/'
        } catch (error) {
            console.log(error)
        }
    }
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
                <OpenedBar>
                    <ReusableButton onClick={logout}>Log Out</ReusableButton>
                </OpenedBar>
            ) : (
                <ClosedBar></ClosedBar>
            )
            }
        </SideBarContainer >
    )
}