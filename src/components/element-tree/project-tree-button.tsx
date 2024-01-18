import React from 'react'
import { Box, ButtonGroup, styled } from '@mui/material'
import BoardMenuPopper from './poppers/board-menu-popper';

import { useAppSelector } from '../../../store/hooks';
import BoardsListMenuPopper from './poppers/boards-list-menu-popper';

const Container = styled(Box)(({ theme }) => ({
    [theme.breakpoints.up('sm')]: {
        //display: 'none'
    }
}))





type Props = {}

export default function ProjectTreeButton({ }: Props) {
    const selectedBoard = useAppSelector((state) => state.BoardReducer.selectedBoard)
    return (
        <Container>
            <ButtonGroup>
                <BoardMenuPopper />
                <BoardsListMenuPopper />
            </ButtonGroup>
        </Container>
    )
}