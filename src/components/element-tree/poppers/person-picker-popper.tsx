import { Box, Menu, MenuItem, styled } from '@mui/material'
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state'
import React from 'react'
import { _pickerButtons } from '../../../reusable/helpers'
import { useAppDispatch, useSelectedElement } from '../../../../store/hooks'
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
    id: string
    color:string
    size:number
}

export default function PersonPickerPopper({ id,color,size }: Props) {
    const statusButtons = _pickerButtons('tasks')
    const dispatch = useAppDispatch()
    const element = useSelectedElement(id)


    return (
        <Container>
            <PopupState variant='popper'>
                {(popupState) => (<>
                    <Box {...bindTrigger(popupState)}>
                        <UserAvatar avatarStyles={{ width: size, height: size }} />
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
                            <MenuListItem key={button.value} sx={{ '&:hover': { borderColor:color } }}>
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