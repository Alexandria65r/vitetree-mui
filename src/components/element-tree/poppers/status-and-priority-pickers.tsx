import { Box, SxProps, Theme, styled } from '@mui/material'
import React from 'react'
import PriorityPickerPopper from './priority-picker-popper'
import StatusPickerPopper from './status-picker-popper'
import { colorScheme } from '../../../theme'
import { PickerBtn } from '../../../reusable/interfaces'
import { UpdateElementPayload } from '../../../../reducers/elements-reducer'


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
    id: string
    pickerBtnStyles: SxProps<Theme>
    pickerButton: any
    onClick: (update: UpdateElementPayload) => void
}

export default function StatusAndPriorityPickers({ id, pickerBtnStyles, onClick, pickerButton }: Props) {
    return (
        <PickersWrapper>
            <PriorityPickerPopper id={id} onClick={onClick} MainButton={pickerButton} />
            <StatusPickerPopper onClick={onClick} MainButton={pickerButton} />
        </PickersWrapper>
    )
}