
import { Box, styled } from '@mui/material'
import React from 'react'
import { ButtonIcon } from '../../reusable/styles'
import { colorScheme, ThemedText } from '../../theme'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { TfiAngleDown, TfiAngleUp } from 'react-icons/tfi'
const IconButton = styled(ButtonIcon)(({ theme }) => ({
    width: 30,
    height: 30,
    backgroundColor: colorScheme(theme).lightToSecondaryColor,
    color: colorScheme(theme).TextColor,
}))

const Container = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    height: 40,
    paddingInline:10,
    borderRadius: 5,
    backgroundColor: colorScheme(theme).lightToSecondaryColor,
    color: colorScheme(theme).TextColor,
    boxShadow: `0 1px 3px 0 ${colorScheme(theme).grayToprimaryColor}`
}))



type Props = {}

export default function MainElement({ }: Props) {
    return (
        <Container>
            <IconButton>
                <TfiAngleDown size={16} />
            </IconButton>
            <IconButton>
                <MoreVertOutlinedIcon />
            </IconButton>
            <ThemedText>Task title</ThemedText>
        </Container>
    )
}