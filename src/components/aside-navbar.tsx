import { Box, Skeleton, colors, styled, useMediaQuery } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect } from 'react'
import { ButtonIcon, StyledButton } from '../reusable/styles'
import { ThemedText, colorScheme, useColorScheme } from '../theme'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { getAuth, signOut } from 'firebase/auth'
import Cookies from 'js-cookie'
import * as types from '../reusable'
import LoginIcon from '@mui/icons-material/Login';
import InteractionPopper from './account/interaction-popper/interaction-popper'
import WorkspacePopper from './element-tree/poppers/workspace-popper'
import { fetchActiveWorkspaceBoardAndBoardData, fetchBoardsThunk } from '../../reducers/boards-reducer/boards-thunks'
import { boardActions } from '../../reducers/boards-reducer'
import { Board } from '../models/board'
import { getNameInitials } from '../reusable/helpers'
import { mainActions } from '../../reducers/main-reducer'
import { Add } from '@mui/icons-material'





const Container = styled(Box)(({ theme }) => ({
  height: 'calc(100vh - 65px)',
  borderRight: `1px solid ${colorScheme(theme).borderColor}`,
  backgroundColor: colorScheme(theme).lightToprimaryColor,
  [theme.breakpoints.down('sm')]: {
    flexBasis: '100%',
    height: 'calc(100vh - 60px)',
    overflowY: 'auto',
  }
}))

const AsideNav = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'flex-start',
  padding: 10,
  flexBasis: '100%',
  height: 'calc(100dvh - 120px)',
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

const Boards = styled(Box)(({ theme }) => ({
  width: '100%'
}))
const MappedBoards = styled(Box)(({ theme }) => ({

}))
const BoardsHead = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  padding: '8px 6px',
}))



type Props = {}

