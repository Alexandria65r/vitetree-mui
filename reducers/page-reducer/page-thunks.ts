import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppState } from "../../store/store";
import { cartActions } from "../cart-reducer";
import PageAPI from "../../src/api-services/page";
import { Page } from "../../src/models/page/page.model";
import router from "next/router";
import { pageActions } from ".";
import { createToastThunk } from "../main-reducer/main-thunks";


export const createPageThunk = createAsyncThunk<void, undefined, { state: AppState }>
    ('cartSlice/createPageThunk', async (_, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const { AuthReducer: { user: { _id: owner } }, PageReducer: { page } } = thunkAPI.getState()
        const pageId = page.name.replace(' ', '').toLowerCase()

        try {
            const newPagePayload: Page = {
                ...page,
                pageId,
                earnings: {
                    balance: 0
                },
                author: {
                    id: owner ?? ''
                }
            }
            const newPage = await PageAPI.create(newPagePayload)
            if (newPage) {
                router.replace(`/page/${newPage.pageId}`)
                dispatch(pageActions.setIsFormOpen(false))
            }
        } catch (error) {
            dispatch(cartActions.setNetworkStatus('clear-cart-error'))
        }
    })


export const fetchPageThunk = createAsyncThunk<void, string, { state: AppState }>
    ('cartSlice/fetchPageThunk', async (pageId, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const { AuthReducer: { user: { _id: owner } }, PageReducer: { page } } = thunkAPI.getState()
        try {
            const pageData = await PageAPI.fetchPage(pageId)
            if (pageData) {
                dispatch(pageActions.setPageData(pageData))
            }
        } catch (error) {
            dispatch(cartActions.setNetworkStatus('clear-cart-error'))
        }
    })
export const fetchPagesThunk = createAsyncThunk<void, undefined, { state: AppState }>
    ('cartSlice/fetchPagesThunk', async (pageId, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        try {
            const pages = await PageAPI.fetchPages()
            if (pages) {
                dispatch(pageActions.setPages(pages))
            }
        } catch (error) {
            dispatch(cartActions.setNetworkStatus('clear-cart-error'))
        }
    })


export const updatePageThunk = createAsyncThunk<any, any, { state: AppState }>
    ('cartSlice/fetchPageThunk', async (update, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const { AuthReducer: { user: { _id: owner } }, PageReducer: { page } } = thunkAPI.getState()
        try {
            const { data } = await PageAPI.update(page.pageId, update)
            if (data.success) {
                return { ...data }
            }
        } catch (error) {
            dispatch(cartActions.setNetworkStatus(''))
        }
    })