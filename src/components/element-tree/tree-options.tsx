import { Box, styled } from '@mui/material'
import React from 'react'
import { OptionButton } from '../../reusable/styles'
import { HiPencil } from 'react-icons/hi'
import { MdNotes, MdAdd } from 'react-icons/md'
import ColorPickerPopper from './poppers/color-picker-popper'
import DuplicateActionsPopper from './poppers/duplicate-actions-popper'
import { useAppDispatch, useSelectedGroup } from '../../../store/hooks'
import { subLimit } from '../../reusable/helpers'
import { useRouter } from 'next/router'
import { listGroupActions } from '../../../reducers/list-group-reducer'


const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: 0,

}))

const Options = styled(Box)(({ theme }) => ({
  height: 40,
  display: 'flex',
  gap: 10,
  alignItems: 'center',
}))




type Props = {
  parent: 'main-tree' | 'element-detail';
  id: string;
  totalSubs: number
}

export default function TreeOptions({ id, totalSubs, parent }: Props) {
  const dispatch = useAppDispatch()
  const group = useSelectedGroup(id)
  const router = useRouter()


  function handleColorChange(hex: string) {
    console.log(hex)
    dispatch(listGroupActions.updateGroup({
      id,
      update: {
        key: 'color',
        value: hex
      }
    }))
  }


  function addSubElement() {
    dispatch(listGroupActions.setGroupAction({
      groupId: id,
      action: 'add-sub-element'
    }))

    if (totalSubs > subLimit && parent !== 'element-detail') {
      router.push(`${router.asPath}?view=${group?._id}`)
    }
  }

  return (
    <Container>
      {/* <ChildRootLine color={group?.color ?? ''} /> */}
      <Options sx={{ flex: 1, my: 1 }}>
        <OptionButton>
          <MdNotes size={16} color={group?.color ?? ''} />
        </OptionButton>
        <DuplicateActionsPopper id={group?._id ?? ''} />

        <OptionButton
          onClick={addSubElement}>
          <MdAdd size={16} color={group?.color ?? ''} />
        </OptionButton>
        <OptionButton onClick={() => dispatch(listGroupActions.setGroupAction({
          groupId: id,
          action: 'edit-group-name'
        }))}>
          <HiPencil size={16} color={group?.color ?? ''} />
        </OptionButton>
        <ColorPickerPopper color={group?.color ?? ''} onChange={handleColorChange} />

      </Options>
    </Container>
  )
}