import { Box, Menu, MenuItem, SxProps, Theme, colors, styled } from '@mui/material'
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state'
import React from 'react'
import { PickerButton } from '../../../reusable/styles'
import { _pickerButtons } from '../../../reusable/helpers'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import { getElementById, updateElementThunk } from '../../../../reducers/elements-reducer/elements-thunks'
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import { PickerBtn } from '../../../reusable/interfaces'
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
    
    MainButton: any
    onClick: (update: UpdateElementPayload) => void
}

export default function StatusPickerPopper({ MainButton, onClick }: Props) {
    const statusButtons = _pickerButtons('tasks')
    const dispatch = useAppDispatch()




    return (
        <Container>
            <PopupState variant='popper'>
                {(popupState) => (<>
                    <MainButton bindTrigger={bindTrigger(popupState)} picker='status' bgColor={colors.green[400]} />
                
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
                                onClick={() => {
                                    onClick({key:'status', value:button})
                                    popupState.close()
                                }}>
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
        </Container >
    )
}