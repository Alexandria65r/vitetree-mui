import { Box, Menu as PopperMenu, MenuItem, styled, useTheme } from '@mui/material'
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
    display: 'flex'
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

type Props = {

}

export default function BoardMenuPopper({ }: Props) {
    const dispatch = useAppDispatch()
    const _theme = useTheme()
    const borderBottom = `1px solid ${colorScheme(_theme).greyToTertiary}`
    const elementsAction = useAppSelector((state) => state.ElementsReducer.elementAction)
    const isMarkParentsEnabled = useElementAction({ action: 'mark-parents' })
    const isMarkChildrenEnabled = useElementAction({ action: 'mark-children' })

    return (
        <Container>
            <PopupState variant='popper'>
                {(popupState) => (<>
                    <TreeButton {...bindTrigger(popupState)} sx={{ borderRight: 0, borderTopRightRadius: 0, borderBottomRightRadius: 0 }}>
                        <ListOutlinedIcon />
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
                                    borderRadius: 10
                                }
                            }
                        }}
                    >
                        <Menu>
                            <BoardsCol>
                                <MenuListItem sx={{ borderBottom, justifyContent: 'center', fontWeight: 600 }}>Boards</MenuListItem>
                                {[1, 2, 3, 4].map((board) => (
                                    <MenuListItem key={board}>
                                        {true ? <RadioButtonUncheckedOutlinedIcon /> : <RadioButtonCheckedOutlinedIcon />}
                                        Board name {board}
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
                    </PopperMenu>
                </>
                )}
            </PopupState>
        </Container>
    )
}