export default function AsideNavbar({ }: Props) {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const user = useAppSelector((state) => state.AuthReducer.user)
  const isSidebarOpen = useAppSelector((state) => state.MainReducer.isSidebarOpen)
  const selectedWorkspace = useAppSelector((state) => state.WorkspaceReducer.selectedWorkspace)
  const selectedBoard = useAppSelector((state) => state.BoardReducer.selectedBoard)
  const boards = useAppSelector((state) => state.BoardReducer.boards)
  const boardNetworkStatus = useAppSelector((state) => state.BoardReducer.boardNetworkStatus)
  const isMobile = useMediaQuery('(max-width:600px)')
  const [workspaceId, boardIdParam, boardId]: any = router.query.params || []
  console.log(router.query.params)

  const loadData = useCallback(() => {
    console.log(workspaceId)
    dispatch(fetchActiveWorkspaceBoardAndBoardData(router.asPath))
  }, [boardId, workspaceId])


  useEffect(() => {
    loadData()
  }, [router.pathname, workspaceId, boardId])

  const loadBoards = useCallback(() => dispatch(fetchBoardsThunk()), [selectedWorkspace])

  useEffect(() => {
    loadBoards()
  }, [selectedWorkspace])





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






  return (<Container>
    <WorkspacePopper />

    <AsideNav
      className="sideBarAnimated">
      {user._id ? (<>
        <Boards>
          <BoardsHead>
            {boardNetworkStatus === 'fetching-boards' ? (
              <>
                {!isSidebarOpen && (
                  <Box sx={{ width: '100%', gap: 1, display: 'flex' }}>
                    <Box sx={{ flex: 1 }}>
                      <Skeleton sx={{ width: '50%', height: 35 }} />
                    </Box>
                    <Skeleton sx={{ width: 35, height: 35 }} />
                  </Box>
                )}
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', width: '100%', mt: .5 }}>
                  <Skeleton sx={{ flexBasis: '100%', height: 40, borderRadius: 19 }} variant='rounded' />
                  <Skeleton sx={{ flexBasis: '100%', height: 40, borderRadius: 19 }} variant='rounded' />
                  <Skeleton sx={{ flexBasis: '100%', height: 40, borderRadius: 19 }} variant='rounded' />
                  <Skeleton sx={{ flexBasis: '100%', height: 40, borderRadius: 19 }} variant='rounded' />
                </Box>
              </>
            ) : (<>
                {!boards.length && !isSidebarOpen && boardNetworkStatus ==='fetching-boards-success'? (
                <>
                  {!isSidebarOpen && <ThemedText sx={{ flexBasis: '100%', mb: 1, fontSize: 13, textAlign: 'center', fontWeight: 600 }}>
                    There are not boards in this workspace, create a board now.
                  </ThemedText>}
                  <StyledButton
                    onClick={() => {dispatch(boardActions.setIsFormOpen(true))}}
                    sx={{ fontSize: 14, height: 35, }}>
                    <Add /> Create Board
                  </StyledButton>
                </>
              ) : (<>
                {isMobile ? <ThemedText sx={{ flex: 1, fontSize: 14, fontWeight: 600 }}>Boards</ThemedText>
                  : !isMobile && !isSidebarOpen ? <ThemedText sx={{ flex: 1, fontSize: 14, fontWeight: 600 }}>Boards</ThemedText> : <></>}
                <ButtonIcon
                  onClick={() => {
                    dispatch(boardActions.setIsFormOpen(true))
                    dispatch(mainActions.setIsSideBarOpen(isMobile ? false : true))
                  }}
                  sx={{
                    width: isSidebarOpen && !isMobile ? 45 : 35, height: isSidebarOpen && !isMobile ? 45 : 35,
                    color: isSidebarOpen ? '#fff' : '', bgcolor: isSidebarOpen ? colors.teal[500] : '',
                  }}>
                  <Add />
                </ButtonIcon>
              </>)

              }
            </>)}
          </BoardsHead>
          {boardNetworkStatus !== 'fetching-boards' && (
            <MappedBoards >
              {boards.map((board) => (
                <BoardItem key={board._id}
                  color={board.color}
                  board={board}
                  isActive={selectedBoard?._id === board?._id}
                />
              ))}
            </MappedBoards>
          )}
        </Boards>

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


type BoardItemProps = {
  board: Board
  isActive: boolean
  color?: string
  onClick?: () => void
}



function BoardItem({ board, isActive, color }: BoardItemProps) {
  const dispatch = useAppDispatch()
  const isSidebarOpen = useAppSelector((state) => state.MainReducer.isSidebarOpen)
  const isMobile = useMediaQuery('(max-width:600px)')
  const colorScheme = useColorScheme()
  const workspace = useAppSelector((state) => state.WorkspaceReducer.selectedWorkspace)


  return (
    <Link href={`/w/${workspace._id}/boardId/${board?._id ?? ''}`}
      style={{ flexBasis: '100%' }}>
      <NavButton
        onClick={() => {
          dispatch(boardActions.setSelectedBoard(board))
          dispatch(mainActions.setIsSideBarOpen(isMobile ? false : true))
        }}
        sx={(theme) => ({
          width: '100%',
          justifyContent: isSidebarOpen && !isMobile ? 'center' : 'flex-start',
          backgroundColor: isActive ? colorScheme.lightToprimaryColor : isSidebarOpen
            && !isMobile ? theme.palette.mode === 'light' ? color :
            color : color,
          color: theme.palette.mode === 'light' && isActive ? color : theme.palette.mode === 'dark' && isActive ? color : isActive || isSidebarOpen ? '#fff' : '#fff',
          border: isActive ? `1px solid ${color}` : 0,
          fontWeight: isSidebarOpen ? 600 : 500,
          '&:hover': {
            backgroundColor: isActive ? color : isSidebarOpen ? color : '',
            color: isActive ? '#fff' : '',
          }
        })}
      >
        {isSidebarOpen && !isMobile ? getNameInitials(board.name) : board.name}
      </NavButton>

    </Link>

  )
}



