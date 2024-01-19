import { Box, styled } from '@mui/material'
import React from 'react'
import StatusAndPriorityPickers from './poppers/status-and-priority-pickers'
import ChildRootLine from './child-root-line'
import { useGroupColorByElementId, useSelectedElement } from '../../../store/hooks'

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: 8,
  
}))


type Props = {
  id: string
}

export default function TreePickers({ id }: Props) {
  const color = useGroupColorByElementId(id)
  return (
    <Container>
      <ChildRootLine color={color ?? ''} />
    {/* <StatusAndPriorityPickers id={id}/> */}
    </Container>
  )
}