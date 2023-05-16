import { Box, colors, styled } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import { BiHomeAlt } from 'react-icons/bi'
import { StyledButton } from '../reusable/styles'
import { colorScheme } from '../theme'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Link from 'next/link'
import { useAppSelector } from '../../store/hooks'

const AsideNav = styled(Box)(({ theme }) => ({
  flexBasis: '15%',
  padding: 10,
  [theme.breakpoints.down('sm')]: {
    display: 'none'
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


type Props = {}

export default function AsideNavbar({ }: Props) {
  const router = useRouter()
  const user = useAppSelector((state) => state.AuthReducer.user)
  return (
    <AsideNav sx={{}}
      className="sideBarAnimated">
      <NavItem route='/'
        name='Home'
        startIcon={<BiHomeAlt size={20} style={{ marginRight: 5 }} />}
        isActive={router.asPath === '/'}
      />
      <NavItem
        name="profile"
        route={`/account/${user._id}`}
        startIcon={<AccountCircleOutlinedIcon sx={{ mr: .5 }} />}
        isActive={router.asPath.includes(`/account`)}
      />

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