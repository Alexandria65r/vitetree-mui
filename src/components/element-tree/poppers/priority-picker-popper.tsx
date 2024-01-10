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

export default function PriorityPickerPopper({ height }: Props) {
    return (
        <Container>
            <PopupState variant='popper'>
                {(popupState) => (<>
                    <PickerButton sx={{
                        width: '100%',
                        height,
                        borderRadius: 19,
                        border: `1px solid ${colors.amber[600]}`,
                        //color:'#000',
                        // fontWeight:600,
                        // borderTopRightRadius: 0, borderBottomRightRadius: 0
                    }}
                        {...bindTrigger(popupState)}>Priority</PickerButton>
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