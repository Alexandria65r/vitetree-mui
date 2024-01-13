import { Box, Menu, MenuItem, colors, styled } from '@mui/material'
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state'
import React from 'react'
import { PickerButton } from '../../../reusable/styles'
import { _pickerButtons } from '../../../reusable/helpers'
import { useAppDispatch, useAppSelector, useParentAndSubElementsFromSubElementId } from '../../../../store/hooks'
import { getElementById, statusAndPriorityThunk } from '../../../../reducers/elements-reducer/elements-thunks'
import UserAvatar from '../../user/user-avatar'


const Container = styled(Box)(({ theme }) => ({

}))
const MenuListItem = styled(MenuItem)(({ theme }) => ({
    fontSize: 14,
    gap: 10,
    borderRadius: 10,
    borderLeft: `2px solid transparent`
}))

type Props = {
    height?: number;
    id: string
}

export default function PersonPickerPopper({ height, id }: Props) {
    const statusButtons = _pickerButtons('tasks')
    const dispatch = useAppDispatch()
    const { subElement, parentElement } = useParentAndSubElementsFromSubElementId(id)


    return (
        <Container>
            <PopupState variant='popper'>
                {(popupState) => (<>
                    <Box {...bindTrigger(popupState)}>
                        <UserAvatar avatarStyles={{ width: 25, height: 25 }} />
                    </Box>
                    <Menu {...bindMenu(popupState)}
                        transformOrigin={{
                            horizontal: 'center',
                            vertical: 'top'
                        }}
                        anchorOrigin={{
                            horizontal: 'center',
                            vertical: 'bottom'
                        }}
                        slotProps={{
                            paper: {
                                style: {
                                    padding: 10,
                                    borderRadius: 10
                                }
                            }
                        }}
                    >
                        {statusButtons['status'].map((button) => (
                            <MenuListItem sx={{ '&:hover': { borderColor: parentElement.color } }}>
                                <UserAvatar avatarStyles={{ width: 35, height: 35 }} />
                                Robert Ching'ambu
                            </MenuListItem>
                        ))}
                    </Menu>
                </>
                )}
            </PopupState>
        </Container>
    )
}