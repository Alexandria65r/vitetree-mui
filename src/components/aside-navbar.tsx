import { Box, colors, styled, useMediaQuery } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import { BiHomeAlt } from 'react-icons/bi'
import { StyledButton } from '../reusable/styles'
import { colorScheme, useColorScheme } from '../theme'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Link from 'next/link'
import { useAppSelector } from '../../store/hooks'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { getAuth, signOut } from 'firebase/auth'
import Cookies from 'js-cookie'
import * as types from '../reusable'
import LoginIcon from '@mui/icons-material/Login';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import InteractionPopper from './account/interaction-popper/interaction-popper'



const AsideNav = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'flex-start',
  height: 'calc(100vh - 65px)',
   borderRight: `1px solid ${colorScheme(theme).borderColor}`,
  padding: 10,
  flexBasis: '100%',
  [theme.breakpoints.down('sm')]: {
    flexBasis: '100%',
    height: 'calc(100% - 60px)',
    overflowY: 'auto',
  }
}))
const NavButton = styled(StyledButton)(({ theme }) => ({
  justifyContent: 'flex-start',
  fontSize: 16,
  flexBasis: '100%',
  marginBottom: 5,
  borderRadius: 29,
  height: 45,
  color: theme.palette.mode === 'light' ? '#000' : colorScheme(theme).TextColor,
  backgroundColor: 'transparent',
  transition: '0.3s all',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'light' ? colors.grey[200] : colorScheme(theme).secondaryColor,
  }
}))


const LogoutButton = styled(StyledButton)(({ theme }) => ({
  flexBasis: '90%',
  alignSelf: 'flex-end',
  marginBottom: 5,
  fontWeight: 600,
  fontSize: 16,
  height: 45,
  borderRadius: 29,
  backgroundColor: theme.palette.mode === 'light' ? '#000' : colorScheme(theme).secondaryColor,
  [theme.breakpoints.down("sm")]: {
    flexBasis: '90%',
    marginBottom: 10,

  }
}))


type Props = {}

export default function AsideNavbar({ }: Props) {
  const router = useRouter()
  const user = useAppSelector((state) => state.AuthReducer.user)
  const isSidebarOpen = useAppSelector((state) => state.MainReducer.isSidebarOpen)
  const isMobile = useMediaQuery('(max-width:600px)')

  async function logout() {
    const auth = getAuth()
    try {
      await signOut(auth)
      Cookies.remove(types.PUSHMEPAL_AUTH_TOKEN)
      window.location.href = '/'
    } catch (error) {
      console.log(error)
    }
  }






  return (
    <AsideNav 
      className="sideBarAnimated">
      {user._id ? (<>
        <Box sx={{ width: '100%' }}>
          <NavItem
            route='/notifications/all'
            name={isSidebarOpen && !isMobile ? '' : 'Notifications'}
            startIcon={<NotificationsNoneIcon sx={{ mr: isSidebarOpen && !isMobile ? 0 : 1, fontSize: 28 }} />}
            isActive={router.asPath.includes('/notifications')}
          />
          <NavItem route={user.interaction === 'job seeker' ? '/find-creators/q=nothing' : `/page/${user?.pageInfo?.pageId}`}
            name={isSidebarOpen && !isMobile ? '' : 'Home'}
            startIcon={<BiHomeAlt size={25} style={{ marginRight: isSidebarOpen && !isMobile ? 0 : 10 }} />}
            isActive={router.asPath === '/dashboard'}
          />
        </Box>
        <Box sx={{ alignSelf: 'flex-end', width: '100%' }}>
          <InteractionPopper />
          <LogoutButton
            onClick={logout}
            sx={{ width: '100%', mt: 1 }}>
            <LogoutOutlinedIcon sx={{ mr: isSidebarOpen && !isMobile ? 0 : 1 }} />
            {isSidebarOpen && !isMobile ? '' : 'Log Out'}
          </LogoutButton>
        </Box>

      </>) : <>
        <NavItem
          name={isSidebarOpen && !isMobile ? "" : "Sign In"}
          route={`/signin`}
          startIcon={<LoginIcon sx={{ mr: isSidebarOpen && !isMobile ? 0 : 1 }} />}
          isActive={router.asPath.includes(`/signin`)}
        />
      </>}
    </AsideNav>
  )
}


type NavItemProps = {
  name: string
  route: string
  isActive: boolean
  startIcon: any
}

function NavItem({ name, route, isActive, startIcon }: NavItemProps) {
  const isSidebarOpen = useAppSelector((state) => state.MainReducer.isSidebarOpen)
  const isMobile = useMediaQuery('(max-width:600px)')
  const colorScheme = useColorScheme()
  return (
    <Link href={route} style={{ flexBasis: '100%' }}>
      <NavButton
        sx={(theme) => ({
          width: '100%',
          justifyContent: isSidebarOpen && !isMobile ? 'center' : 'flex-start',
          backgroundColor: isActive ? colors.teal[400] : isSidebarOpen
            && !isMobile ? theme.palette.mode === 'light' ? colors.grey[200] :
            colorScheme.secondaryColor : 'transparent',
          color: isActive ? '#fff' : '',
          '&:hover': {
            backgroundColor: isActive ? colors.teal[400] : ''
          }
        })}
      >

        {startIcon}
        {name}
      </NavButton>
    </Link>

  )
}