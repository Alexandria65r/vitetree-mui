import { Box, styled } from '@mui/material'
import React from 'react'
import StatusAndPriorityPickers from './poppers/status-and-priority-pickers'
import ChildRootLine from './child-root-line'
import { useSelectedElement } from '../../../store/hooks'
import { colorScheme } from '../../theme'

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: 8,
  
}))


type Props = {
  id: string
}

export default function TreePickers({ id }: Props) {
  const color = useSelectedElement(id)?.color
  return (
    <Container>
      <ChildRootLine color={color ?? ''} />
      <StatusAndPriorityPickers />
    </Container>
  )
}