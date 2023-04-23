import React from 'react'
import { CartItem } from '../reusable/interfaces'
import { Box, Typography, colors, styled } from '@mui/material'
import { CSS_PROPERTIES } from '../reusable'
import { colorScheme } from '../theme'
import { ButtonIcon, StyledButton } from '../reusable/styles'
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Link from 'next/link'
import { Image, Transformation } from 'cloudinary-react'
import { useAppSelector } from '../../store/hooks'
import { AppSpinner } from './activity-indicators'





const CartItemContainer = styled(Box)(({ theme }) => ({
    flex: 1,
    minHeight: 100,
    margin: '5px',
    display: 'flex',
    alignItems: 'center',
    borderRadius: CSS_PROPERTIES.radius5,
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : colorScheme(theme).secondaryColor,
    border: `1px solid ${theme.palette.mode === 'light' ? colors.grey[200] : colorScheme(theme).primaryColor}`
}))

const ItemImage = styled(Box)(({ theme }) => ({
    height: '100%',
    flexBasis: '25%',
    borderRadius: CSS_PROPERTIES.radius5,
    //backgroundColor: theme.palette.mode === 'light' ? colors.grey[300] : colorScheme(theme).primaryColor,
}))
const ItemBody = styled(Box)(() => ({
    position: 'relative',
    flex: 1,
    height: '100%',
    //marginLeft: 10,
    padding: '5px 10px',
}))
const CardFooter = styled(Box)(() => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end'
}))



type Props = {
    cartItem: CartItem
    type: 'cart' | 'wishlist',
    deleteItem: () => void,
    moveToCart?: () => void
}

export default function CartItemCard({ cartItem, type, deleteItem, moveToCart }: Props) {
    const wishlistNetwork = useAppSelector((state) => state.WishListReducer.network_status)
    const movingId = useAppSelector((state) => state.WishListReducer.movingId)
    return (

        <CartItemContainer>
            <Link href={cartItem.link ?? ''}>
                <ItemImage>
                    <Image cloudName="alexandriah65"
                        style={{ marginLeft: 4, width: '130px', height: '100px', borderRadius: CSS_PROPERTIES.radius5, }}
                        publicId={cartItem.imageAsset?.publicId} >
                        <Transformation width="686" height="386" crop="thumb" />
                    </Image>
                </ItemImage>
            </Link>
            <ItemBody>
                <Typography sx={{ fontWeight: 500, fontSize: 16 }}>
                    {cartItem.title}
                </Typography>
                <Typography sx={{ fontWeight: 500, fontSize: 14 }}>
                    {cartItem.productInfo.name}
                </Typography>
                <Typography sx={(theme) => ({
                    fontWeight: 500,
                    color: theme.palette.mode === 'light' ? colors.grey[600] : colors.grey[500],
                    fontSize: 13
                })}>
                    Price: {cartItem.price}
                </Typography>
                {/* <StyledButton sx={{ px: 2 , fontSize:13,height:30}}>Add to cart</StyledButton> */}
                <CardFooter>
                    {type === 'wishlist' && (
                        <ButtonIcon onClick={moveToCart}
                            sx={{ height: 37, width: 37, color: '#fff', backgroundColor: colors.teal[400] }}>
                            {wishlistNetwork === 'moving' && cartItem._id === movingId ?
                                (<AppSpinner 
                                    visible={wishlistNetwork === 'moving' && cartItem._id === movingId}
                                />)
                                : (<AddShoppingCartOutlinedIcon
                                    fontSize='small' />)}
                        </ButtonIcon>
                    )}
                    <ButtonIcon sx={{ height: 37, width: 37 }} onClick={deleteItem}>
                        <DeleteOutlinedIcon fontSize='small' />
                    </ButtonIcon>

                </CardFooter>
            </ItemBody>
        </CartItemContainer>


    )
}