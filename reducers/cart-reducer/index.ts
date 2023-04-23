import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CartItem } from '../../src/reusable/interfaces'

export type CartNetworkStatus =
    'fetching' |
    'fetching-error' |
    'fetching-success' |
    'deleting' |
    'deleting-error' |
    'deleting-success'
    | ''



type CartState = {
    cartItems: CartItem[]
    isOpen: boolean
    isErr: boolean
    cartNetworkStatus: CartNetworkStatus
}


const initialState: CartState = {
    cartItems: [],
    isOpen: false,
    isErr: false,
    cartNetworkStatus: ''
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
        setNetworkStatus: (state, { payload }: PayloadAction<CartNetworkStatus>) => {
            state.cartNetworkStatus = payload
        },
    }
})

export const cartActions = cartSlice.actions
export default cartSlice.reducer