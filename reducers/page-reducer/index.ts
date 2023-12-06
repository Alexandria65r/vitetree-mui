import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CartItem } from '../../src/reusable/interfaces'
import { Page, PageSchema } from '../../src/models/page/page.model'

export type PageNetworkStatus =
    'fetching' |
    'fetching-error' |
    'fetching-success' |
    'updating' |
    'updating-error' |
    'updating-success' |
    'deleting' |
    'deleting-error' |
    'deleting-success'|''



type PageState = {
    page: Page;
    pages: Page[];
    isFormOpen: boolean;
    pageNetworkStatus: PageNetworkStatus

}


const initialState: PageState = {
    page: PageSchema,
    pages: [],
    isFormOpen: false,
    pageNetworkStatus: ''
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
        },
        setPageNetworkStatus: (state, { payload }: PayloadAction<PageNetworkStatus>) => {
            state.pageNetworkStatus = payload
        }
    }
})

export const pageActions = pageSlice.actions
export default pageSlice.reducer