import { Box, styled } from '@mui/material'
import React from 'react'
import { StyledButton } from '../../reusable/styles'
import PriorityPickerPopper from './poppers/priority-picker-popper'
import StatusPickerPopper from './poppers/status-picker-popper'
import StatusAndPriorityPickers from './poppers/status-and-priority-pickers'

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: 8,
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





type Props = {}

export default function TreePickers({ }: Props) {
  return (
    <Container>
      <OptionsRootLine></OptionsRootLine>
      <StatusAndPriorityPickers />
    </Container>
  )
}