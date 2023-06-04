import { Box, ButtonBase, MenuItem, Popover, colors, styled } from '@mui/material'
import React from 'react'
import { CSS_PROPERTIES } from '../../reusable';
import { useAppDispatch } from '../../../store/hooks';
import { colorScheme } from '../../theme';
import PopupState, { bindPopover, bindTrigger } from 'material-ui-popup-state'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import classes from '../../styles/reusable.module.css'
import { useRouter } from 'next/router';
import { ButtonIcon, StyledButton } from '../../reusable/styles';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { authActions } from '../../../reducers/auth-reducer/auth-reducer';
import { makeDefaultCardThunk, removeCardThunk } from '../../../reducers/auth-reducer/auth-thunks';


const Container = styled(Box)(({ theme }) => ({
    flexBasis: '20%',
    marginTop: 5,
    [theme.breakpoints.down("sm")]: {
        // display: 'none'
        flexBasis: '20%',
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
    //borderLeft: `5px solid ${colors.teal[400]}`,
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
    cardId: string
    preffered: boolean
}

export default function CardOptions({ cardId, preffered }: Props) {
    const dispatch = useAppDispatch()
    const router = useRouter()

    return (
        <PopupState variant='popper' popupId='test-card-options'>
            {((popupState) => (
                <Container>

                    <ButtonIcon {...bindTrigger(popupState)}
                        sx={{ backgroundColor: 'transparent' }}>
                        <MoreVertIcon fontSize='medium' />
                    </ButtonIcon>

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
                            {!preffered && (
                                <MenuItemButton onClick={() => {
                                    dispatch(makeDefaultCardThunk(cardId))
                                    popupState.close()
                                }}>
                                    <MenuItemIconWrap>
                                        <CheckCircleOutlineIcon />
                                    </MenuItemIconWrap>
                                    Make default
                                </MenuItemButton>
                            )}
                            <MenuItemButton onClick={() => {
                                dispatch(authActions.setCardIdToRemove(cardId))
                                popupState.close()
                            }}>
                                <MenuItemIconWrap>
                                    <DeleteOutlineIcon />
                                </MenuItemIconWrap>
                                Remove
                            </MenuItemButton>
                        </PopOverContainer>
                    </Popover>
                </Container>
            ))}
        </PopupState>
    )
}