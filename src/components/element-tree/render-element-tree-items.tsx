import React, { useState } from 'react'
import { Box, styled } from '@mui/material'
import ProjectTreeButton from './project-tree-button';
import { StyledButton, StyledInput } from '../../reusable/styles';
import { Add } from '@mui/icons-material';
import { colorScheme } from '../../theme';
import ElementTreeItem from './element-tree-item';
import { Element } from '../../models/element';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { elementsActions } from '../../../reducers/elements-reducer';
import { AddNewElementThunk } from '../../../reducers/elements-reducer/elements-thunks';

const Container = styled(Box)(({ theme }) => ({
    [theme.breakpoints.up('xl')]: {
        width: '85%',
        margin: 'auto'
    }
}))
const MappedElements = styled(Box)(({ theme }) => ({
    display: 'grid', gap: 15,
    [theme.breakpoints.down('sm')]: {

    },
    [theme.breakpoints.up('md')]: {
        gridTemplateColumns: 'repeat(3,1fr)',
    },
    [theme.breakpoints.up('xl')]: {
        gridTemplateColumns: 'repeat(4,1fr)',
    }
}))
const NewElementWrapper = styled(Box)(() => ({
    padding: '10px 0 10px 30px'
}))
const Input = styled(StyledInput)(({ theme }) => ({
    color: colorScheme(theme).TextColor,
    paddingInline: 18,
    borderRadius: 29,
    backgroundColor: colorScheme(theme).lightToSecondaryColor,
    boxShadow: `0 1px 3px 0 ${colorScheme(theme).darkGreyToSecondary}`
}))

const NewElementButton = styled(StyledButton)(({ theme }) => ({
    fontSize: 15,
    fontWeight: 500,
    borderRadius: 25,
    paddingInline: 15,
    backgroundColor: colorScheme(theme).lightToSecondaryColor,
    color: colorScheme(theme).TextColor,
    boxShadow: `0 1px 3px 0 ${colorScheme(theme).darkGreyToSecondary}`
}))


type Props = {
    elements: Element[]
}

export default function RenderElementTreeItems({ elements }: Props) {
    const dispatch = useAppDispatch()
    const [isAddNewElement, toggleAddNewElement] = useState(false)
    const newElementName = useAppSelector((state) => state.ElementsReducer.newElementName)
    function create() {
        dispatch(AddNewElementThunk({ elementType: 'parent', cartegory: 'task' }))
        toggleAddNewElement(false)
    }

    return (
        <Container>
            <ProjectTreeButton />
            <MappedElements>
                {elements?.map((element) => (
                    <ElementTreeItem key={element._id} element={element} parent='main-tree' />
                ))}
            </MappedElements>
            <NewElementWrapper>
                {isAddNewElement ?
                    (
                        <Input placeholder='New Task'
                            value={newElementName}
                            onChange={({ target }) => dispatch(elementsActions.setNewElementName(target.value))}
                            onBlur={create}
                            autoFocus />) : (
                        <NewElementButton onClick={() => toggleAddNewElement(!isAddNewElement)}>
                            <Add sx={{ mr: 0 }} /> New Task
                        </NewElementButton>
                    )}
            </NewElementWrapper>
        </Container>
    )
}