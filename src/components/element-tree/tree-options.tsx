import { Box, styled } from '@mui/material'
import React from 'react'
import { colorScheme } from '../../theme'
import { ButtonIcon, OptionButton } from '../../reusable/styles'
import { BiColorFill, BiDuplicate } from 'react-icons/bi'
import { HiPencil } from 'react-icons/hi'
import { MdNotes, MdAdd } from 'react-icons/md'
import ColorPickerPopper from './poppers/color-picker-popper'
import DuplicateActionsPopper from './poppers/duplicate-actions-popper'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { getElementById } from '../../../reducers/elements-reducer/elements-thunks'
import { elementsActions } from '../../../reducers/elements-reducer'
import ChildRootLine from './child-root-line'
import VerticalAlignBottom from '@mui/icons-material/VerticalAlignBottom';
import { subLimit } from '../../reusable/helpers'
import { useRouter } from 'next/router'


const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: 10,

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

export default function TreeOptions({ id, totalSubs,parent }: Props) {
  const dispatch = useAppDispatch()
  const element = useAppSelector((state) => getElementById(state, id))
  const router = useRouter()
  function handleColorChange(hex: string) {
    console.log(hex)
    dispatch(elementsActions.updateElement({
      id,
      update: {
        key: 'color',
        value: hex
      }
    }))
  }

  return (
    <Container>
      <ChildRootLine color={element?.color ?? ''} />
      <Options sx={{ flex: 1 }}>
        <OptionButton>
          <MdNotes size={16} color={element?.color ?? ''} />
        </OptionButton>
        <DuplicateActionsPopper id={element?._id ?? ''} />

        <OptionButton
          onClick={() => dispatch(elementsActions.setElementAction({
            elementId: id,
            action: 'add-sub-element'
          }))}>
          <MdAdd size={16} color={element?.color ?? ''} />
        </OptionButton>
        <OptionButton onClick={() => dispatch(elementsActions.setElementAction({
          elementId: id,
          action: 'edit-element'
        }))}>
          <HiPencil size={16} color={element?.color ?? ''} />
        </OptionButton>
        <ColorPickerPopper color={element?.color ?? ''} onChange={handleColorChange} />
        {parent=='main-tree'&& totalSubs > subLimit && (
          <OptionButton
            sx={{ color: element?.color ?? '' }}
            onClick={() => router.push(`${router.asPath}?view=${element?._id}`)}>
            {totalSubs - subLimit}+
          </OptionButton>
        )}
      </Options>
    </Container>
  )
}