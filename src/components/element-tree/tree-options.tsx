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
  id: string
}

export default function TreeOptions({ id }: Props) {
  const dispatch = useAppDispatch()
  const element = useAppSelector((state) => getElementById(state, id))

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
          <MdNotes size={16} color={element?.color??''} />
        </OptionButton>
        <DuplicateActionsPopper id={element?._id??''} />

        <OptionButton
          onClick={() => dispatch(elementsActions.setElementAction({
            elementId: id,
            action: 'add-sub-element'
          }))}>
          <MdAdd size={16} color={element?.color??''} />
        </OptionButton>
        <OptionButton onClick={() => dispatch(elementsActions.setElementAction({
          elementId: id,
          action: 'edit-element'
        }))}>
          <HiPencil size={16} color={element?.color??''} />
        </OptionButton>
        <ColorPickerPopper color={element?.color ?? ''} onChange={handleColorChange} />
      </Options>
    </Container>
  )
}