import React, { MutableRefObject, useEffect, useRef } from 'react'
import Layout from '../../components/layout'
import RenderElementTreeItems from '../../components/element-tree/render-element-tree-items'
import { useAppDispatch, useAppSelector, useListGroups, useParentElements, useSelectedBoard } from '../../../store/hooks'
import { useRouter } from 'next/router'
import { Box, IconButton, colors, styled, useMediaQuery, useTheme } from '@mui/material'
import { createListGroupThunk, createManyListGroupsThunk, prepareCustomElementsThunk } from '../../../reducers/list-group-reducer/list-group-thunks'
import { colorScheme } from '../../theme'
import NewItemInput from '../../components/element-tree/new-item-input'
import { Add } from '@mui/icons-material'
import { listGroupActions } from '../../../reducers/list-group-reducer'
import { ButtonIcon, StyledButton } from '../../reusable/styles'
import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop';
import ProjectTreeButton from '../../components/element-tree/project-tree-button'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import BoardInfoModal from '../../components/modals/board-info-modal'
import { boardActions } from '../../../reducers/boards-reducer'
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import { workspaceActions } from '../../../reducers/workspace-reducer'
import ElementDetailModal from '../../components/modals/element-detail-modal'
import { AppSpinner } from '../../components/activity-indicators'
import BulkActionsMenu from '../../components/element-tree/bulk-actions-menu'
import { mainActions } from '../../../reducers/main-reducer'
import { elementsActions } from '../../../reducers/elements-reducer'
import RenderWorkspace from '../../components/workspace/render-workspace'
import WorkspacePeople from '../../components/workspace/workspace-people'
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';


const Container = styled(Box)(() => ({
  //position:'relative',

}))
const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  height: 56,
  gap: 8,
  paddingInline: 10,
  backgroundColor: colorScheme(theme).lightToprimaryColor,
  borderBottom: `1px solid ${colorScheme(theme).grayToSecondaryColor}`,
  [theme.breakpoints.down('sm')]: {
    width: '100vw',
    overflowX: 'auto'
  }
}))

const NewElementWrapper = styled(Box)(() => ({

}))
const NewElementButton = styled(StyledButton)(({ theme }) => ({
  color: '#fff',
  fontSize: 14,
  height: 35,
  borderRadius: 25,
  paddingInline: 15,
  marginTop: 0,
  whiteSpace: 'nowrap',
  fontWeight: 500,
  backgroundColor: colors.teal[500],
  boxShadow: `0 1px 3px 0 ${colorScheme(theme).darkGreyToSecondary}`
}))

type Props = {}

