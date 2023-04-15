import { Box, Button, ButtonBase, MenuItem, Popover, colors, styled } from '@mui/material'
import React, { useState } from 'react'
import { CSS_PROPERTIES } from '../reusable';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { mainActions } from '../../reducers';
import { HiReply } from 'react-icons/hi'
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import * as types from '../reusable'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import { colorScheme } from '../theme';
import PopupState, { bindPopover, bindPopper, bindTrigger } from 'material-ui-popup-state'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import classes from '../styles/reusable.module.css'
import { Test } from '../reusable/interfaces';
import { useRouter } from 'next/router';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined';
import CopyToClipboard from 'react-copy-to-clipboard';
import CheckIcon from '@mui/icons-material/Check';


const Container = styled(Box)(({ theme }) => ({
    padding: 10,
    margin: 1,
    borderRadius: CSS_PROPERTIES.radius5,
    boxShadow: `0 1px 3px 0 ${colorScheme(theme).chatBoarderColor}`,
    backgroundColor: colorScheme(theme).chatPrimaryColor,
    transition: '0.3s all',
    [theme.breakpoints.down("sm")]: {
        padding: 5,
    }
}))


const MenuItemButton = styled(MenuItem)(({ theme }) => ({
    alignItems: 'center',
    fontSize: 13,
    padding: '5px 8px',
    color: colorScheme(theme).TextColor,
    borderRadius: CSS_PROPERTIES.radius5,
    '&:hover': {
        backgroundColor: colorScheme(theme).menuItemHoverColor
    }
}))
const MenuItemIconWrap = styled(Box)(({ theme }) => ({
    marginRight: 5
}))

const CardButton = styled(ButtonBase)(({ theme }) => ({
    position: 'absolute',
    top: 0,
    right: 5,
    margin: '5px 0',
    height: 'auto',
    fontSize: 14,
    padding: '2px',
    fontWeight: 400,
    borderRadius: CSS_PROPERTIES.radius5,
    color: colors.teal[400],
    [theme.breakpoints.down("sm")]: {
        '&:focus': {
            backgroundColor: colorScheme(theme).secondaryColor,
        }
    }
}))



type Props = {
    card: Test
}

export default function TestCardOptions({ card }: Props) {
    const dispatch = useAppDispatch()
    const showSelectedImage = useAppSelector((state) => state.MainReducer.showSelectedImage)
    const { ReactToMessage, MessageMoreOptions } = types.REUSABLE_POPPER
    const router = useRouter()
    const [isCopied, setIsCopied] = useState<boolean>(false)

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

    function duplicateTestData() {
        dispatch(mainActions.setDuplicateTestModal({
            component: 'duplicate-test',
            testData: card
        }))
        dispatch(mainActions.setPopperState({
            component: '',
            popperId: ''
        }))
    }
    function deleteTestData() {
        dispatch(mainActions.setDeleteTestModal({
            component: 'delete-test',
            testId: card._id,
            subject: card.subjectOrlanguage
        }))

    }

    let linkToCopy: any

    if (typeof window !== 'undefined' && router.query.id) {
        linkToCopy = `${window?.location.host}/test_info/${router.query.id}`
    }

    return (
        <PopupState variant='popper' popupId='test-card-options'>
            {((popupState) => (
                <Box>
                    <CardButton {...bindTrigger(popupState)} >
                        <MoreVertIcon fontSize='small' />
                    </CardButton>
                    <Popover {...bindPopover(popupState)}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        classes={{
                            root: classes.PopperContainer,
                            paper: classes.CustomPaper
                        }}
                    >
                        <Container>
                            <MenuItemButton onClick={() => router.push(`/update/${card._id}`)}>
                                <MenuItemIconWrap>
                                    <EditOutlinedIcon fontSize='small' />
                                </MenuItemIconWrap>
                                Edit
                            </MenuItemButton>
                            <MenuItemButton onClick={() => router.push(`/prepare/${card._id}`)}>
                                <MenuItemIconWrap>
                                    <AppRegistrationOutlinedIcon fontSize='small' />
                                </MenuItemIconWrap>
                                Prepare
                            </MenuItemButton>

                            <CopyToClipboard text={linkToCopy}
                                onCopy={() => {
                                    setIsCopied(true)
                                    setTimeout(() => {
                                        setIsCopied(false)
                                    }, 3000)
                                    //popupState.close()
                                }}
                            >

                                <MenuItemButton>
                                    <MenuItemIconWrap>
                                        {isCopied ? <CheckIcon /> : <ContentCopyIcon fontSize='small' />}
                                    </MenuItemIconWrap>
                                    {isCopied ? 'Copied' : 'Copy link'}
                                </MenuItemButton>
                            </CopyToClipboard>

                            <MenuItemButton onClick={() => router.push(`/partcipants/${card._id}`)}>
                                <MenuItemIconWrap>
                                    <PeopleAltOutlinedIcon fontSize='small' />
                                </MenuItemIconWrap>
                                Partcipants
                            </MenuItemButton>
                            <MenuItemButton onClick={() => {
                                duplicateTestData()
                                popupState.close()
                            }}>
                                <MenuItemIconWrap>
                                    <AddToPhotosOutlinedIcon fontSize='small' />
                                </MenuItemIconWrap>
                                Duplicate
                            </MenuItemButton>
                            <MenuItemButton onClick={() => {
                                deleteTestData()
                                popupState.close()
                            }}>
                                <MenuItemIconWrap>
                                    <DeleteOutlineOutlinedIcon />
                                </MenuItemIconWrap>
                                Delete
                            </MenuItemButton>
                        </Container>
                    </Popover>
                </Box>
            ))}
        </PopupState>
    )
}