import { Box, Menu, MenuItem, colors, styled } from '@mui/material'
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state'
import React from 'react'
import { PickerButton } from '../../../reusable/styles'
import { BiDuplicate } from 'react-icons/bi'
import { MdContentCopy } from 'react-icons/md'
import { ImMoveUp } from 'react-icons/im'
import { _pickerButtons } from '../../../reusable/helpers'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import { getElementById, statusAndPriorityThunk } from '../../../../reducers/elements-reducer/elements-thunks'


const Container = styled(Box)(({ theme }) => ({
    flex: 1
}))
const MenuListItem = styled(MenuItem)(({ theme }) => ({
    fontSize: 14,
    gap: 10
}))

type Props = {
    height?: number;
    id: string
}

export default function StatusPickerPopper({ height, id }: Props) {
    const statusButtons = _pickerButtons('tasks')
    const dispatch = useAppDispatch()
    const element = useAppSelector((state) => getElementById(state, id))



    return (
        <Container>
            <PopupState variant='popper'>
                {(popupState) => (<>
                    <PickerButton sx={{
                        height,
                        borderRadius: 19,
                        width: '100%',
                        bgcolor: colors.green[400],
                        border: `1px solid ${colors.green[400]}`,
                        // borderTopLeftRadius: 0, borderBottomLeftRadius: 0
                    }}
                        {...bindTrigger(popupState)}>
                        {element.status?.value || 'status'}
                    </PickerButton>
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
                            <MenuListItem
                                onClick={() => dispatch(statusAndPriorityThunk({
                                    elementId: id,
                                    picker: button,
                                    key: 'status'
                                }))}>
                                <button.icon size={16} />
                                {button.value}
                            </MenuListItem>

                        ))}
                    </Menu>
                </>
                )}
            </PopupState>
        </Container>
    )
}