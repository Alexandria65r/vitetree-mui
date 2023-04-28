import { Box, Typography, colors, styled } from '@mui/material'
import React from 'react'
import { StyledButton } from '../reusable/styles'



const EmptyCartContainer = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'center'
}))

type Props = {
    type: 'cart' | 'wishlist',
    close: () => void
}

export default function EmptyCartAndWishlist({ type, close }: Props) {
    return (
        <Box sx={{
            height: '300px', marginBottom: 3, width: '100%',
            display: 'flex', justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Box sx={{ justifySelf: 'center', flexBasis: '60%' }}>
                <EmptyCartContainer>
                    <img src="/cart.jpg" height={150} alt='' />
                </EmptyCartContainer>
                <Typography sx={{ fontSize: 18, textAlign: 'center', fontWeight: 600 }}>
                    Your {type} is empty</Typography>
                <Typography sx={{ color: colors.grey[600], textAlign: 'center', lineHeight: 1.2 }}>
                    Looks like you havent added anything to your {type} yet
                </Typography>
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <StyledButton sx={{ flexBasis: '60%', px: 2 }}
                        onClick={close}
                    >Close</StyledButton>
                </Box>
            </Box>
        </Box>
    )
}