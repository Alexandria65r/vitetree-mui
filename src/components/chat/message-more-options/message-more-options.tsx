import { Box, Button, MenuItem, buttonBaseClasses, styled } from '@mui/material'
import React from 'react'
import { CSS_PROPERTIES } from '../../../reusable';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { mainActions } from '../../../../reducers';
import { HiReply } from 'react-icons/hi'
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import * as types from '../../../reusable'



import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import { colorScheme } from '../../../theme';
const Container = styled(Box)(({ theme }) => ({
    padding: 10,
    margin: 5,
    borderRadius: CSS_PROPERTIES.radius10,
    boxShadow: colorScheme(theme).chatBoarderColor,
    backgroundColor: colorScheme(theme).chatPrimaryColor,
    transition: '0.3s all',
    [theme.breakpoints.down("sm")]:{
        padding: 5,
    }
}))


const MenuItemButton = styled(MenuItem)(({ theme }) => ({
    alignItems:'center',
    fontSize: 13,
    padding: '5px 8px',
    color: colorScheme(theme).TextColor,
    borderRadius: CSS_PROPERTIES.radius5,
    '&:hover':{
        backgroundColor: colorScheme(theme).menuItemHoverColor
    }
}))
const MenuItemIconWrap= styled(Box)(({ theme }) => ({
   marginRight:5
}))



type Props = {}

export default function MessageMoreOptions({ }: Props) {
    const dispatch = useAppDispatch()
    const showSelectedImage = useAppSelector((state) => state.MainReducer.showSelectedImage)
    const { ReactToMessage, MessageMoreOptions } = types.REUSABLE_POPPER

    function openSelectedImageViewer() {
        dispatch(mainActions.setShowSelectedImage(true))
        dispatch(mainActions.setPopperState({
            component: '',
            popperId: ''
        }))
    }

    function reactToMessage() {
        dispatch(mainActions.setPopperState({
            component: ReactToMessage.component,
            popperId: ReactToMessage.popperId,
            placement: ReactToMessage.placement
        }))
    }
    return (
        <Container>
            <MenuItemButton >
                <MenuItemIconWrap>
                    <ReplyOutlinedIcon />
                </MenuItemIconWrap>
                Reply
            </MenuItemButton>
            <MenuItemButton onClick={reactToMessage}>
                <MenuItemIconWrap>
                    <AddReactionOutlinedIcon />
                </MenuItemIconWrap>
                React to message
            </MenuItemButton>
            <MenuItemButton>
                <MenuItemIconWrap>
                    <EditOutlinedIcon />
                </MenuItemIconWrap>
                Edit message
            </MenuItemButton>
        </Container>
    )
}