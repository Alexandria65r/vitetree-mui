import * as React from 'react';
import Modal from '@mui/material/Modal';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { Box, Typography, colors, styled } from '@mui/material';
import { colorScheme } from '../../theme';
import { ButtonIcon, CartAndWishListModalContainer, StyledButton } from '../../reusable/styles';
import { useRouter } from 'next/router';
import CartItem from '../../components/cart-item'
import { clearWishListThunk, deleteWishListThunk, fetchWishListItemsThunk, moveToCartThunk } from '../../../reducers/wishlist-reducer/wishlist-thunks';
import { wishListActions } from '../../../reducers/wishlist-reducer';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { AppSpinner } from '../activity-indicators';
import EmptyCartAndWishlist from '../empty-cart-wishlist';


const CartHead = styled(Box)(() => ({
    height: 60,
    display: 'flex',
    alignItems: 'center',
    padding: '0 15px'
}))
const CartBody = styled(Box)(({ theme }) => ({
    padding: '0 15px',
    maxHeight: 400,
    overflow: 'auto',
    [theme.breakpoints.down("sm")]: {
        padding: '0 10px',
        minHeight:142,
        maxHeight:500
    }

}))




const Cartooter = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    height: 60,
    justifyContent: 'center',
    borderTop: `1px solid ${theme.palette.mode === 'light' ? colors.grey[200] : colorScheme(theme).primaryColor}`
}))


export default function WishListModal() {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const isOpen = useAppSelector((state) => state.WishListReducer.isOpen)
    const owner = useAppSelector((state) => state.AuthReducer.user._id)
    const wishListItems = useAppSelector((state) => state.WishListReducer.wishListItems)
    const network_status = useAppSelector((state) => state.WishListReducer.network_status)

    const fetchWishListItems = React.useCallback(() => {
        dispatch(fetchWishListItemsThunk(owner ?? ''))
    }, [dispatch, owner])

    React.useEffect(() => {
        fetchWishListItems()
    }, [dispatch, owner])


    function handleClose() {
        dispatch(wishListActions.toggleWishListModal(false))
    }


    return (
        <div>
            <Modal
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <CartAndWishListModalContainer>
                    <CartHead>
                        <Typography sx={{ flex: 1, fontWeight: 600, fontSize: 20 }}>Your Wishlist</Typography>
                        <ButtonIcon onClick={() => {
                            dispatch(wishListActions.toggleWishListModal(false))
                        }}
                            sx={(theme) => ({
                                display: 'none',

                                [theme.breakpoints.down("sm")]: {
                                    display: 'flex'
                                }
                            })}
                        >
                            <CloseOutlinedIcon />
                        </ButtonIcon>
                    </CartHead>
                    <CartBody>
                        {wishListItems.length ? (<>
                            {wishListItems.map((item, index) => (
                                <CartItem key={index}
                                    cartItem={item}
                                    type="wishlist"
                                    deleteItem={() => dispatch(deleteWishListThunk(item._id))}
                                    moveToCart={() => dispatch(moveToCartThunk(item))}
                                />
                            ))}

                        </>

                        ) : <EmptyCartAndWishlist
                            type='wishlist'
                            close={() => dispatch(wishListActions.toggleWishListModal(false))}
                        />}
                    </CartBody>
                    {wishListItems.length ? (
                        <Cartooter>
                            <StyledButton onClick={() => {
                                dispatch(clearWishListThunk())
                            }} sx={(theme) => ({
                                px: 1, width: '80%',
                                
                                backgroundColor: theme.palette.mode === 'light' ? '#000' : colorScheme(theme).primaryColor
                            })}>
                                {network_status === 'clearing-wishlist' ? 'Clearing...' : 'Clear wishlist'}
                                <AppSpinner visible={network_status === 'clearing-wishlist'} />
                            </StyledButton>
                        </Cartooter>
                    ) : <></>}

                </CartAndWishListModalContainer>

            </Modal>
        </div>
    );
}






