import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CartItem } from '../../src/reusable/interfaces'

type WishListState = {
    wishListItems: CartItem[]
    isErr: boolean
    isOpen:boolean
    network_status: 'fetching' | 'success' | 'error' | ''
}


const initialState: WishListState = {
    wishListItems: [],
    isErr: false,
    isOpen:false,
    network_status: ''
}


const wishListSlice = createSlice({
    name: 'wishListSlice',
    initialState,
    reducers: {
        setWishListItem: (state, { payload }: PayloadAction<CartItem>) => {
            state.wishListItems = [...state.wishListItems, payload]
        },
        setWishListItems: (state, { payload }: PayloadAction<CartItem[]>) => {
            state.wishListItems = payload
        },
        toggleWishListModal: (state, { payload }: PayloadAction<boolean>) => {
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

export const wishListActions = wishListSlice.actions
export default wishListSlice.reducer