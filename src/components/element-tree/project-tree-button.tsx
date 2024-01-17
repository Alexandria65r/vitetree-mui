import React from 'react'
import { Box, ButtonGroup, styled } from '@mui/material'
import { StyledButton } from '../../reusable/styles';
import { colorScheme } from '../../theme';
import BoardMenuPopper from './poppers/board-menu-popper';
import { HiOutlineChevronDown } from "react-icons/hi2";
import { useAppSelector } from '../../../store/hooks';

const Container = styled(Box)(({ theme }) => ({
    [theme.breakpoints.up('sm')]: {
        //display: 'none'
    }
}))

const TreeButton = styled(StyledButton)(({ theme }) => ({
    height: 60,
    borderRadius: 29,
    color: colorScheme(theme).TextColor,
    backgroundColor: colorScheme(theme).lightToSecondaryColor,
    border: `1px solid ${colorScheme(theme).greyToTertiary}`,

}))



type Props = {}

export default function ProjectTreeButton({ }: Props) {
    const selectedBoard = useAppSelector((state) => state.BoardReducer.selectedBoard)
    return (
        <Container>
            <ButtonGroup>
                <BoardMenuPopper />
                <TreeButton sx={{color:selectedBoard.color, borderTopLeftRadius: 0, borderBottomLeftRadius: 0, pr: 2 }}>
                    {selectedBoard.name}
                    <HiOutlineChevronDown size={20} style={{ marginLeft:6 }} />
                </TreeButton>
            </ButtonGroup>
        </Container>
    )
}