import { Box, Menu, MenuItem, SxProps, Theme, colors, styled } from '@mui/material'
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state'
import React from 'react'
import { PickerButton } from '../../../reusable/styles'
import { _pickerButtons } from '../../../reusable/helpers'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import { getElementById, statusAndPriorityThunk } from '../../../../reducers/elements-reducer/elements-thunks'
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';

const Container = styled(Box)(({ theme }) => ({
    flex: 1
}))
const MenuListItem = styled(MenuItem)(({ theme }) => ({
    fontSize: 14,
    gap: 10,
    borderRadius: 10,
}))

type Props = {
    id: string
    pickerBtnStyles: SxProps<Theme>
}

export default function StatusPickerPopper({ id, pickerBtnStyles }: Props) {
    const statusButtons = _pickerButtons('tasks')
    const dispatch = useAppDispatch()
    const element = useAppSelector((state) => getElementById(state, id))



    return (
        <Container>
            <PopupState variant='popper'>
                {(popupState) => (<>
                    <PickerButton sx={{
                        borderRadius: 19,
                        width: '100%',
                        bgcolor: colors.green[400],
                        border: `1px solid ${colors.green[400]}`,
                        // borderTopLeftRadius: 0, borderBottomLeftRadius: 0
                        ...pickerBtnStyles
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
                                key={button.value}
                                onClick={() => dispatch(statusAndPriorityThunk({
                                    elementId: id,
                                    picker: button,
                                    key: 'status'
                                }))}>
                                <button.icon size={16} />
                                {button.value}
                            </MenuListItem>

                        ))}
                        <MenuListItem sx={{
                            mt: 1,
                            color: '#fff',
                            backgroundColor: colors.teal[500],
                            '&:hover': {
                                backgroundColor: colors.teal[500],
                            }
                        }}>
                            <DriveFileRenameOutlineOutlinedIcon />
                            Custom labels
                        </MenuListItem>
                    </Menu>
                </>
                )}
            </PopupState>
        </Container>
    )
}