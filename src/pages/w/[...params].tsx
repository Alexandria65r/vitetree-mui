import React, { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react'
import Layout from '../../components/layout'
import RenderElementTreeItems from '../../components/element-tree/render-element-tree-items'
import { useAppDispatch, useAppSelector, useListGroups, useParentElements, useSelectedBoard } from '../../../store/hooks'
import { fetchActiveWorkspaceBoardAndBoardData } from '../../../reducers/boards-reducer/boards-thunks'
import { useRouter } from 'next/router'
import { Box, colors, styled, useMediaQuery } from '@mui/material'
import { createListGroupThunk } from '../../../reducers/list-group-reducer/list-group-thunks'
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


const Container = styled(Box)(() => ({
  paddingInline: 10,
}))
const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  height: 50,
  gap: 8,
  paddingInline: 10,
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
  const dispatch = useAppDispatch()
  const elements = useParentElements().reverse()
  const listGroups = useListGroups()
  const [workspaceId, boardIdParam, boardId]: any = router.query.params || []
  const board = useSelectedBoard()
  const boards = useAppSelector((state) => state.BoardReducer.boards)
  const headerRef: MutableRefObject<HTMLDivElement> | any = useRef()
  const [isAddNewElement, toggleAddNewElement] = useState(false)
  const newListGroupName = useAppSelector((state) => state.ListGroupReducer.newListGroupName)
  const isSidebarOpen = useAppSelector((state) => state.MainReducer.isSidebarOpen)
  const isMobile = useMediaQuery('(max-width:600px)')
  console.log(router)




  function create() {
    dispatch(createListGroupThunk())
    toggleAddNewElement(false)
  }
  useEffect(() => {
    autoScroll()
  }, [isAddNewElement])


  function autoScroll() {
    headerRef.current.scrollTo({
      left: headerRef.current.scrollWidth,
      behavior: 'smooth'
    })
  }




  function AddNewListGroup() {
    toggleAddNewElement(!isAddNewElement)
  }

  return (
    <Layout>
      <Header ref={headerRef}>
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px' }}>
          {boards.length ? <ProjectTreeButton /> : <></>}
          <NewElementWrapper>
            {isAddNewElement ?
              (<NewItemInput
                value={newListGroupName}
                create={create}
                onChange={(target: any) => dispatch(listGroupActions.setListGroupName(target.value))}
                placeholder='New group'
                sx={{ paddingBlock: '9px', borderBottomColor: `${board.color}`, '&:focus': { borderBottomColor: `${board.color}!important` } }}
                btnSx={{ height: 36 }}
                createIcon={<VerticalAlignTopIcon
                  sx={{ transform: 'rotate(90deg)', color: board.color ?? colors.teal[400], }}
                />} />) : boards.length && board?._id ? (
                  <NewElementButton
                    sx={{ bgcolor: board.color }}
                    onClick={AddNewListGroup}>
                    <Add sx={{ mt: 0 }} /> {!isMobile ? 'New list group' : ''}
                  </NewElementButton>
                ) : <></>}
          </NewElementWrapper>
        </Box>
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
        <RenderElementTreeItems listGroups={listGroups} elements={elements} />
      </Container>

      <BoardInfoModal />
    </Layout>
  )
}