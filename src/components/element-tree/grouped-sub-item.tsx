import { Box, Menu, MenuItem, styled } from '@mui/material'
import React, { MutableRefObject, useRef } from 'react'
import { colorScheme } from '../../theme'
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state'
import { BiTrash } from 'react-icons/bi'
import { HiPencil } from 'react-icons/hi'
import { MdNotes } from 'react-icons/md'
import StatusAndPriorityPickers from './poppers/status-and-priority-pickers'
import { useAppDispatch, useAppSelector, useElementAction, useSelectedElement } from '../../../store/hooks'
import { getElementById } from '../../../reducers/elements-reducer/elements-thunks'
import ChildRootLine from './child-root-line'
import { elementsActions } from '../../../reducers/elements-reducer'

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
  width: 'fit-content',
  marginTop: 10,
  padding: 10,
  fontSize: 14,
  minHeight:40,
  borderRadius: '4px 9px 9px 4px',
  cursor: 'pointer',
  backgroundColor: colorScheme(theme).lightToSecondaryColor,
  color: colorScheme(theme).TextColor,
  transition: '0.3s all',
  boxShadow: `0 1px 3px 0 ${colorScheme(theme).darkGreyToSecondary}`,
  [theme.breakpoints.up('md')]: {
    width: 'fit-content',
    maxWidth: 280,
  },
  '&:hover': {
    transform: 'scale(1.03)'
  }
}))
const EditableElement = styled(Box)(({ theme }) => ({
  width: 'fit-content',
  padding: '8px 10px',
  borderRadius: 5,
  backgroundColor: colorScheme(theme).lightToSecondaryColor,
  color: colorScheme(theme).TextColor,
}))

const MenuListItem = styled(MenuItem)(({ theme }) => ({
  fontSize: 14,
  gap: 10
}))

type Props = {
  id: string
}

export default function GroupedSubItem({ id }: Props) {
  const dispatch = useAppDispatch()
  const subElement = useSelectedElement(id)
  const color = useSelectedElement(subElement?.parentElementId ?? '')?.color
  const isSubEditting = useElementAction({ action: 'edit-sub-element', elementId: id })
  const subElRef: MutableRefObject<HTMLDivElement | any> = useRef()
  function handleBlur() {
    console.log(subElRef.current.innerHTML)
    dispatch(elementsActions.updateElement({
      id,
      update: {
        key: 'name',
        value: subElRef.current.innerHTML
      }
    }))
    dispatch(elementsActions.clearElementAction())
  }


  return (
    <Container>
      <ChildRootLine color={color ?? ''} />
      <PopupState variant='popper'>
        {(popupState) => (<>

          {isSubEditting ? (
            <SubElement sx={{
              padding: '4px',
              transition: 'none',
              '&:hover': {
                transform: 'none'
              }
            }}>
              <EditableElement ref={subElRef} contentEditable={isSubEditting} onBlur={handleBlur}
                sx={{ color: color, outline: 'none', border: `1px dashed ${color}` }} >
                {subElement?.name}
              </EditableElement>
            </SubElement>

          ) : (
            <SubElement sx={{ color: color, userSelect: 'none',  }} {...bindTrigger(popupState)}>
              {subElement?.name}
            </SubElement>
          )}


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
            <StatusAndPriorityPickers height={30} />
            <MenuListItem sx={{ mt: 1 }}
              onClick={() => {
                dispatch(elementsActions.setElementAction({
                  elementId: id,
                  action: 'edit-sub-element'
                }))
                popupState.close()
              }}
            >
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
    </Container >
  )
}