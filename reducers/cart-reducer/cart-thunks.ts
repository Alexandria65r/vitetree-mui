import { createAsyncThunk } from "@reduxjs/toolkit";
import { CartItem, VideoCourse } from "../../src/reusable/interfaces";
import { AppState } from "../../store/store";
import Randomstring from "randomstring";
import { cartActions } from ".";
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
                id:product._id,
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
                dispatch(cartActions.setNetworkStatus('success'))
                dispatch(cartActions.setCartItems(cartItems))
            }

        } catch (error) {
            dispatch(cartActions.setNetworkStatus('error'))
        }
    })