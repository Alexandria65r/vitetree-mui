import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CartItem } from '../../src/reusable/interfaces'

type CartState = {
    cartItems: CartItem[]
    isOpen: boolean
    isErr: boolean
    network_status: 'fetching' | 'success' | 'error' | ''
}


const initialState: CartState = {
    cartItems: [],
    isOpen: false,
    isErr: false,
    network_status: ''
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
        toggleCartModal: (state, { payload }: PayloadAction<boolean>) => {
            state.isOpen = payload
        },
        setIsErr: (state, { payload }: PayloadAction<boolean>) => {
            state.isErr = payload
        },
        setNetworkStatus: (state, { payload }: PayloadAction<'fetching' | 'success' | 'error' | ''>) => {
            state.network_status = payload
        },
    }
})

export const cartActions = cartSlice.actions
export default cartSlice.reducer