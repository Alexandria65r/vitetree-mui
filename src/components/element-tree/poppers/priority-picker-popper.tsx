import { Box, Menu, MenuItem, SxProps, Theme, colors, styled } from '@mui/material'
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state'
import React from 'react'
import { PickerButton } from '../../../reusable/styles'
import { _pickerButtons } from '../../../reusable/helpers'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import { getElementById, updateElementThunk } from '../../../../reducers/elements-reducer/elements-thunks'
import RadioButtonCheckedOutlinedIcon from '@mui/icons-material/RadioButtonCheckedOutlined';
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import { UpdateElementPayload } from '../../../../reducers/elements-reducer'



const Container = styled(Box)(({ theme }) => ({
    flex: 1
}))
const MenuListItem = styled(MenuItem)(({ theme }) => ({
    fontSize: 14,
    gap: 10,
    borderRadius: 10,
}))

type Props = {
    id?:string
    MainButton: any
    onClick: (update: UpdateElementPayload) => void
}

export default function PriorityPickerPopper({id, MainButton, onClick }: Props) {
    const dispatch = useAppDispatch()
    const priorityButtons = _pickerButtons('tasks')
    const element = useAppSelector((state) => getElementById(state, id??''))
    return (
        <Container>
            <PopupState variant='popper'>
                {(popupState) => (<>
                    <MainButton bindTrigger={bindTrigger(popupState)} picker='priority' bgColor={colors.amber[600]} />

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
                                onClick={() => {
                                    onClick({key:'priority',value:button})
                                    popupState.close()
                                }}
                            >

                                {element.priority?.value === button.value ?
                                    <RadioButtonCheckedOutlinedIcon /> : <RadioButtonUncheckedOutlinedIcon />
                                }
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