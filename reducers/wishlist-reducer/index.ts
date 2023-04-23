import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CartItem } from '../../src/reusable/interfaces'

export type WishlistNetworkStatus =
    'fetching' |
    'fetching-error' |
    'fetching-success' |
    'clearing-wishlist' |
    'clearing-wishlist-success' |
    'clearing-wishlist-error' |
    'deleting' |
    'deleting-error' |
    'deleting-success' |
    'moving' |
    'moving-error' |
    'moving-success' | ''


type WishListState = {
    wishListItems: CartItem[]
    isErr: boolean
    isOpen: boolean
    network_status: WishlistNetworkStatus,
    movingId: string
}


const initialState: WishListState = {
    wishListItems: [],
    isErr: false,
    isOpen: false,
    network_status: '',
    movingId: ''
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
        setNetworkStatus: (state, { payload }: PayloadAction<WishlistNetworkStatus>) => {
            state.network_status = payload
        },
        setMovingId: (state, { payload }: PayloadAction<string>) => {
            state.movingId = payload
        },
    }
})

export const wishListActions = wishListSlice.actions
export default wishListSlice.reducer