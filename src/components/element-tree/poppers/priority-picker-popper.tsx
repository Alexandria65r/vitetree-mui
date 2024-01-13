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
    id: string;
}

export default function PriorityPickerPopper({ height, id }: Props) {
    const dispatch = useAppDispatch()
    const priorityButtons = _pickerButtons('tasks')
    const element = useAppSelector((state) => getElementById(state, id))
    return (
        <Container>
            <PopupState variant='popper'>
                {(popupState) => (<>
                    <PickerButton sx={{
                        width: '100%',
                        height,
                        borderRadius: 19,
                        bgcolor: colors.amber[600],
                        border: `1px solid ${colors.amber[600]}`,
                        //color:'#000',
                        // fontWeight:600,
                        // borderTopRightRadius: 0, borderBottomRightRadius: 0
                    }}
                        {...bindTrigger(popupState)}>
                        {element?.priority?.value || 'priority'}
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

                        {priorityButtons['priority'].map((button) => (
                            <MenuListItem key={button.value}
                                onClick={() => dispatch(statusAndPriorityThunk({
                                    elementId: id,
                                    picker: button,
                                    key: 'priority'
                                }))}
                            >
                                {/* <button.icon /> */}
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