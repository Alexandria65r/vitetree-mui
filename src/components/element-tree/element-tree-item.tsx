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
import { Droppable, Draggable, DraggableStateSnapshot, DraggableProvided, } from 'react-beautiful-dnd';


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
    maxHeight: 'calc(100dvh - 160px)',
    overflowY: 'auto',
    borderBottomLeftRadius: 0,
    borderLeft: `0px solid ${colors.grey[400]}`,
    borderRight: `0px solid ${colors.grey[400]}`,
    //backgroundColor:colorScheme(theme).lightToprimaryColor,
    [theme.breakpoints.down('sm')]: {
        maxHeight: 'calc(100dvh - 210px)',
    },
    [theme.breakpoints.up('md')]: {
        maxHeight: 'calc(100dvh - 180px)',
    },
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
    provided: DraggableProvided
    snapshot: DraggableStateSnapshot
    group: ListGroup
    parent: 'main-tree' | 'element-detail'
}

export default function ElementTreeItem({ provided, snapshot, group, parent }: Props) {
    const dispatch = useAppDispatch()
    const collapedItems = useAppSelector((state) => state.ElementsReducer.collapedItems)
    const groupListElements = useGroupListElements(group?._id ?? '');
    const isAddNewSubElement = useGroupAction({ action: 'add-sub-element', groupId: group?._id ?? '' })
    const droppableId = useAppSelector((state) => state.ListGroupReducer.droppableId)

    const [ref, { x, y, width, height, top, right, bottom, left }] = useMeasure();



    return (
        <Container ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={provided.draggableProps.style}>
            <ListGroup >
                <GroupHeadWrapper >
                    <GroupHead parent={parent} id={group?._id ?? ''} />
                </GroupHeadWrapper>
                <SubElementWrapper sx={{
                    paddingInline: 0.5,
                    paddingBottom: .5,
                    overflowX: 'hidden',
                    borderColor: group?.color
                }}>
                    {!collapedItems.includes(group?._id ?? '') && (
                        <Droppable key={`${group._id}-key`} droppableId='elements' isDropDisabled={droppableId === 'list-groups'}>
                            {({ droppableProps, innerRef }) => (
                                <Box {...droppableProps} ref={innerRef}>
                                    {groupListElements?.map((subElement, index) => (
                                        <Draggable key={`${subElement._id}`} draggableId={subElement._id} index={index} >
                                            {(elementProvided, _snapshot) => (
                                                <GroupedSubItem
                                                    provided={elementProvided}
                                                    snapshot={_snapshot}
                                                    parent={parent}
                                                    id={subElement._id}
                                                />
                                            )}
                                        </Draggable>
                                    ))}
                                </Box>
                            )}
                        </Droppable>)}
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