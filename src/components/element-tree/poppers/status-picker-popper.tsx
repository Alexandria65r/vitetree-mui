import { Box, Menu, MenuItem, colors, styled } from '@mui/material'
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state'
import React from 'react'
import { PickerButton } from '../../../reusable/styles'
import { BiDuplicate } from 'react-icons/bi'
import { MdContentCopy } from 'react-icons/md'
import { ImMoveUp } from 'react-icons/im'


const Container = styled(Box)(({ theme }) => ({
    flex: 1
}))
const MenuListItem = styled(MenuItem)(({ theme }) => ({
    fontSize: 14,
    gap: 10
}))

type Props = {
    height?: number
}

export default function StatusPickerPopper({ height }: Props) {
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
                        {...bindTrigger(popupState)}>Status</PickerButton>
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

                        <MenuListItem>
                            <BiDuplicate size={16} />
                            Duplicate
                        </MenuListItem>
                        <MenuListItem>
                            <ImMoveUp size={16} />
                            Move to
                        </MenuListItem>
                        <MenuListItem>
                            <MdContentCopy size={16} />
                            Copy from
                        </MenuListItem>

                    </Menu>
                </>
                )}
            </PopupState>
        </Container>
    )
}