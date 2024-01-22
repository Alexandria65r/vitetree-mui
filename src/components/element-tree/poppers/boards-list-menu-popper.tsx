import { Box, Menu as PopperMenu, MenuItem, styled, useTheme, colors } from '@mui/material'
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state'
import React from 'react'
import { StyledButton } from '../../../reusable/styles'
import { ThemedText, colorScheme } from '../../../theme'
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import RadioButtonCheckedOutlinedIcon from '@mui/icons-material/RadioButtonCheckedOutlined';
import { useAppDispatch, useAppSelector, useElementAction, useSelectedWorkspace } from '../../../../store/hooks'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { boardActions } from '../../../../reducers/boards-reducer'
import { HiOutlineChevronDown } from "react-icons/hi2";
import { useRouter } from 'next/router'
import { selectBoardThunk } from '../../../../reducers/boards-reducer/boards-thunks'


const Container = styled(Box)(({ theme }) => ({

}))


const TreeButton = styled(StyledButton)(({ theme }) => ({
    whiteSpace: 'nowrap',
    height: 35,
    borderRadius: 29,
    color: colorScheme(theme).TextColor,
    backgroundColor: colorScheme(theme).lightToSecondaryColor,
    border: `1px solid ${colorScheme(theme).greyToTertiary}`
}))

const Menu = styled(Box)(({ theme }) => ({
    width: '100%',
    // display: 'flex',

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

export default function BoardsListMenuPopper({ }: Props) {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const _theme = useTheme()
    const borderBottom = `1px solid ${colorScheme(_theme).greyToTertiary}`
    const elementsAction = useAppSelector((state) => state.ElementsReducer.elementAction)
    const selected_workspace = useSelectedWorkspace()
    const board = useAppSelector((state) => state.BoardReducer.board)
    const boards = useAppSelector((state) => state.BoardReducer.boards)
    const selectedBoard = useAppSelector((state) => state.BoardReducer.selectedBoard)


    return (
        <Container>
            <PopupState variant='popper'>
                {(popupState) => (<>

                    <TreeButton
                        {...bindTrigger(popupState)}
                        sx={{ color: selectedBoard?.color ?? '', borderTopLeftRadius: 0, borderBottomLeftRadius: 0, pr: 2 }}>
                        {selectedBoard?.name || <ThemedText sx={{fontSize:13,fontWeight:500}}>Select a board</ThemedText>}
                        <HiOutlineChevronDown size={20} style={{ marginLeft: 6 }} />
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

                            <MenuListItem sx={{ borderBottom, justifyContent: '', fontWeight: 600 }}>Boards</MenuListItem>
                            {boards.map((board) => (
                                <MenuListItem
                                    onClick={() => {
                                        dispatch(selectBoardThunk(board))
                                        popupState.close()
                                    }}
                                    key={board._id}>
                                    {board._id === selectedBoard?._id ? <RadioButtonCheckedOutlinedIcon sx={{ color: board.color }} /> :
                                        <RadioButtonUncheckedOutlinedIcon sx={{ color: board.color }} />}
                                    {board.name}
                                </MenuListItem>
                            ))}

                        </Menu>
                        <MenuFooter>
                            <StyledButton
                                onClick={() => {
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