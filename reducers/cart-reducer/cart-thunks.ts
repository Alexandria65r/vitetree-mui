import { createAsyncThunk } from "@reduxjs/toolkit";
import { CartItem, VideoCourse } from "../../src/reusable/interfaces";
import { AppState } from "../../store/store";
import Randomstring from "randomstring";
import { cartActions } from "../cart-reducer";
import CartAPI from "../../src/api-services/cart";



export const addToCartThunk = createAsyncThunk<void, VideoCourse, { state: AppState }>
    ('cartSlice/addToCartThunk', async (product, thunkAPI) => {
        const state = thunkAPI.getState()
        const dispatch = thunkAPI.dispatch
        const cartId = Randomstring.generate(17)
        const owner = state.AuthReducer.user._id ?? ''
        const newCartItem: CartItem = {
            _id: cartId,
            title: product.title,
            owner,
            price: product.price,
            link: `/course/${product._id}`,
            productInfo: {
                id: product._id,
                authorId: product.authorId,
                name: 'FreeMan'
            },
            imageAsset: product.imageAsset
        }

        dispatch(cartActions.setCartItem(newCartItem))
        const cartRes = await CartAPI.create(newCartItem);
        if (cartRes) {

        }

    })


export const fetchCartItemsThunk = createAsyncThunk<void, string, { state: AppState }>
    ('cartSlice/fetchCartItems', async (owner, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        dispatch(cartActions.setNetworkStatus('fetching'))
        const state = thunkAPI.getState()
        try {
            const cartItems = await CartAPI.fetchAll(owner)
            if (cartItems) {
                dispatch(cartActions.setNetworkStatus('fetching-success'))
                dispatch(cartActions.setCartItems(cartItems))
            }

        } catch (error) {
            dispatch(cartActions.setNetworkStatus('fetching-error'))
        }
    })


export const deleteCartItemThunk = createAsyncThunk<void, string, { state: AppState }>
    ('cartSlice/deleteCartItemThunk', async (itemId, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const { AuthReducer: { user: { _id: owner } } } = thunkAPI.getState()
        const { CartReducer: { cartItems } } = thunkAPI.getState()
        try {
            dispatch(cartActions.setNetworkStatus('deleting'))
            const newData = cartItems.filter((item) => item._id !== itemId)
            dispatch(cartActions.setCartItems(newData))
            const { data } = await CartAPI.delete(itemId)
            if (data.success) {
                dispatch(cartActions.setNetworkStatus('deleting-success'))
                if (!newData.length) {
                    setTimeout(() => {
                        dispatch(cartActions.toggleCartModal(false))
                    }, 2000)
                }
            }
        } catch (error) {
            dispatch(fetchCartItemsThunk(owner ?? ''))
            dispatch(cartActions.setNetworkStatus('deleting-error'))
        }
    })


export const clearCartThunk = createAsyncThunk<void, undefined, { state: AppState }>
    ('cartSlice/clearCartThunk', async (_,thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const { AuthReducer: { user: { _id: owner } } } = thunkAPI.getState()
        try {
            dispatch(cartActions.setNetworkStatus('clear-cart'))
            const { data } = await CartAPI.clearCart(owner ?? '')
            if (data.success) {
                dispatch(cartActions.setNetworkStatus('clear-cart-success'))
                dispatch(cartActions.setCartItems([]))
            }
        } catch (error) {
            dispatch(fetchCartItemsThunk(owner ?? ''))
            dispatch(cartActions.setNetworkStatus('clear-cart-error'))
        }
    })