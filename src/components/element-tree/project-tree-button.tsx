import React from 'react'
import Layout from '../../components/layout'
import { ButtonGroup, styled } from '@mui/material'
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import { StyledButton } from '../../reusable/styles';
import { colorScheme } from '../../theme';

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
            <TreeButton sx={{ borderRight: 0, borderTopRightRadius: 0, borderBottomRightRadius: 0 }}>
                <ListOutlinedIcon />
            </TreeButton>
            <TreeButton sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0, pr: 2 }}>
                Vitetree
            </TreeButton>
        </ButtonGroup>
    )
}