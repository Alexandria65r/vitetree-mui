import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CartItem } from '../../src/reusable/interfaces'

type CartState = {
    cartItems: CartItem[]
    isOpen: boolean
    isErr: boolean
}


const initialState: CartState = {
    cartItems: [],
    isOpen: false,
    isErr: false
}


const cartSlice = createSlice({
    name: 'cartSlice',
    initialState,
    reducers: {
        setCartItem: (state, { payload }: PayloadAction<CartItem>) => {
            state.cartItems = [...state.cartItems, payload]
        },
        setCartItems: (state, { payload }: PayloadAction<CartItem[]>) => {
            state.cartItems = payload
        },
        toggleModal: (state, { payload }: PayloadAction<boolean>) => {
            state.isOpen = payload
        },
        setIsErr: (state, { payload }: PayloadAction<boolean>) => {
            state.isErr = payload
        },
    }
})

export const cartActions = cartSlice.actions
export default cartSlice.reducer