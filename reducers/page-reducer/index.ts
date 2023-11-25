import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CartItem } from '../../src/reusable/interfaces'

export type CartNetworkStatus =
    'fetching' |
    'fetching-error' |
    'fetching-success' |
    'deleting' |
    'deleting-error' |
    'deleting-success'
    | 'clear-cart' |
    'clear-cart-success' |
    'clear-cart-error' | ''



type PageState = {
    isFormOpen: boolean
}


const initialState: PageState = {
    isFormOpen: false
}


const pageSlice = createSlice({
    name: 'cartSlice',
    initialState,
    reducers: {
        setIsFormOpen: (state, { payload }: PayloadAction<boolean>) => {
            state.isFormOpen = payload
        }
    }
})

export const pageActions = pageSlice.actions
export default pageSlice.reducer