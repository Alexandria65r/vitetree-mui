import { Box, colors, styled } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import { BiHomeAlt } from 'react-icons/bi'
import { StyledButton } from '../reusable/styles'
import { colorScheme } from '../theme'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Link from 'next/link'
import { useAppSelector } from '../../store/hooks'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { getAuth, signOut } from 'firebase/auth'
import Cookies from 'js-cookie'
import * as types from '../reusable'
import LoginIcon from '@mui/icons-material/Login';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';



const AsideNav = styled(Box)(({ theme }) => ({
  padding: 10,
  [theme.breakpoints.down('sm')]: {
    //display: 'none'
    flexBasis: '80%',
    height: 'calc(100% - 120px)',
    overflowY: 'auto'
  }
}))
const NavButton = styled(StyledButton)(({ theme }) => ({
  justifyContent: 'flex-start',
  fontSize: 16,
  width: '100%',
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
    <AsideNav sx={{}}
      className="sideBarAnimated">
      {user._id ? (<>
        <NavItem
         route='/notifications/all'
          name='Notifications'
          startIcon={<NotificationsNoneIcon sx={{ mr: 1 }} />}
          isActive={router.asPath.includes('/notifications')}
        />
        <NavItem route='/dashboard'
          name='Home'
          startIcon={<BiHomeAlt size={20} style={{ marginRight: 5 }} />}
          isActive={router.asPath === '/dashboard'}
        />
        <NavItem
          name="profile"
          route={`/account/${user._id}`}
          startIcon={<AccountCircleOutlinedIcon sx={{ mr: .5 }} />}
          isActive={router.asPath.includes(`/account`)}
        />

        <LogoutButton

          onClick={logout}
          sx={{ width: '100%', mt: 1 }}>
          <LogoutOutlinedIcon sx={{ mr: 1 }} />
          Log Out
        </LogoutButton>

      </>) : <>
        <NavItem
          name="Sign In"
          route={`/signin`}
          startIcon={<LoginIcon sx={{ mr: .5 }} />}
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
  return (
    <Link href={route}>
      <NavButton
        sx={{
          backgroundColor: isActive ? colors.teal[400] : 'transparent',
          color: isActive ? '#fff' : '',
          '&:hover': {
            backgroundColor: isActive ? colors.teal[400] : ''
          }
        }}
      >

        {startIcon}
        {name}
      </NavButton>
    </Link>

  )
}