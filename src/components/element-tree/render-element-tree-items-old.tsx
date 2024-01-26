import React, { MutableRefObject, useRef } from 'react'
import { Box, colors, styled } from '@mui/material'
import { ButtonIcon } from '../../reusable/styles';
import { colorScheme } from '../../theme';
import ElementTreeItem from './element-tree-item';
import { Element } from '../../models/element';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import styles from './styles/element-tree.module.css'
import { BsChevronLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";
import { ListGroup } from '../../models/list-group';
import { DragDropContext, Droppable, Draggable, DragStart } from 'react-beautiful-dnd'
import { onGroudDragEndThunk } from '../../../reducers/list-group-reducer/list-group-thunks';
import { listGroupActions } from '../../../reducers/list-group-reducer';


const Container = styled(Box)(({ theme }) => ({
    position: 'relative',
    height: 'calc(100vh - 85px)',
    //width: '100vw',
    paddingInline: 10,
    overflowX: 'auto',
    scrollBehavior: 'smooth',
    [theme.breakpoints.down('sm')]: {
        height: 'calc(100vh - 120px)',
    },
    [theme.breakpoints.up('md')]: {
        height: 'calc(100vh - 65px)',
    },
}))
const MappedElements = styled(Box)(({ theme }) => ({
    width: 'fit-content',
    display: 'grid', gap: 15,
    gridAutoFlow: 'column',
    [theme.breakpoints.down('sm')]: {

    },
    [theme.breakpoints.up('md')]: {
        //gridTemplateColumns: 'repeat(auto-fill, 1fr)',
    },
    [theme.breakpoints.up('xl')]: {
        gridTemplateColumns: '',
    }
}))

const CustomScrollContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    height: 55,
    gap: 18,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    bottom: 0,
    left: '50%',
    // borderTopLeftRadius:19,
    //borderTopRightRadius:19,
    borderTop: `1px solid ${colorScheme(theme).borderColor}`,
    backgroundColor: colorScheme(theme).lightToprimaryColor,
    transform: 'translateX(-50%)',
    [theme.breakpoints.up('sm')]: {
        display: 'none'
    }
}))


const ScrollButton = styled(ButtonIcon)(({ theme }) => ({
    width: 45,
    height: 45,
    borderRadius: '50%',
    border: `1px solid  ${colorScheme(theme).greyToTertiary}`
}))

type Props = {
    listGroups: ListGroup[]
    elements: Element[]
}

export default function RenderElementTreeItems({ listGroups, elements }: Props) {
    const dispatch = useAppDispatch()
    const isSidebarOpen = useAppSelector((state) => state.MainReducer.isSidebarOpen)
    const droppableId = useAppSelector((state) => state.ListGroupReducer.droppableId)

    const containerRef: MutableRefObject<HTMLDivElement> | any = useRef()



    function scrollOnNewGroup(target: 'right' | 'left') {
        let scrollWidth = containerRef.current.scrollWidth;
        let scroll = 0;
        if (target === 'right') {
            scroll = scrollWidth
        }
        containerRef.current.scroll({
            top: 0,
            left: scroll,
            behavior: "smooth",
        });
    }



    function onBeforeDragStart(result: any) {
        dispatch(listGroupActions.setDroppableId(result.source.droppableId))
        console.log('onBeforeDragStart')
        console.log(result)
    }
    function onDragStart(result: DragStart) {
    }

    function onDragEnd(result: any) {
        dispatch(onGroudDragEndThunk(result))
    }




    return (<DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart} onBeforeDragStart={onBeforeDragStart}>
        {/* <ProjectTreeButton /> */}
        <Container ref={containerRef} sx={(theme) => ({
            [theme.breakpoints.up('md')]: {
                width: isSidebarOpen ? 'calc(100vw - 80px)' : 'calc(100vw - 290px)',
            },
            [theme.breakpoints.up('xl')]: {
                width: isSidebarOpen ? 'calc(100vw - 78px)' : 'calc(100vw - 290px)',
            },
        })}
            className={styles.renderElementTreeItems}>


            <Droppable mode='standard' direction='horizontal' droppableId='list-groups' isDropDisabled={droppableId !== 'list-groups'}>
                {({ droppableProps, innerRef, placeholder }) => (
                    <MappedElements {...droppableProps} ref={innerRef}>
                        {listGroups?.map((group, index) => (
                            <Draggable key={group?._id} draggableId={group?._id ?? ''} index={index}>
                                {(provided, snapshot) => (
                                    <ElementTreeItem provided={provided} snapshot={snapshot} group={group} parent='main-tree' />
                                )}
                            </Draggable>
                        ))}
                        {placeholder}
                    </MappedElements>
                )}
            </Droppable>

            <CustomScrollContainer>
                <ScrollButton onClick={() => scrollOnNewGroup('left')}>
                    <BsChevronLeft size={20} />
                </ScrollButton>
                <ScrollButton onClick={() => scrollOnNewGroup('right')} >
                    <BsChevronRight size={20} />
                </ScrollButton>
            </CustomScrollContainer>
        </Container>
    </DragDropContext>
    )
}