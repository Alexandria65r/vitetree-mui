import { Box, styled } from '@mui/material'
import React from 'react'
import PriorityPickerPopper from './priority-picker-popper'
import StatusPickerPopper from './status-picker-popper'


const PickersWrapper = styled(Box)(({ theme }) => ({
    width:'100%',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: 1,

}))

type Props = {}

export default function StatusAndPriorityPickers({}: Props) {
  return (
      <PickersWrapper>
          <PriorityPickerPopper />
          <StatusPickerPopper />
      </PickersWrapper>
  )
}