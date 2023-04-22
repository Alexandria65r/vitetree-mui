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
import { cartActions } from '../../../reducers/cart-reducer';
import { ButtonIcon, StyledButton } from '../../reusable/styles';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useRouter } from 'next/router';

const Container = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '35%',
    transform: 'translate(-50%, -50%)',
    borderRadius: CSS_PROPERTIES.radius10,
    backgroundColor: colorScheme(theme).secondaryColor,
    [theme.breakpoints.down("sm")]: {
        width: '96%',
        transform: 'translate(-50%, 0%)',
        top: 'unset',
        bottom: 10
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
    }

}))
const CartItemContainer = styled(Box)(({ theme }) => ({
    flex: 1,
    height: 100,
    margin: '5px',
    display: 'flex',
    alignItems: 'center',

    borderRadius: CSS_PROPERTIES.radius5,
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : colorScheme(theme).secondaryColor,
    border: `1px solid ${theme.palette.mode === 'light' ? colors.grey[200] : colorScheme(theme).primaryColor}`
}))

const ItemImage = styled(Box)(({ theme }) => ({
    height: '100%',
    flexBasis: '30%',
    borderRadius: CSS_PROPERTIES.radius5,
    backgroundColor: theme.palette.mode === 'light' ? colors.grey[300] : colorScheme(theme).primaryColor,
}))
const ItemBody = styled(Box)(() => ({
    position: 'relative',
    flex: 1,
    height: '100%',
    //marginLeft: 10,
    padding: '5px 10px',
}))



const Cartooter = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    height: 60,
    //backgroundColor:'red',
    justifyContent: 'center',
    borderTop: `1px solid ${theme.palette.mode === 'light' ? colors.grey[200] : colorScheme(theme).primaryColor}`
}))


export default function CartModal() {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const isOpen = useAppSelector((state) => state.CartReducer.isOpen)


    function handleClose() {
        dispatch(cartActions.toggleModal(false))
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
                        <Typography sx={{ fontWeight: 600, fontSize: 20 }}>Your Cart</Typography>
                    </CartHead>
                    <CartBody>
                        {[1, 2, 3, 4, 5].map(() => (
                            <CartItem />
                        ))}
                    </CartBody>
                    <Cartooter>
                        <StyledButton onClick={() => {
                            dispatch(cartActions.toggleModal(false))
                            router.push('/checkout')
                        }} sx={{ px: 1, width: '80%' }}>
                            Procced to checkout
                        </StyledButton>
                    </Cartooter>
                </Container>

            </Modal>
        </div>
    );
}


function CartItem() {
    return (
        <CartItemContainer>
            <ItemImage></ItemImage>
            <ItemBody>
                <Typography sx={{ fontWeight: 500, fontSize: 16 }}>
                    Civic Education Course
                </Typography>
                <Typography sx={(theme) => ({
                    fontWeight: 500,
                    color: theme.palette.mode==='light'? colors.grey[600]:colors.grey[500],
                    fontSize: 13
                })}>
                    Price: $24.60
                </Typography>
                <ButtonIcon sx={{ position: 'absolute', right: 1 }}>
                    <DeleteOutlinedIcon fontSize='small' />
                </ButtonIcon>
            </ItemBody>
        </CartItemContainer>
    )
}