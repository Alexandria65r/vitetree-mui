import * as React from 'react';
import Modal from '@mui/material/Modal';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { mainActions } from '../../../reducers';
import ReusableAlert from '../reusable-alert';
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined';
import { duplicateTestThunk } from '../../../reducers/thunks';
import { testDataSchema } from '../../reusable/schemas';
import { Box, Typography, colors, styled } from '@mui/material';
import { CSS_PROPERTIES } from '../../reusable';
import { colorScheme } from '../../theme';
import { forumActions } from '../../../reducers/forum-reducer';
import { Badge, ButtonIcon, CartAndWishListModalContainer, StyledButton } from '../../reusable/styles';

import { useRouter } from 'next/router';
import { deleteCartItemThunk, fetchCartItemsThunk } from '../../../reducers/cart-reducer/cart-thunks';
import CartItem from '../../components/cart-item'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { wishListActions } from '../../../reducers/wishlist-reducer';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { deleteWishListThunk } from '../../../reducers/wishlist-reducer/wishlist-thunks';
import EmptyCartAndWishlist from '../empty-cart-wishlist';
import ForumPostForm from '../forum-form/forum-post-form';





export const ModalContainer = styled(Box)(({ theme }) => ({
    position: 'absolute',
    right: 0,
    width: '80%',
    height: '100vh',
    borderRadius: 0,
    backgroundColor: colorScheme(theme).secondaryColor,
    [theme.breakpoints.down("sm")]: {
        position: 'absolute',
        left: 0,
        width: '100%',
        transform: 'none',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        top: 'unset',
        bottom: 0
    }
}))


const Header = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    height: 60,
    backgroundColor:theme.palette.mode==='light'?'#fff':colorScheme(theme).secondaryColor,
    justifyContent: 'center',
    boxShadow: `0 1px 3px 0 ${colorScheme(theme).chatBoarderColor}`,
    borderTop: `1px solid solid ${theme.palette.mode === 'light' ? colors.grey[200] : colorScheme(theme).primaryColor}`
}))


export default function SendBidModal() {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const isOpen = useAppSelector((state) => state.ForumReducer.isOpen)
    const owner = useAppSelector((state) => state.AuthReducer.user._id)
    const cartItems = useAppSelector((state) => state.CartReducer.cartItems)
    const wishListItems = useAppSelector((state) => state.WishListReducer.wishListItems)

    const fetchCartItems = React.useCallback(() => {
        dispatch(fetchCartItemsThunk(owner ?? ''))
    }, [dispatch, owner])

    React.useEffect(() => {
        fetchCartItems()
    }, [dispatch, owner])


    function handleClose() {
        router.back()
    }




    return (
        <div>
            <Modal
                open={router.asPath.includes('sendBid')}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <ModalContainer>
                    <Header></Header>
                </ModalContainer>

            </Modal>
        </div>
    );
}


