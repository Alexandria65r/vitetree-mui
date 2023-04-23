import * as React from 'react';
import Modal from '@mui/material/Modal';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { Box, Typography, colors, styled } from '@mui/material';
import { CSS_PROPERTIES } from '../../reusable';
import { colorScheme } from '../../theme';
import { cartActions } from '../../../reducers/cart-reducer';
import { ButtonIcon, StyledButton } from '../../reusable/styles';
import { useRouter } from 'next/router';
import CartItem from '../../components/cart-item'
import { fetchWishListItemsThunk } from '../../../reducers/wishlist-reducer/wishlist-thunks';
import { wishListActions } from '../../../reducers/wishlist-reducer';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const Container = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '35%',
    transform: 'translate(-50%, -50%)',
    borderRadius: CSS_PROPERTIES.radius10,
    backgroundColor: colorScheme(theme).secondaryColor,
    [theme.breakpoints.down("sm")]: {
        position: 'relative',
        width: '100%',
        height: '100vh',
        borderRadius: 0,
    }
}))


const CartHead = styled(Box)(() => ({
    height: 60,
    display: 'flex',
    alignItems: 'center',
    padding: '0 15px'
}))
const CartBody = styled(Box)(({ theme }) => ({
    height: 50,
    padding: '0 15px',
    minHeight: 300,
    overflow: 'auto',
    [theme.breakpoints.down("sm")]: {
        padding: '0 10px',
        height: 'calc(100vh - 118px)',
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

                <Container>
                    <CartHead>
                        <Typography sx={{flex:1, fontWeight: 600, fontSize: 20 }}>Your Wishlist</Typography>
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
                        {wishListItems.map((item, index) => (
                            <CartItem key={index} cartItem={item} type="wishlist" />
                        ))}
                    </CartBody>
                    <Cartooter>
                        <StyledButton onClick={() => {
                            dispatch(wishListActions.toggleWishListModal(false))
                            router.push('/checkout')
                        }} sx={(theme) => ({
                            px: 1, width: '80%',
                            backgroundColor: theme.palette.mode === 'light' ? '#000' : colorScheme(theme).primaryColor
                        })}>
                            Clear wishlist
                        </StyledButton>
                    </Cartooter>
                </Container>

            </Modal>
        </div>
    );
}


