import { Box, Menu as PopperMenu, MenuItem, styled, useTheme } from '@mui/material'
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state'
import React from 'react'
import { StyledButton } from '../../../reusable/styles'
import { colorScheme } from '../../../theme'
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import { useAppDispatch, useAppSelector, useElementAction, useGroupAction } from '../../../../store/hooks'
import { elementsActions } from '../../../../reducers/elements-reducer'
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import { listGroupActions } from '../../../../reducers/list-group-reducer'

const Container = styled(Box)(() => ({

}))


const TreeButton = styled(StyledButton)(({ theme }) => ({
    height: 35,
    borderRadius: 29,
    color: colorScheme(theme).TextColor,
    backgroundColor: colorScheme(theme).lightToSecondaryColor,
    border: `1px solid ${colorScheme(theme).greyToTertiary}`
}))

const Menu = styled(Box)(() => ({
    width: '100%',
}))
const MenuListItem = styled(MenuItem)(() => ({
    fontSize: 14,
    gap: 10
}))


type Props = {

}

export default function BoardMenuPopper({ }: Props) {
    const dispatch = useAppDispatch()
    const _theme = useTheme()
    const borderBottom = `1px solid ${colorScheme(_theme).greyToTertiary}`
    const groupAction = useAppSelector((state) => state.ListGroupReducer.groupAction)
    const elementsAction = useAppSelector((state) => state.ElementsReducer.elementAction)
    const selectedBoard = useAppSelector((state) => state.BoardReducer.selectedBoard)
    const isMarkParentsEnabled = useGroupAction({ action: 'mark-parents' })
    const isMarkChildrenEnabled = useElementAction({ action: 'mark-children' })

    return (
        <Container>
            <PopupState variant='popper'>
                {(popupState) => (<>
                    <TreeButton {...bindTrigger(popupState)} sx={{ borderRight: 0, borderTopRightRadius: 0, borderBottomRightRadius: 0 }}>
                        <ListOutlinedIcon sx={{ color: selectedBoard?.color }}/>
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
                            
                           
                                <MenuListItem sx={{ borderBottom, justifyContent: '', fontWeight: 600 }}>Menu</MenuListItem>
                                <MenuListItem onClick={() => {
                                    dispatch(listGroupActions.setGroupAction({
                                        action: 'mark-parents'
                                    }))
                                    popupState.close()
                                }}>
                                {isMarkParentsEnabled && groupAction.action === 'mark-parents' ? <CheckBoxOutlinedIcon /> : <CheckBoxOutlineBlankOutlinedIcon />}

                                    Mark groups
                                </MenuListItem>
                                <MenuListItem onClick={() => {
                                    dispatch(listGroupActions.setGroupAction({
                                        action: 'mark-children'
                                    }))
                                    popupState.close()
                                }}>
                                    {isMarkChildrenEnabled && groupAction.action === 'mark-children' ? <CheckBoxOutlinedIcon /> : <CheckBoxOutlineBlankOutlinedIcon />}
                                    Mark children
                                </MenuListItem>
                            
                        </Menu>
                        {/* <MenuFooter>
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
                        </MenuFooter> */}
                    </PopperMenu>
                </>
                )}
            </PopupState>
        </Container>
    )
}