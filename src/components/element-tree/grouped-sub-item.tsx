import { Box, Checkbox, Menu, MenuItem, SxProps, Theme, styled } from '@mui/material'
import React, { MutableRefObject, useRef } from 'react'
import { ElipsisText, colorScheme } from '../../theme'
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state'
import { BiTrash } from 'react-icons/bi'
import { HiPencil } from 'react-icons/hi'
import { MdNotes } from 'react-icons/md'
import StatusAndPriorityPickers from './poppers/status-and-priority-pickers'
import { useAppDispatch, useElementAction, useSelectedElement, useGroupColorByElementId } from '../../../store/hooks'
import ChildRootLine from './child-root-line'
import { elementsActions } from '../../../reducers/elements-reducer'
import { mainActions } from '../../../reducers/main-reducer'
import PersonPickerPopper from './poppers/person-picker-popper'
import ElementCellHeader from './element-cell-header'


const Container = styled(Box)(() => ({
  width: '100%',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',

}))
const Element = styled(Box)(({ theme }) => ({
  flexBasis: '100%',
  //width: 'fit-content',
  marginTop: 4,
  //padding: 10,
  minHeight: 40,
  borderRadius: 8,
  //width: 280,
  cursor: 'pointer',
  backgroundColor: colorScheme(theme).lightToSecondaryColor,
  color: colorScheme(theme).TextColor,
  transition: '0.3s all',
  boxShadow: `0 1px 1px 0 ${colorScheme(theme).darkGreyToSecondary}`,
  //borderBottom: `1px solid ${colorScheme(theme).greyToTertiary}`,
  [theme.breakpoints.up('md')]: {
    Width: 'fit-content',
    //maxWidth: 320,
  },
  '&:hover': {
    transform: 'scale(1.01)'
  }
}))
const EditableElement = styled(Box)(({ theme }) => ({
  width: 'fit-content',
  padding: '6px 10px',
  borderRadius: 10,
  backgroundColor: colorScheme(theme).lightToSecondaryColor,
  color: colorScheme(theme).TextColor,
}))


const MenuListItem = styled(MenuItem)(() => ({
  fontSize: 14,
  gap: 10,
  borderRadius: 10,
}))

type Props = {
  id: string;
  elemetStyles?: SxProps<Theme>
  parent: 'main-tree' | 'element-detail'
}

export default function GroupedSubItem({ id, parent, elemetStyles }: Props) {
  const dispatch = useAppDispatch()
  const element = useSelectedElement(id)
  const color = useGroupColorByElementId(id)
  const isSubEditting = useElementAction({ action: 'edit-sub-element', elementId: id })
  const isMarkEnabled = useElementAction({ action: 'mark-children' })

  const subElRef: MutableRefObject<HTMLDivElement | any> = useRef()
  function handleBlur() {
    console.log(subElRef.current.innerHTML)
    dispatch(elementsActions.updateElement({
      id,
      update: {
        key: 'name',
        value: subElRef.current.innerText
      }
    }))
    dispatch(elementsActions.clearElementAction())
  }




  return (
    <Container>
      {/* <ChildRootLine color={color ?? ''} /> */}
      <PopupState variant='popper' >
        {(popupState) => (<>
          {isSubEditting ? (
            <Element sx={{
              maxWidth: parent === 'element-detail' ? 'fit-content' : 320,
              padding: '4px',
              transition: 'none',
              '&:hover': {
                transform: 'none'
              },
              ...elemetStyles
            }}>
              {parent === 'main-tree' && (
                <ElementCellHeader id={id} color={color} avataSize={25} pickerBtnStyles={{ height: 20 }} />
              )}
              <EditableElement ref={subElRef} contentEditable={isSubEditting} onBlur={handleBlur}
                sx={{ width: '100%', color: color, outline: 'none', fontSize: 14, border: `1px dashed ${color}` }} >
                {element?.name}
              </EditableElement>
            </Element>

          ) : (
            <Element sx={{ maxWidth: parent === 'element-detail' ? '100%' : 320, userSelect: 'none', position: 'relative', ...elemetStyles }}>
              {parent === 'main-tree' && (
                <ElementCellHeader id={id} color={color} avataSize={25} pickerBtnStyles={{ height: 20 }} />
              )}
              <Box sx={{ padding: '0px 10px 5px 10px' }} onClick={
                () => dispatch(elementsActions.setSelectedElementId(id))}>
                <ElipsisText text={element.name} lineClamp={parent === 'main-tree' ? 2 : 0} color={color ?? ''} sx={{ fontSize: 14, lineHeight: '1.3' }} />
              </Box>
            </Element>
          )}

          {/* {parent == 'main-tree' && totalSubs > subLimit && elementPos.index === 8  && (
            <OptionButton
              sx={{ color: color ?? '', position: 'absolute', right: -10, bottom: 0 }}
              onClick={() => {
                router.push(`${router.asPath}?view=${element?.parentElementId}`)
                popupState.close()
              }}>
              {totalSubs - subLimit}+
            </OptionButton>
          )} */}


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
                  width: '30%',
                  height: 400,
                  padding: 10,
                  borderRadius: 10
                }
              }
            }}
          >

            <MenuListItem
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
            <MenuListItem
              onClick={() => dispatch(mainActions.setModal({
                component: 'delete-element-item',
                itemId: id,
                itemType: 'list-group-element'
              }))}>
              <BiTrash size={16} />
              Delete</MenuListItem>
          </Menu>

        </>
        )}
      </PopupState>
    </Container >
  )
}