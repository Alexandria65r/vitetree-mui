import { Box, Menu, MenuItem, styled } from '@mui/material'
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state'
import React from 'react'
import { OptionButton } from '../../../reusable/styles'
import { CirclePicker } from 'react-color'
import { colors } from '../../../reusable/helpers'
import { BiColorFill, BiDuplicate } from 'react-icons/bi'
import { MdContentCopy } from 'react-icons/md'
import { ImMoveUp } from 'react-icons/im'
import {  useSelectedGroup } from '../../../../store/hooks'


const Container = styled(Box)(({ theme }) => ({

}))
const MenuListItem = styled(MenuItem)(({ theme }) => ({
    fontSize:14,
    gap:10
}))

type Props = {
 id:string
}

export default function DuplicateActionsPopper({id }: Props) {
    const color = useSelectedGroup(id)?.color
    return (
        <Container>
            <PopupState variant='popper'>
                {(popupState) => (<>
                    <OptionButton {...bindTrigger(popupState)}>
                        <BiDuplicate size={16} color={color??''} />
                    </OptionButton>
                    <Menu {...bindMenu(popupState)}
                        transformOrigin={{
                            horizontal: 'right',
                            vertical: 'bottom'
                        }}
                        anchorOrigin={{
                            horizontal: 'right',
                            vertical: 'top'
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