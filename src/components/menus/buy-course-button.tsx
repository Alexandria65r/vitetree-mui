import { Box, ButtonBase, MenuItem, Popover, colors, styled } from '@mui/material'
import React from 'react'
import { CSS_PROPERTIES } from '../../reusable';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { mainActions } from '../../../reducers';
import * as types from '../../reusable'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { colorScheme } from '../../theme';
import PopupState, { bindPopover, bindTrigger } from 'material-ui-popup-state'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import classes from '../../styles/reusable.module.css'
import { Participant, Test, VideoCourse } from '../../reusable/interfaces';
import { useRouter } from 'next/router';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { StyledButton } from '../../reusable/styles';
import AddIcon from '@mui/icons-material/Add';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { cartActions } from '../../../reducers/cart-reducer';
import { addToCartThunk } from '../../../reducers/cart-reducer/cart-thunks';
import RemoveShoppingCartOutlinedIcon from '@mui/icons-material/RemoveShoppingCartOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { addToWishListThunk } from '../../../reducers/wishlist-reducer/wishlist-thunks';
import { wishListActions } from '../../../reducers/wishlist-reducer';



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
    height: 40,
    [theme.breakpoints.down("sm")]: {
        padding: '0 10px',
        //height: 49,
        whiteSpace: 'nowrap'
    }
}))



type Props = {
    course: VideoCourse
}

export default function BuyCourseButton({ course }: Props) {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const cartItems = useAppSelector((state) => state.CartReducer.cartItems)
    const wishListItems = useAppSelector((state) => state.WishListReducer.wishListItems)




    const isInCart = cartItems.find((item) => item.productInfo.id === course._id)
    const isInWishList = wishListItems.find((item) => item.productInfo.id === course._id)

    function addToCart() {
        if (isInCart) {
            dispatch(cartActions.toggleCartModal(true))
        } else {
            dispatch(addToCartThunk(course))
        }

    }
    function addToWishList() {
        if (isInWishList) {
            dispatch(wishListActions.toggleWishListModal(true))
        } else {
            dispatch(addToWishListThunk(course))
        }

    }

    return (
        <PopupState variant='popper' popupId='test-card-options'>
            {((popupState) => (
                <Container>
                    <Button {...bindTrigger(popupState)}>

                        Buy {course.price}
                        <Box sx={(theme) => ({
                            ml: 2, [theme.breakpoints.down('sm')]: {
                                ml: 1
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
                            <MenuItemButton onClick={() => {
                                addToCart()
                                if (isInCart) {
                                    popupState.close()
                                }
                            }}>
                                <MenuItemIconWrap>
                                    {isInCart ? <RemoveShoppingCartOutlinedIcon /> : <AddShoppingCartOutlinedIcon />}
                                </MenuItemIconWrap>
                                {isInCart ? 'Added to cart' : 'Add to cart'}
                            </MenuItemButton>
                            <MenuItemButton onClick={() => {
                                addToWishList()
                                if (isInWishList) {
                                    popupState.close()
                                }
                            }
                            }>
                                <MenuItemIconWrap>
                                    {isInWishList ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
                                </MenuItemIconWrap>
                                {isInWishList ? 'Added to wishlist' : 'Add to wishlist'}
                            </MenuItemButton>
                            <MenuItemButton onClick={() => router.push(`/checkout`)}>
                                <MenuItemIconWrap>
                                    <InventoryOutlinedIcon />
                                </MenuItemIconWrap>
                                Buy it now
                            </MenuItemButton>

                        </PopOverContainer>
                    </Popover>
                </Container>
            ))}
        </PopupState>
    )
}