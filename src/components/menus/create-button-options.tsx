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

import { useRouter } from 'next/router';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { StyledButton } from '../../reusable/styles';
import AddIcon from '@mui/icons-material/Add';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const Container = styled(Box)(({ theme }) => ({
    flexBasis: '20%',
    marginTop: 5,
    [theme.breakpoints.down("sm")]: {
        // display: 'none'
        flexBasis: '15%',
        marginTop: 0,
        marginLeft: 10,
    }

}))

const PopOverContainer = styled(Box)(({ theme }) => ({
    margin: 1,
    padding: 10,
    borderRadius: CSS_PROPERTIES.radius10,
    boxShadow: `0 1px 3px 0 ${colorScheme(theme).chatBoarderColor}`,
    backgroundColor: colorScheme(theme).chatPrimaryColor,
    transition: '0.3s all',
    borderLeft: `5px solid ${colors.teal[400]}`,
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

const Button = styled(StyledButton)(({ theme }) => ({
    width: '100%',
    height: 47,
    [theme.breakpoints.down("sm")]: {
        padding: '0 10px',
        height: 49,
    }
}))



type Props = {

}

export default function CreateButtonOptions({ }: Props) {
    const dispatch = useAppDispatch()
    const router = useRouter()


    return (
        <PopupState variant='popper' popupId='test-card-options'>
            {((popupState) => (
                <Container>
                    <Button {...bindTrigger(popupState)}>
                        <AddIcon sx={(theme) => ({
                            mr: 1, [theme.breakpoints.down('sm')]: {
                                display: 'none'
                            }
                        })} />
                        Create
                        <Box sx={(theme) => ({
                            ml: .5, [theme.breakpoints.down('sm')]: {
                                ml: .5,
                                mt: .3
                            }
                        })}>
                            {popupState.isOpen ? <ExpandLessIcon /> : (
                                <KeyboardArrowDownIcon />
                            )}
                        </Box>

                    </Button>
                    <Popover {...bindPopover(popupState)}
                        classes={{
                            root: classes.PopperContainer,
                            paper: classes.CustomPaper
                        }}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left'
                        }}

                    // elevation={4}
                    >
                        <PopOverContainer>
                            <MenuItemButton onClick={() => router.push('/create-new-test')}>
                                <MenuItemIconWrap>
                                    <AppRegistrationOutlinedIcon />
                                </MenuItemIconWrap>
                                New Test
                            </MenuItemButton>
                            <MenuItemButton onClick={() => router.push('/create-course')}>
                                <MenuItemIconWrap>
                                    <OndemandVideoIcon />
                                </MenuItemIconWrap>
                                Video Course
                            </MenuItemButton>
                            <MenuItemButton onClick={() => router.push('/new-class')}>
                                <MenuItemIconWrap>
                                    <OndemandVideoIcon />
                                </MenuItemIconWrap>
                                Online class
                            </MenuItemButton>

                        </PopOverContainer>
                    </Popover>
                </Container>
            ))}
        </PopupState>
    )
}