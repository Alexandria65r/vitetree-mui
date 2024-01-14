import React, { MutableRefObject, useRef, useState } from 'react'
import { Box, colors, styled } from '@mui/material'
import ProjectTreeButton from './project-tree-button';
import { OptionButton, StyledButton, StyledInput } from '../../reusable/styles';
import { Add } from '@mui/icons-material';
import { colorScheme } from '../../theme';
import ElementTreeItem from './element-tree-item';
import { Element } from '../../models/element';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { AddNewElementThunk } from '../../../reducers/elements-reducer/elements-thunks';
import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop';
import styles from './styles/element-tree.module.css'
import { BsChevronLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";
import NewItemInput from './new-item-input';

const Container = styled(Box)(({ theme }) => ({
    position: 'relative',
    height: 'calc(100vh - 150px)',
    //width: '100vw',
    overflowX: 'auto',
    scrollBehavior: 'smooth',
    [theme.breakpoints.up('xl')]: {
        width: 'calc(100vw - 120px)',
        //border:'1px solid red'
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
const NewElementWrapper = styled(Box)(() => ({

}))
const Input = styled(StyledInput)(({ theme }) => ({
    color: colorScheme(theme).TextColor,
    paddingInline: 18,
    borderRadius: 29,
    backgroundColor: colorScheme(theme).lightToSecondaryColor,
    boxShadow: `0 1px 3px 0 ${colorScheme(theme).darkGreyToSecondary}`
}))

const NewElementButton = styled(StyledButton)(({ theme }) => ({
    color: '#fff',
    fontSize: 14,
    borderRadius: 25,
    paddingInline: 15,
    marginTop: 10,
    whiteSpace: 'nowrap',
    fontWeight: 500,
    backgroundColor: colors.teal[500],
    boxShadow: `0 1px 3px 0 ${colorScheme(theme).darkGreyToSecondary}`
}))


const CustomScrollContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    height: 60,
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    bottom: 0,
    left: '50%',
    borderTopLeftRadius:19,
    borderTopRightRadius:19,
    backgroundColor: colorScheme(theme).greyToTertiary,
    transform: 'translateX(-50%)',
    [theme.breakpoints.up('sm')]: {
        display: 'none'
    }
}))

type Props = {
    elements: Element[]
}

export default function RenderElementTreeItems({ elements }: Props) {
    const dispatch = useAppDispatch()
    const isSidebarOpen = useAppSelector((state) => state.MainReducer.isSidebarOpen)
    const [isAddNewElement, toggleAddNewElement] = useState(false)
    const newElementName = useAppSelector((state) => state.ElementsReducer.newElementName)
    const containerRef: MutableRefObject<HTMLDivElement> | any = useRef()
    function create() {
        dispatch(AddNewElementThunk({ elementType: 'parent', cartegory: 'task' }))
        toggleAddNewElement(false)
    }

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

    return (<Box sx={{}}>
        <ProjectTreeButton />
        <Container ref={containerRef} sx={(theme) => ({
            [theme.breakpoints.up('xl')]: {
                width: isSidebarOpen ? 'calc(100vw - 120px)' : 'calc(100vw - 320px)',
                //border:'1px solid red'
            },
        })}
            className={styles.renderElementTreeItems}>
            <MappedElements>
                <NewElementWrapper>
                    {isAddNewElement ?
                        (<NewItemInput
                            create={create} placeholder='New group'
                            createIcon={<VerticalAlignTopIcon
                                sx={{ transform: 'rotate(90deg)' }}
                            />} />) : (
                            <NewElementButton onClick={() => toggleAddNewElement(!isAddNewElement)}>
                                <Add sx={{ mt: 0 }} /> New list group
                            </NewElementButton>
                        )}
                </NewElementWrapper>
                {elements?.map((element) => (
                    <ElementTreeItem key={element._id} element={element} parent='main-tree' />
                ))}
            </MappedElements>
            <CustomScrollContainer>
                <OptionButton onClick={() => scrollOnNewGroup('left')} sx={{ width: 50, height: 50, borderRadius: '50%' }}>
                    <BsChevronLeft size={20} />
                </OptionButton>
                <OptionButton onClick={() => scrollOnNewGroup('right')} sx={{ width: 50, height: 50, borderRadius: '50%' }}>
                    <BsChevronRight size={20} />
                </OptionButton>
            </CustomScrollContainer>
        </Container>
    </Box>
    )
}