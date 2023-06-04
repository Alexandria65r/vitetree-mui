import * as React from 'react';
import Modal from '@mui/material/Modal';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { Box, Typography, colors, styled } from '@mui/material';
import { colorScheme } from '../../theme';
import { cartActions } from '../../../reducers/cart-reducer';
import { Badge, ButtonIcon, CartAndWishListModalContainer, StyledButton } from '../../reusable/styles';

import { useRouter } from 'next/router';
import { deleteCartItemThunk, fetchCartItemsThunk } from '../../../reducers/cart-reducer/cart-thunks';
import CartItem from '../../components/cart-item'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { wishListActions } from '../../../reducers/wishlist-reducer';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import EmptyCartAndWishlist from '../empty-cart-wishlist';
import { authActions } from '../../../reducers/auth-reducer/auth-reducer';
import CreditCardForm from '../payments/credit-card-form';




const CartHead = styled(Box)(() => ({
    height: 60,
    display: 'flex',
    alignItems: 'center',
    padding: '0 15px'
}))
const CartBody = styled(Box)(({ theme }) => ({
    padding: '0 15px',
    overflow: 'auto',
    minHeight: 142,
    maxHeight: 500,
    [theme.breakpoints.down("sm")]: {
        padding: '0 10px',
        minHeight: 142,
        maxHeight: 500
    }

}))



const Cartooter = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    height: 60,
    //backgroundColor:'red',
    justifyContent: 'center',
    borderTop: `1px solid solid ${theme.palette.mode === 'light' ? colors.grey[200] : colorScheme(theme).primaryColor}`
}))


export default function AddNewCardModal() {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const isAddNewCard = useAppSelector((state) => state.AuthReducer.isAddNewCard)
    const owner = useAppSelector((state) => state.AuthReducer.user._id)
    const cartItems = useAppSelector((state) => state.CartReducer.cartItems)
    const wishListItems = useAppSelector((state) => state.WishListReducer.wishListItems)

    const fetchCartItems = React.useCallback(() => {
        dispatch(fetchCartItemsThunk(owner ?? ''))
    }, [dispatch, owner])

    React.useEffect(() => {
        fetchCartItems()
    }, [dispatch, owner])


    return (
        <div>
            <Modal
                open={isAddNewCard}
                onClose={() => dispatch(authActions.toggleAddNewCard(!isAddNewCard))}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <CartAndWishListModalContainer className="modalMb">
                    <CartHead>
                        <Typography sx={{ flex: 1, fontWeight: 600, fontSize: 22 }}>Add a Card</Typography>
                    </CartHead>
                    <CartBody>
                        <CreditCardForm />
                    </CartBody>
                </CartAndWishListModalContainer>
            </Modal>
        </div>
    );
}


