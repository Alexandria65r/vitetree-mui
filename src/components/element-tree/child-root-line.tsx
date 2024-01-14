import { Box, colors, styled } from '@mui/material'
import React from 'react'
import { useSelectedElement } from '../../../store/hooks'

const OptionsRootLine = styled(Box)(({ theme }) => ({
    width: 30,
    height: 20,
    marginTop: -8,
    marginLeft: -2, 
    borderLeft:`1px solid ${colors.grey[400]}`,
    borderBottom: `1px solid ${colors.grey[400]}`,
    borderRadius: '0 0 1px 20px'
}))


type Props = {
    color: string
}

export default function ChildRootLine({ color }: Props) {
    return <OptionsRootLine sx={{ borderColor: color }}></OptionsRootLine>
}