import React, { useState } from 'react'
import { Box, colors, styled } from '@mui/material'
import { ButtonIcon, } from '../../reusable/styles';
import { colorScheme } from '../../theme';
import MainElement from './main-element';
import UserAvatar from '../user/user-avatar';

import GroupedSubItem from './grouped-sub-item';
import TreeOptions from './tree-options';
import TreePickers from './tree-pickers';
import SubItemInput from './sub-item-input';
import { Element } from '../../models/element';
import { useAppDispatch, useAppSelector, useElementAction, useSubElements } from '../../../store/hooks';
import { mainActions } from '../../../reducers/main-reducer';
import { useMeasure } from "react-use";
import { subLimit } from '../../reusable/helpers';


const Container = styled(Box)(() => ({
    width: 'fit-content',  
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
    marginLeft: 0,
    borderBottomLeftRadius: 6,
    borderLeft: `6px solid ${colors.grey[400]}`
}))
const MappedSubElements = styled(Box)(() => ({
    //overflowX: 'hidden',
    //overflowY: 'hidden',
    //padding:10,
}))






const OverflowItem = styled(Box)(({ theme }) => ({
    width: 'fit-content',
    marginTop: 10,
    padding: 10,
    fontSize: 14,
    minHeight: 40,
    borderRadius: '4px 9px 9px 4px',
    cursor: 'pointer',
    backgroundColor: colorScheme(theme).lightToSecondaryColor,
    color: colorScheme(theme).TextColor,
    transition: '0.3s all',
    boxShadow: `0 1px 3px 0 ${colorScheme(theme).darkGreyToSecondary}`,

}))




type Props = {
    element: Element
    parent: 'main-tree' | 'element-detail'
}

export default function ElementTreeItem({ element, parent }: Props) {
    const dispatch = useAppDispatch()
    const collapedItems = useAppSelector((state) => state.ElementsReducer.collapedItems)
    const subElements = useSubElements(element._id);
   
    const slicedSubElements = subElements.slice(0, parent === 'main-tree' ? subLimit : 999)
    const isAddNewSubElement = useElementAction({ action: 'add-sub-element', elementId: element._id })




    const [ref, { x, y, width, height, top, right, bottom, left }] = useMeasure();

    console.log(`item-height: ${height}`)

    return (
        <Container >
            <ElementItemWrapper>
                <MainElementWrapper>
                    {/* <UserAvatar avatarStyles={null} /> */}
                    <MainElement parent={parent} id={element._id} />
                   
                </MainElementWrapper>
                <SubElementWrapper sx={{ borderColor: element?.color }}>
                    {/* <TreePickers id={element._id} /> */}
                    {!collapedItems.includes(element._id) && (
                        <MappedSubElements ref={ref}
                            sx={{
                                //minHeight: 'auto',
                                maxHeight: parent === 'main-tree' ? 'calc(100vh - 300px)': 'auto',
                                overflowY: parent === 'element-detail' ? 'auto' : 'auto'
                            }}>
                            {subElements?.map((subElement) => (
                                <GroupedSubItem key={subElement._id} parent={parent} id={subElement._id} />
                            ))}
                          
                        </MappedSubElements>)}
                    {isAddNewSubElement && (
                        <SubItemInput id={element._id} />
                    )}
                    <TreeOptions parent={parent} id={element._id} totalSubs={subElements.length}  />
                </SubElementWrapper>
            </ElementItemWrapper>
        </Container>
    )
}