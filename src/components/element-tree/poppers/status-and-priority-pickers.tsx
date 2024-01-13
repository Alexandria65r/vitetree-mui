import { Box, styled } from '@mui/material'
import React from 'react'
import PriorityPickerPopper from './priority-picker-popper'
import StatusPickerPopper from './status-picker-popper'
import { colorScheme } from '../../../theme'


const PickersWrapper = styled(Box)(({ theme }) => ({
    width: '100%',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    height: 40,
    // paddingInline: 5,
    // borderRadius: 5,
    // backgroundColor: colorScheme(theme).lightToSecondaryColor,
    // boxShadow: `0 1px 3px 0 ${colorScheme(theme).grayToprimaryColor}`
}))

type Props = {
    height?:number;
    id:string
}

export default function StatusAndPriorityPickers({height,id }: Props) {
    return (
        <PickersWrapper>
            <PriorityPickerPopper id={id} height={height} />
            <StatusPickerPopper id={id} height={height} />
        </PickersWrapper>
    )
}