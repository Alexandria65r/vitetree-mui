import { styled, Box, ButtonBase, colors, Modal, Typography, IconButton, useMediaQuery, MenuItem } from '@mui/material'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { colorScheme } from '../theme'
import { CSS_PROPERTIES } from '../reusable'
import { StyledButton } from '../reusable/styles'
import Cookies from 'js-cookie'
import * as types from '../reusable'
import { useRouter } from 'next/router'
import { getAuth, signOut } from "firebase/auth";
import { mainActions } from '../../reducers'
import Link from 'next/link'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import CloseIcon from '@mui/icons-material/Close';
import LoginIcon from '@mui/icons-material/Login';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';


const SideBarContainer = styled(Box)(({ theme }) => ({
    transition: '0.3s all',
    transformOrigin: 'left',
    borderRight: `1px solid ${colorScheme(theme).borderColor}`,
    backgroundColor: colorScheme(theme).sideBarColor,
    height: 'calc(100vh - 0px)',
    display: 'flex',
    alignItems: 'start',
    flexWrap: 'wrap',
    justifyContent: 'center'
}))


const ReusableButton = styled(StyledButton)(({ theme }) => ({
    flexBasis: '90%',
    alignSelf: 'flex-end',
    marginBottom: 5,
    fontWeight: 600,
    fontSize: 16,
    [theme.breakpoints.down("sm")]: {
        flexBasis: '90%',
        marginBottom: 10,

    }
}))

const SideBarHeader = styled(Box)(({ theme }) => ({
    position: 'relative',
    flexBasis: '100%',
    height: 66,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 25px',
    borderBottom: `1px solid ${colorScheme(theme).secondaryColor}`,
    backgroundColor: theme.palette.mode === 'light' ? 'rgb(245 245 245)' : colorScheme(theme).primaryColor
}))
const SideBarContent = styled(Box)(({ theme }) => ({
    flexBasis: '100%',
    padding: 10,
    height: 'calc(100% - 120px)',
    overflowY: 'auto'
}))
const SideBarItem = styled(MenuItem)(({ theme }) => ({
    width: '100%',
    height: 50,
    borderRadius: 5
}))




type Props = {}

export default function SideBar({ }: Props) {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const isSidebarOpen = useAppSelector((state) => state.MainReducer.isSidebarOpen)
    const user = useAppSelector((state) => state.AuthReducer.user)
    const isMobile = useMediaQuery('(max-width:600px)')

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
        <Modal
            open={isSidebarOpen}
            onClose={() => dispatch(mainActions.setIsSideBarOpen(false))}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >

            <SideBarContainer
                className="sideBarAnimated"
                sx={(theme) => ({
                    width: isSidebarOpen ? '23%' : '5%',
                    position: 'fixed',
                    top: 0,
                    zIndex: 60,
                    [theme.breakpoints.down('sm')]: {
                        top: 0,
                        width: isSidebarOpen ? '100%' : '0%',
                    }
                })}>


                <SideBarHeader>
                    {router.pathname !== '/' && (
                        <IconButton
                            onClick={() => dispatch(mainActions.setIsSideBarOpen(false))}
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2, position: 'absolute', left: 25 }}
                        >
                            <CloseIcon />
                        </IconButton>
                    )}

                    <Typography variant="h6" component="div"
                        sx={{
                            textAlign: 'center',
                            fontWeight: 600,
                            flexGrow: 1, color: colors.teal[400]
                        }}>
                        <Link href={user?._id ? '/dashboard' : '/'}>
                            Schooyard
                        </Link>
                    </Typography>
                </SideBarHeader>
                <SideBarContent>
                    {user?._id ? (<>
                        <SideBarItem onClick={() => router.push(`/account/${user._id}`)}>
                            <AccountCircleOutlinedIcon sx={{ mr: 1 }} />
                            Profile
                        </SideBarItem>
                        <SideBarItem onClick={() => router.push('/notifications/noti-list')}>
                            <NotificationsNoneIcon sx={{ mr: 1 }} />
                            Notifications
                        </SideBarItem>
                    </>
                    ) : (
                        <SideBarItem onClick={() => router.push('/signin')}>
                            <LoginIcon sx={{ mr: 1 }} />
                            Signin
                        </SideBarItem>
                    )}
                </SideBarContent>
                {user?._id && (
                    <ReusableButton
                        onClick={logout} sx={{ width: '100%' }}>
                        <LogoutOutlinedIcon sx={{ mr: 1 }} />
                        Log Out
                    </ReusableButton>
                )}
            </SideBarContainer >

        </Modal>
    )
}