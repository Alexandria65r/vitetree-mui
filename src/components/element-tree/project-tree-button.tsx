import React from 'react'
import { ButtonGroup, styled } from '@mui/material'
import { StyledButton } from '../../reusable/styles';
import { colorScheme } from '../../theme';
import BoardMenuPopper from './poppers/board-menu-popper';


const TreeButton = styled(StyledButton)(({ theme }) => ({
    height: 60,
    borderRadius: 29,
    color: colorScheme(theme).TextColor,
    backgroundColor: colorScheme(theme).lightToSecondaryColor,
    border: `1px solid ${colorScheme(theme).greyToTertiary}`
}))



type Props = {}

export default function ProjectTreeButton({ }: Props) {
    return (
        <ButtonGroup>
            <BoardMenuPopper />
            <TreeButton sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0, pr: 2 }}>
                Vitetree
            </TreeButton>
        </ButtonGroup>
    )
}