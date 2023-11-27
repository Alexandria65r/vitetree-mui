import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CartItem } from '../../src/reusable/interfaces'
import { Page, PageSchema } from '../../src/models/page/page.model'

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
    page:Page;
    pages:Page[];
    isFormOpen: boolean;

}


const initialState: PageState = {
    page: PageSchema,
    pages: [],
    isFormOpen: false
}




const pageSlice = createSlice({
    name: 'cartSlice',
    initialState,
    reducers: {
        setIsFormOpen: (state, { payload }: PayloadAction<boolean>) => {
            state.isFormOpen = payload
        },
        setPageData: (state, { payload }: PayloadAction<Page>) => {
            state.page = payload
        },
        setPages: (state, { payload }: PayloadAction<Page[]>) => {
            state.pages = payload
        }
    }
})

export const pageActions = pageSlice.actions
export default pageSlice.reducer