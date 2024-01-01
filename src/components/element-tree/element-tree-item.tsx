import React, { useState } from 'react'
import { Box, colors, styled } from '@mui/material'
import { ButtonIcon, StyledButton, StyledInput } from '../../reusable/styles';
import { colorScheme } from '../../theme';
import MainElement from './main-element';
import UserAvatar from '../user/user-avatar';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import GroupedSubItem from './grouped-sub-item';
import TreeOptions from './tree-options';
import TreePickers from './tree-pickers';
import SubItemInput from './sub-item-input';
import { Element } from '../../models/element';
import { useAppDispatch, useAppSelector, useSubElements } from '../../../store/hooks';
import { mainActions } from '../../../reducers/main-reducer';

const Container = styled(Box)(() => ({

}))


const ElementItemWrapper = styled(Box)(() => ({
    width: 'fit-content',
    marginTop: 10,
}))
const MainElementWrapper = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    justifyContent: 'flex-start'
}))



const SubElementWrapper = styled(Box)(() => ({
    marginLeft: 15,
    borderBottomLeftRadius: 6,
    borderLeft: `6px solid ${colors.grey[400]}`
}))

const DeleteButton = styled(ButtonIcon)(({ theme }) => ({
    width: 40,
    height: 40,
    borderRadius: 15,
    backgroundColor: colorScheme(theme).lightToSecondaryColor,
    color: colorScheme(theme).TextColor,
    boxShadow: `0 1px 3px 0 ${colorScheme(theme).grayToprimaryColor}`
}))

type Props = {
    element: Element
}

export default function ElementTreeItem({ element }: Props) {
    const dispatch = useAppDispatch()
    const elementAction = useAppSelector((state) => state.ElementsReducer.elementAction)
    const collapedItems = useAppSelector((state) => state.ElementsReducer.collapedItems)
    const subElements = useSubElements(element._id)
    const isAddNewSubElement = elementAction.action === 'add-sub-element' && element._id === elementAction.elementId
    const showElementDeleteButton = elementAction.action === 'show-element-delete-button' && element._id === elementAction.elementId


    return (
        <Container>
            <ElementItemWrapper>
                <MainElementWrapper>
                    <UserAvatar avatarStyles={null} />
                    <MainElement id={element._id} />
                    {showElementDeleteButton && (
                        <DeleteButton
                            onClick={() => dispatch(mainActions.setModal({
                                component: 'delete-element-item',
                                itemId: element._id
                            }))}>
                            <DeleteOutlineIcon />
                        </DeleteButton>
                    )}
                </MainElementWrapper>
                <SubElementWrapper sx={{ borderColor: element?.color }}>
                    <TreePickers id={element._id} />
                    {!collapedItems.includes(element._id) && (<>
                        {subElements.map((subElement) => (
                            <GroupedSubItem id={subElement._id} />
                        ))}
                    </>)}
                    {isAddNewSubElement && (
                        <SubItemInput id={element._id} />
                    )}
                    <TreeOptions id={element._id} />
                </SubElementWrapper>
            </ElementItemWrapper>
        </Container>
    )
}