import { Box, Menu as PopperMenu, MenuItem, styled, useTheme, colors } from '@mui/material'
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state'
import React from 'react'
import { StyledButton } from '../../../reusable/styles'
import { colorScheme } from '../../../theme'
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import RadioButtonCheckedOutlinedIcon from '@mui/icons-material/RadioButtonCheckedOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import { useAppDispatch, useAppSelector, useElementAction } from '../../../../store/hooks'
import { elementsActions } from '../../../../reducers/elements-reducer'
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { boardActions } from '../../../../reducers/boards-reducer'

const Container = styled(Box)(({ theme }) => ({

}))


const TreeButton = styled(StyledButton)(({ theme }) => ({
    height: 60,
    borderRadius: 29,
    color: colorScheme(theme).TextColor,
    backgroundColor: colorScheme(theme).lightToSecondaryColor,
    border: `1px solid ${colorScheme(theme).greyToTertiary}`
}))

const Menu = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',

}))
const BoardsCol = styled(Box)(({ theme }) => ({
    flex: 1,
    borderRight: `1px solid ${colorScheme(theme).greyToTertiary}`
}))
const MenuItemsCol = styled(Box)(({ theme }) => ({

}))
const MenuListItem = styled(MenuItem)(({ theme }) => ({
    fontSize: 14,
    gap: 10
}))

const MenuFooter = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: 10,
    padding: 6,
    marginTop: 4,
    borderTop: `1px solid ${colorScheme(theme).greyToTertiary}`
}))

type Props = {

}

export default function BoardMenuPopper({ }: Props) {
    const dispatch = useAppDispatch()
    const _theme = useTheme()
    const borderBottom = `1px solid ${colorScheme(_theme).greyToTertiary}`
    const elementsAction = useAppSelector((state) => state.ElementsReducer.elementAction)
    const selected_workspace = useAppSelector((state) => state.WorkspaceReducer.selectedWorkspace)
    const board = useAppSelector((state) => state.BoardReducer.board)
    const boards = useAppSelector((state) => state.BoardReducer.boards)
    const selectedBoard = useAppSelector((state) => state.BoardReducer.selectedBoard)
    const isMarkParentsEnabled = useElementAction({ action: 'mark-parents' })
    const isMarkChildrenEnabled = useElementAction({ action: 'mark-children' })

    return (
        <Container>
            <PopupState variant='popper'>
                {(popupState) => (<>
                    <TreeButton {...bindTrigger(popupState)} sx={{ borderRight: 0, borderTopRightRadius: 0, borderBottomRightRadius: 0 }}>
                        <ListOutlinedIcon sx={{ color: selectedBoard.color }}/>
                    </TreeButton>

                    <PopperMenu {...bindMenu(popupState)}
                        transformOrigin={{
                            horizontal: 'left',
                            vertical: 'top'
                        }}
                        anchorOrigin={{
                            horizontal: 'center',
                            vertical: 'bottom'
                        }}
                        slotProps={{

                            paper: {
                                style: {
                                    width: '20rem',
                                    margin: 0,
                                    padding: 0,
                                    borderRadius: 10,

                                }

                            }
                        }}
                    >
                        <Menu>
                            <BoardsCol>
                                <MenuListItem sx={{ borderBottom, justifyContent: 'center', fontWeight: 600 }}>Boards</MenuListItem>
                                {boards.map((board) => (
                                    <MenuListItem
                                        onClick={() => {
                                            dispatch(boardActions.setSelectedBoard(board))
                                            popupState.close()
                                        }}
                                        key={board._id}>
                                        {board._id === selectedBoard._id ? <RadioButtonCheckedOutlinedIcon sx={{ color: board.color }} /> :
                                            <RadioButtonUncheckedOutlinedIcon sx={{ color: board.color }} />}
                                        {board.name}
                                    </MenuListItem>
                                ))}
                            </BoardsCol>
                            <MenuItemsCol>
                                <MenuListItem sx={{ borderBottom, justifyContent: 'center', fontWeight: 600 }}>Menu</MenuListItem>
                                <MenuListItem onClick={() => {
                                    dispatch(elementsActions.setElementAction({
                                        action: 'mark-parents'
                                    }))
                                    popupState.close()
                                }}>
                                    {isMarkParentsEnabled && elementsAction.action === 'mark-parents' ? <CheckBoxOutlinedIcon /> : <CheckBoxOutlineBlankOutlinedIcon />}

                                    Mark groups
                                </MenuListItem>
                                <MenuListItem onClick={() => {
                                    dispatch(elementsActions.setElementAction({
                                        action: 'mark-children'
                                    }))
                                    popupState.close()
                                }}>
                                    {isMarkChildrenEnabled && elementsAction.action === 'mark-children' ? <CheckBoxOutlinedIcon /> : <CheckBoxOutlineBlankOutlinedIcon />}
                                    Mark children
                                </MenuListItem>
                            </MenuItemsCol>
                        </Menu>
                        <MenuFooter>
                            <StyledButton
                                onClick={() => {
                                    dispatch(boardActions.setBoardData({ ...board, workspaceId: selected_workspace?._id ?? '' }))
                                    dispatch(boardActions.setIsFormOpen(true))
                                    popupState.close()
                                }}
                                sx={{
                                    flex: 1,
                                    gap: '5px',
                                    height: 35,
                                    fontSize: 14,
                                    justifyContent: 'center',
                                    bgcolor: colors.teal[500],
                                    borderRadius: 1.5,
                                    color: '#fff', '&:hover': { bgcolor: colors.teal[500] }
                                }}>
                                <AddOutlinedIcon />
                                Create A Board
                            </StyledButton>
                        </MenuFooter>
                    </PopperMenu>
                </>
                )}
            </PopupState>
        </Container>
    )
}