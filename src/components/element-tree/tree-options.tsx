import { Box, styled } from '@mui/material'
import React from 'react'
import { colorScheme } from '../../theme'
import { ButtonIcon, OptionButton } from '../../reusable/styles'
import { BiColorFill, BiDuplicate } from 'react-icons/bi'
import { HiPencil } from 'react-icons/hi'
import { MdNotes,MdAdd } from 'react-icons/md'
import ColorPickerPopper from './poppers/color-picker-popper'
import DuplicateActionsPopper from './poppers/duplicate-actions-popper'



const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop:10,

}))
const OptionsRootLine = styled(Box)(({ theme }) => ({
  width: 36,
  height: 20,
  marginTop: -8,
  marginLeft: -2,
  borderLeft: '1px solid #000',
  borderBottom: '1px solid #000',
  borderRadius: '0 0 1px 20px'
}))
const Options = styled(Box)(({ theme }) => ({
  height:40,
  display: 'flex',
  gap:10,
  alignItems: 'center',
}))




type Props = {}

export default function TreeOptions({ }: Props) {
  return (
    <Container>
      <OptionsRootLine></OptionsRootLine>
      <Options sx={{ flex: 1 }}>
        <OptionButton>
          <MdNotes size={16}/>
        </OptionButton>
        <DuplicateActionsPopper/>

        <OptionButton>
          <MdAdd size={16}/>
        </OptionButton>
        <OptionButton>
          <HiPencil size={16}/>
        </OptionButton>
        <ColorPickerPopper color='' onChange={()=>{}}/>
      </Options>
    </Container>
  )
}