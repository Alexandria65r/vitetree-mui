import { Box, ButtonBase, MenuItem, Popover, colors, styled } from '@mui/material'
import React from 'react'
import { CSS_PROPERTIES } from '../../reusable';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { mainActions } from '../../../reducers/main-reducer';
import * as types from '../../reusable'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { colorScheme } from '../../theme';
import PopupState, { bindPopover, bindTrigger } from 'material-ui-popup-state'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import classes from '../../styles/reusable.module.css'
import { Participant, Test } from '../../reusable/interfaces';
import { useRouter } from 'next/router';


const Container = styled(Box)(({ theme }) => ({
    margin: 1,
    padding: 10,
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
const MenuItemIconWrap = styled(Box)(() => ({
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
            backgroundColor: colors.grey[200],
        }
    }
}))



type Props = {
    participant: Participant
}

export default function PartcipantsOptions({ participant }: Props) {
    const dispatch = useAppDispatch()

    function deletePartcipant() {
        dispatch(mainActions.setDeletePartcipantModal({
            component: 'delete-partcipnat',
            fullname: participant?.fullname ?? '',
            partcipantId: participant?._id ?? ''
        }))
    }
    return (
        <PopupState variant='popper' popupId='test-card-options'>
            {((popupState) => (
                <Box>
                    <CardButton {...bindTrigger(popupState)} >
                        <MoreVertIcon fontSize='small' />
                    </CardButton>
                    <Popover {...bindPopover(popupState)}
                        classes={{
                            root: classes.PopperContainer,
                            paper: classes.CustomPaper
                        }}
                    >
                        <Container>
                            <MenuItemButton >
                                <MenuItemIconWrap>
                                    <AppRegistrationOutlinedIcon />
                                </MenuItemIconWrap>
                                Download PDF
                            </MenuItemButton>
                            <MenuItemButton >
                                <MenuItemIconWrap>
                                    <PeopleAltOutlinedIcon />
                                </MenuItemIconWrap>
                                Partcipants
                            </MenuItemButton>
                            <MenuItemButton onClick={() => {
                                deletePartcipant()
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