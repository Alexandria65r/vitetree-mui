import React from 'react'
import { Box, colors, styled } from '@mui/material'
import { colorScheme } from '../../theme';
import GroupHead from './group-head';
import GroupedSubItem from './grouped-sub-item';
import TreeOptions from './tree-options';
import SubItemInput from './sub-item-input';
import { Element } from '../../models/element';
import { useAppDispatch, useAppSelector, useElementAction, useGroupAction, useGroupListElements } from '../../../store/hooks';
import { useMeasure } from "react-use";
import { subLimit } from '../../reusable/helpers';
import { ListGroup } from '../../models/list-group';


const Container = styled(Box)(() => ({
    width: 'fit-content',
}))


const ListGroup = styled(Box)(() => ({
    width: 'fit-content',
    marginTop: 10,
}))
const GroupHeadWrapper = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    justifyContent: 'flex-start'
}))



const SubElementWrapper = styled(Box)(({ theme }) => ({
    marginLeft: 0,
    borderBottomLeftRadius: 0,
    borderLeft: `0px solid ${colors.grey[400]}`,
    borderRight: `0px solid ${colors.grey[400]}`,
    //backgroundColor:colorScheme(theme).lightToprimaryColor
}))
const MappedSubElements = styled(Box)(() => ({
    //overflowX: 'hidden',
    //overflowY: 'hidden',
    //padding:10,
}))

const GroupFooter = styled(Box)(({ theme }) => ({
    display: 'flex',
    userSelect: 'none',
    flex: 1,
    // minWidth: 330,
    //maxWidth: 330,
    alignItems: 'center',
    height: 40,
    paddingInline: 10,
    borderRadius: 19,
    //borderTopLeftRadius: 0,
    // borderTopRightRadius: 0,
    border: `1px solid ${colors.grey[400]}`,
    //borderRight: `0px solid ${colors.grey[400]}`,
    backgroundColor: colorScheme(theme).lightToSecondaryColor,
    color: colorScheme(theme).TextColor,
    // boxShadow: `0 -1px 13px 0 ${colorScheme(theme).darkGreyToSecondary}`
}))



type Props = {
    group: ListGroup
    parent: 'main-tree' | 'element-detail'
}

export default function ElementTreeItem({ group, parent }: Props) {
    const dispatch = useAppDispatch()
    const collapedItems = useAppSelector((state) => state.ElementsReducer.collapedItems)
    const groupListElements = useGroupListElements(group?._id ?? '');
    const isAddNewSubElement = useGroupAction({ action: 'add-sub-element', groupId: group?._id ?? '' })

    const [ref, { x, y, width, height, top, right, bottom, left }] = useMeasure();

    console.log(`item-height: ${height}`)

    return (
        <Container>
            <ListGroup>
                <GroupHeadWrapper>
                    <GroupHead parent={parent} id={group?._id ?? ''} />
                </GroupHeadWrapper>
                <SubElementWrapper sx={{
                    paddingInline: 0.5,
                    paddingBottom: .5,
                    maxHeight: parent === 'main-tree' ? 'calc(100dvh - 280px)' : 'auto',
                    overflowY: parent === 'element-detail' ? 'auto' : 'auto',
                    //overflowX: 'hidden',
                    borderColor: group?.color
                }}>
                    {!collapedItems.includes(group?._id ?? '') && (
                        <>
                            {groupListElements?.map((subElement) => (
                                <GroupedSubItem key={subElement._id} parent={parent} id={subElement._id} />
                            ))}
                        </>)}
                    {isAddNewSubElement && (
                        <SubItemInput id={group?._id ?? ''} />
                    )}
                </SubElementWrapper>
                <GroupFooter sx={{ borderColor: group?.color }}>

                    <TreeOptions parent={parent} id={group?._id ?? ''} totalSubs={groupListElements.length} />
                </GroupFooter>
            </ListGroup>
        </Container>
    )
}