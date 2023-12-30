import { Box, styled } from '@mui/material'
import React from 'react'
import { colorScheme } from '../../theme'
import { ButtonIcon, StyledInput } from '../../reusable/styles'
import { BiColorFill, BiDuplicate } from 'react-icons/bi'
import { HiPencil } from 'react-icons/hi'
import { MdNotes, MdAdd } from 'react-icons/md'



const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: 10,

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
  height: 40,
  display: 'flex',
  gap: 10,
  alignItems: 'center',
}))

const Input = styled(StyledInput)(({ theme }) => ({
  paddingInline: 18,
  borderRadius:5,
  backgroundColor: colorScheme(theme).lightToSecondaryColor,
  boxShadow: `0 1px 3px 0 ${colorScheme(theme).grayToprimaryColor}`
}))

type Props = {}

export default function SubItemInput({ }: Props) {
  return (
    <Container>
      <OptionsRootLine></OptionsRootLine>
      <Options sx={{ flex: 1 }}>
        <Input placeholder='Add Sub Task'/>
      </Options>
    </Container>
  )
}