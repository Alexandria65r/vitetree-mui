import { Box, Menu, MenuItem, styled } from '@mui/material'
import React from 'react'
import { colorScheme } from '../../theme'
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state'
import { BiTrash } from 'react-icons/bi'
import { HiPencil } from 'react-icons/hi'
import { MdNotes } from 'react-icons/md'
import StatusAndPriorityPickers from './poppers/status-and-priority-pickers'

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',

}))
const SubElementRootLine = styled(Box)(({ theme }) => ({
  width: 36,
  height: 20,
  marginLeft: -2,
  borderLeft: '1px solid #000',
  borderBottom: '1px solid #000',
  borderRadius: '0 0 1px 20px'
}))
const SubElement = styled(Box)(({ theme }) => ({
  flex:1,
  marginTop: 10,
  padding: 10,
  borderRadius: 5,
  cursor:'pointer',
  backgroundColor: colorScheme(theme).lightToSecondaryColor,
  color: colorScheme(theme).TextColor,
  boxShadow: `0 1px 3px 0 ${colorScheme(theme).grayToprimaryColor}`
}))

const MenuListItem = styled(MenuItem)(({ theme }) => ({
  fontSize: 14,
  gap: 10
}))

type Props = {}

export default function GroupedSubItem({ }: Props) {
  return (
    <Container>
      <SubElementRootLine></SubElementRootLine>
      <PopupState variant='popper'>
        {(popupState) => (<>
          <SubElement {...bindTrigger(popupState)}>
            sub element
          </SubElement>

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
            <StatusAndPriorityPickers />
            <MenuListItem sx={{mt:1}}>
              <HiPencil size={16} />
              Edit
            </MenuListItem>
            <MenuListItem>
              <MdNotes size={16} />
              Item Update
            </MenuListItem>
            <MenuListItem>
              <BiTrash size={16} />
              Delete</MenuListItem>
          </Menu>

        </>
        )}
      </PopupState>
    </Container>
  )
}