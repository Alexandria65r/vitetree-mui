import { Box, colors, styled, useMediaQuery } from '@mui/material'
import { useRouter } from 'next/router'
import React, { } from 'react'
import { ButtonIcon, StyledButton } from '../../reusable/styles'
import { ThemedText, colorScheme, useColorScheme } from '../../theme'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { getAuth, signOut } from 'firebase/auth'
import Cookies from 'js-cookie'
import * as types from '../../reusable'
import LoginIcon from '@mui/icons-material/Login';
import InteractionPopper from '../account/interaction-popper/interaction-popper'
import WorkspacePopper from '../element-tree/poppers/workspace-popper'
import RenderBoardPanel from '../render-board-panel'
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import { mainActions } from '../../../reducers/main-reducer'


const Container = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: 'calc(100vh - 0px)',
  borderRight: `1px solid ${colorScheme(theme).borderColor}`,
  backgroundColor: colorScheme(theme).lightToprimaryColor,
  [theme.breakpoints.down('sm')]: {
    flexBasis: '100%',
    height: 'calc(100vh - 0px)',
    overflowY: 'auto',
  }
}))

const SideBarHeader = styled(Box)(({ theme }) => ({
  position: 'relative',
  flexBasis: '100%',
  height: 56,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0 25px',
  borderBottom: `1px solid ${colorScheme(theme).greyToTertiary}`,
  backgroundColor: colorScheme(theme).lightToprimaryColor
}))

const AsideNav = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'flex-start',
  padding: 10,
  flexBasis: '100%',
  height: 'calc(100dvh - 120px)',
  [theme.breakpoints.down('sm')]: {
    height: 'calc(100dvh - 112px)',
  },
  [theme.breakpoints.up('md')]: {
    height: 'calc(100dvh - 60px)',
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


const BrandText = styled(ThemedText)(() => ({
  fontSize: 22,
  textAlign: 'center',
  fontWeight: 600,
  flexGrow: 1,
  color: colors.teal[400]
}))


const ToggleSideBarButton = styled(ButtonIcon)(({ theme }) => ({
  height: 30,
  width: 30,
  position: 'absolute',
  right: -15,
  top: 35,
  zIndex: 10,
  backgroundColor: colorScheme(theme).grayToSecondaryColor,
  [theme.breakpoints.down('sm')]: {
    display: 'none'
  }
}))



type Props = {}

export default function OpenStateSideBar({ }: Props) {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const user = useAppSelector((state) => state.AuthReducer.user)
  const isSidebarOpen = useAppSelector((state) => state.MainReducer.isSidebarOpen)

  const isMobile = useMediaQuery('(max-width:600px)')

  console.log(router.query.params)





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

    <Container>

      <ToggleSideBarButton onClick={() => dispatch(mainActions.setIsSideBarOpen(!isSidebarOpen))}>
        {isSidebarOpen ? <ChevronRightOutlinedIcon /> : <ChevronLeftOutlinedIcon />}
      </ToggleSideBarButton>

      <SideBarHeader>
        <BrandText>
          <Link href='/'>
            Vitetree
          </Link>
        </BrandText>
      </SideBarHeader>
      <WorkspacePopper />
      <AsideNav
        className="sideBarAnimated">
        {user._id ? (<>
          <RenderBoardPanel />
          <Box sx={{ alignSelf: 'flex-end', width: '100%' }}>
            <InteractionPopper />
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
    </Container >
  )
}


type NavItemProps = {
  name: string
  route?: string
  isActive: boolean
  startIcon?: any
  endIcon?: any
  color?: string
  onClick?: () => void
}

function NavItem({ name, route, isActive, startIcon, endIcon, onClick }: NavItemProps) {
  const isSidebarOpen = useAppSelector((state) => state.MainReducer.isSidebarOpen)
  const isMobile = useMediaQuery('(max-width:600px)')
  const colorScheme = useColorScheme()
  return (
    <Link href={route ?? ''} style={{ flexBasis: '100%' }}>
      <NavButton
        onClick={onClick}
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
        {endIcon}
      </NavButton>
    </Link>

  )
}