export default function WorkspaceSettings({ }: Props) {
  const router = useRouter()
  const _theme = useTheme()
  const dispatch = useAppDispatch()
  const elements = useParentElements()
  const listGroups = useListGroups()
  const [workspaceId, boardIdParam, boardId]: any = router.query.params || []
  const board = useSelectedBoard()
  const isSidebarOpen = useAppSelector((state) => state.MainReducer.isSidebarOpen)
  const boards = useAppSelector((state) => state.BoardReducer.boards)
  const boardNetworkStatus = useAppSelector((state) => state.BoardReducer.boardNetworkStatus)
  const headerRef: MutableRefObject<HTMLDivElement> | any = useRef()
  const isNewGroupInputOpen = useAppSelector((state) => state.ListGroupReducer.isNewGroupInputOpen)
  const newListGroupName = useAppSelector((state) => state.ListGroupReducer.newListGroupName)
  const isMobile = useMediaQuery('(max-width:600px)')
  const checkedGroups = useAppSelector((state) => state.ListGroupReducer.checkedGroups)
  const checkedElements = useAppSelector((state) => state.ElementsReducer.checkedItems)


  function create() {
    dispatch(createListGroupThunk())
  }

  useEffect(() => {
    console.log('re-renders')
    //dispatch(prepareCustomElementsThunk({ listGroups: listGroups, elements: elements }))
  }, [listGroups, elements, board])


  async function createMultipleGroupsOnPaste() {
    const clipboard = await navigator.clipboard.readText()
    const elements: string[] = clipboard.split('\n');
    if (elements) {
      dispatch(createManyListGroupsThunk(elements))
    }
  }



  useEffect(() => {
    autoScroll()
  }, [isNewGroupInputOpen])


  function autoScroll() {
    headerRef.current.scrollTo({
      left: 130,
      behavior: 'smooth'
    })
  }






  return (
    <Layout>
      <Header ref={headerRef}>
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <IconButton
            onClick={() => dispatch(mainActions.setIsSideBarOpen(!isSidebarOpen))}
            size="small"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, display: 'none', [_theme.breakpoints.down('sm')]: { display: 'flex' } }}
          >
            {!isSidebarOpen ? <MenuOpenIcon /> : <MenuIcon />}
          </IconButton>
          {boardNetworkStatus !== 'fetching-board-data' && (<>
            {boards.length ? <ProjectTreeButton /> : (
              <StyledButton
                onClick={() => { dispatch(boardActions.setIsFormOpen(true)) }}
                sx={{ fontSize: 14, height: 35, }}>
                <Add /> Create A Board
              </StyledButton>
            )}
          </>)}
          <NewElementWrapper>
            {isNewGroupInputOpen ?
              (<NewItemInput
                value={newListGroupName}
                create={create}
                onPaste={createMultipleGroupsOnPaste}
                onChange={(target: any) => dispatch(listGroupActions.setListGroupName(target.value))}
                placeholder='New group'
                sx={{ paddingBlock: '9px', borderBottomColor: `${board.color}`, '&:focus': { borderBottomColor: `${board.color}!important` } }}
                btnSx={{ height: 36 }}
                createIcon={<VerticalAlignTopIcon
                  sx={{ transform: 'rotate(90deg)', color: board.color ?? colors.teal[400], }}
                />} />) : boards.length && board?._id ? (
                  <NewElementButton
                    sx={{ bgcolor: board.color }}
                    onClick={() => dispatch(listGroupActions.setIsNewGroupInputOpen(true))}>
                    <Add sx={{ mt: 0 }} /> {!isMobile ? 'New list group' : ''}
                  </NewElementButton>
                ) : <></>}
          </NewElementWrapper>
        </Box>

        <WorkspacePeople />

        <NewElementButton
          sx={{ gap: .5 }}
          onClick={() => dispatch(workspaceActions.toggleInvitePeopleModal(true))}>
          <GroupAddOutlinedIcon sx={{ mt: 0 }} /> {!isMobile ? 'Invite People' : ''}
        </NewElementButton>

        <ButtonIcon onClick={() => dispatch(boardActions.toggleBoardInfoModal(true))} sx={{ width: 35, height: 35 }}>
          <MoreVertOutlinedIcon />
        </ButtonIcon>
      </Header>
      <Container>
        {boardNetworkStatus === 'fetching-board-data' ? (<Box
          sx={{
            position: 'absolute',
            top: '50%',
            color: colors.teal[500],
            left: '50%', transform: 'translate(-50%,-50%)'
          }}>
          <AppSpinner visible={true} size={50} />
        </Box>
        ) : !board._id ? <RenderWorkspace /> : (
          <RenderElementTreeItems />
        )}
      </Container>
      <ElementDetailModal />
      <BoardInfoModal />
      <BulkActionsMenu
        checkItems={checkedGroups}
        moveTo={() => { }}
        deleteSelected={() => dispatch(mainActions.setModal({ component: 'delete-bulk-list-groups' }))}
        clearSelected={() => {
          dispatch(listGroupActions.clearCheckedGroups())
          dispatch(listGroupActions.clearGroupAction())
          dispatch(mainActions.closeModal())
        }} mode={'mark-groups'} />
      <BulkActionsMenu
        checkItems={checkedElements}
        moveTo={() => { }}
        deleteSelected={() => dispatch(mainActions.setModal({ component: 'delete-bulk-elements' }))}
        clearSelected={() => dispatch(elementsActions.clearCheckedItems())} mode={'mark-elements'} />
    </Layout>
  )
}