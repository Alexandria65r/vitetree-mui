import { Box, Checkbox, Menu, MenuItem, styled } from '@mui/material'
import React, { MutableRefObject, useRef } from 'react'
import { ElipsisText, ThemedText, colorScheme } from '../../theme'
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state'
import { BiTrash } from 'react-icons/bi'
import { HiPencil } from 'react-icons/hi'
import { MdNotes } from 'react-icons/md'
import StatusAndPriorityPickers from './poppers/status-and-priority-pickers'
import { useAppDispatch, useElementAction, useSelectedElementIndex, useSelectedElement, useSubElements } from '../../../store/hooks'
import ChildRootLine from './child-root-line'
import { elementsActions } from '../../../reducers/elements-reducer'
import { mainActions } from '../../../reducers/main-reducer'
import { OptionButton } from '../../reusable/styles'
import { subLimit } from '../../reusable/helpers'
import { useRouter } from 'next/router'
import UserAvatar from '../user/user-avatar'
import PersonPickerPopper from './poppers/person-picker-popper'


const Container = styled(Box)(({ theme }) => ({
  position: 'relative',
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
  flex: 1,
  //width: 'fit-content',
  marginTop: 10,
  //padding: 10,
  minHeight: 40,
  borderRadius: '19px 19px 19px 19px',
  //width: 280,
  cursor: 'pointer',
  backgroundColor: colorScheme(theme).lightToSecondaryColor,
  color: colorScheme(theme).TextColor,
  transition: '0.3s all',
  boxShadow: `0 1px 3px 0 ${colorScheme(theme).darkGreyToSecondary}`,
  [theme.breakpoints.up('md')]: {
    Width: 'fit-content',
    maxWidth: 280,
  },
  '&:hover': {
    transform: 'scale(1.03)'
  }
}))
const EditableElement = styled(Box)(({ theme }) => ({
  width: 'fit-content',
  padding: '6px 10px',
  borderRadius: 10,
  backgroundColor: colorScheme(theme).lightToSecondaryColor,
  color: colorScheme(theme).TextColor,
}))

const SubHead = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: 10,
  alignItems: 'center',
  borderRadius: 0,
  marginInline: 4,
  height: 35,
  paddingInline: 5,
  // boxShadow:`0 1px 3px 0 ${colorScheme(theme).greyToTertiary}`,
  //borderBottom: `1px solid ${colorScheme(theme).greyToTertiary}!important`
}))
const MenuListItem = styled(MenuItem)(({ theme }) => ({
  fontSize: 14,
  gap: 10,
  borderRadius: 10,
}))

type Props = {
  id: string;
  parent: 'main-tree' | 'element-detail'
}

export default function GroupedSubItem({ id, parent }: Props) {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const subElement = useSelectedElement(id)
  const elementPos = useSelectedElementIndex(id)
  const totalSubs = useSubElements(subElement.parentElementId ?? "")?.length;
  const color = useSelectedElement(subElement?.parentElementId ?? '')?.color
  const isSubEditting = useElementAction({ action: 'edit-sub-element', elementId: id })
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

  function RenderHeader() {
    return (
      <SubHead sx={{ borderColor: color }}>
        <Checkbox checked={false} sx={{
          m: 0, p: 0, color,
          '&.Mui-checked': {
            color,
          },
          '&.MuiSvgIcon-root': { fontSize: 23, }
        }} />
        <StatusAndPriorityPickers id={subElement._id} height={20} />
        <PersonPickerPopper id={id} />
      </SubHead>
    )
  }


  return (
    <Container>
      <ChildRootLine color={color ?? ''} />
      <PopupState variant='popper' >
        {(popupState) => (<>
          {isSubEditting ? (
            <SubElement sx={{
              padding: '4px',
              transition: 'none',
              '&:hover': {
                transform: 'none'
              }
            }}>
              <RenderHeader />
              <EditableElement ref={subElRef} contentEditable={isSubEditting} onBlur={handleBlur}
                sx={{ width: '100%', color: color, outline: 'none', fontSize: 14, border: `1px dashed ${color}` }} >
                {subElement?.name}
              </EditableElement>
            </SubElement>

          ) : (
            <SubElement sx={{ userSelect: 'none', position: 'relative' }} >
              <RenderHeader />
              <Box sx={{ padding: '0px 10px 10px 10px' }} {...bindTrigger(popupState)}>
                <ElipsisText text={subElement.name} lineClamp={parent === 'main-tree' ? 2 : 0} color={color ?? ''} sx={{ fontWeight: 500 }} />
              </Box>
            </SubElement>
          )}

          {/* {parent == 'main-tree' && totalSubs > subLimit && elementPos.index === 8  && (
            <OptionButton
              sx={{ color: color ?? '', position: 'absolute', right: -10, bottom: 0 }}
              onClick={() => {
                router.push(`${router.asPath}?view=${subElement?.parentElementId}`)
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
                itemType: 'child'
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