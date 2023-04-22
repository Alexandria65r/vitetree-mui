import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CartItem } from '../../src/reusable/interfaces'

type WishListState = {
    cartItems: CartItem[]
    isErr: boolean
}


const initialState: WishListState = {
    cartItems: [],
    isErr: false
}


const wishListSlice = createSlice({
    name: 'wishListSlice',
    initialState,
    reducers: {
        setCartItem: (state, { payload }: PayloadAction<CartItem>) => {
            state.cartItems = [...state.cartItems, payload]
        },
        setCartItems: (state, { payload }: PayloadAction<CartItem[]>) => {
            state.cartItems = payload
        },
        setIsErr: (state, { payload }: PayloadAction<boolean>) => {
            state.isErr = payload
        },
    }
})

export const wishListActions = wishListSlice.actions
export default wishListSlice.reducer