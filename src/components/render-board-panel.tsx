import { Box, Skeleton, colors, styled, useMediaQuery } from '@mui/material'
import { useRouter } from 'next/router'
import React, { } from 'react'
import { ButtonIcon, StyledButton } from '../reusable/styles'
import { ThemedText, colorScheme, useColorScheme } from '../theme'
import { useAppDispatch, useAppSelector, useSelectedWorkspace } from '../../store/hooks'
import { selectBoardThunk } from '../../reducers/boards-reducer/boards-thunks'
import { boardActions } from '../../reducers/boards-reducer'
import { Board } from '../models/board'
import { getNameInitials } from '../reusable/helpers'
import { mainActions } from '../../reducers/main-reducer'
import { Add } from '@mui/icons-material'



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



const Boards = styled(Box)(() => ({
  width: '100%'
}))
const MappedBoards = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
}))
const BoardsHead = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  padding: '8px 6px',
}))



type Props = {}

export default function RenderBoardPanel({ }: Props) {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const isSidebarOpen = useAppSelector((state) => state.MainReducer.isSidebarOpen)
  const selectedBoard = useAppSelector((state) => state.BoardReducer.selectedBoard)
  const boards = useAppSelector((state) => state.BoardReducer.boards)
  const boardNetworkStatus = useAppSelector((state) => state.BoardReducer.boardNetworkStatus)
  const isMobile = useMediaQuery('(max-width:600px)')

  if (router.pathname !== '/w/[...params]') return null

  return (
    <Boards>
      <BoardsHead>
        {boardNetworkStatus === 'fetching-board-data' ? (
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
          {!boards.length && !isSidebarOpen && boardNetworkStatus === 'fetching-board-data-success' ? (
            <>
              {!isSidebarOpen && <ThemedText sx={{ flexBasis: '100%', mb: 1, fontSize: 13, textAlign: 'center', fontWeight: 600 }}>
                There are not boards in this workspace, create a board now.
              </ThemedText>}
              <StyledButton
                onClick={() => { dispatch(boardActions.setIsFormOpen(true)) }}
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
      {boardNetworkStatus !== 'fetching-board-data' && (
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


 

  return (

    <NavButton
      onClick={() => {
        dispatch(selectBoardThunk(board))
        dispatch(mainActions.setIsSideBarOpen(isMobile ? false : true))
      }}
      sx={(theme) => ({
        width: 45,
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



  )
}



