import { createAsyncThunk } from "@reduxjs/toolkit"
import { VideoCourse, CartItem as WishListItem } from "../../src/reusable/interfaces"
import { AppState } from "../../store/store"
import { wishListActions } from "."
import WishListAPI from "../../src/api-services/wishlist"
import Randomstring from 'randomstring'
import { cartActions } from "../cart-reducer"
import CartAPI from "../../src/api-services/cart"



export const addToWishListThunk = createAsyncThunk<void, VideoCourse, { state: AppState }>
    ('wishListSlice/addToWishListThunk', async (product, thunkAPI) => {
        const state = thunkAPI.getState()
        const dispatch = thunkAPI.dispatch
        const cartId = Randomstring.generate(17)
        const owner = state.AuthReducer.user._id ?? ''

        const newWishItem: WishListItem = {
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

        dispatch(wishListActions.setWishListItem(newWishItem))
        try {
            const cartRes = await WishListAPI.create(newWishItem);
            if (cartRes) {
    
            }
            
        } catch (error) {
            
        }

    })


export const fetchWishListItemsThunk = createAsyncThunk<void, string, { state: AppState }>
    ('wishListSlice/fetchWishListItems', async (owner, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        dispatch(wishListActions.setNetworkStatus('fetching'))
        try {
            const wishListItems = await WishListAPI.fetchAll(owner)
            if (wishListItems) {
                dispatch(wishListActions.setNetworkStatus('fetching-success'))
                dispatch(wishListActions.setWishListItems(wishListItems))
            }

        } catch (error) {
            dispatch(wishListActions.setNetworkStatus('fetching-success'))
        }
    })


export const clearWishListThunk = createAsyncThunk<void, undefined, { state: AppState }>
    ('wishListSlice/clearWishListThunk', async (_, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const { AuthReducer: { user: { _id: owner } } } = thunkAPI.getState()
        try {
            dispatch(wishListActions.setNetworkStatus('clearing-wishlist'))
            const { data } = await WishListAPI.clearWishList(owner ?? '')
            if (data.success) {
                dispatch(wishListActions.setNetworkStatus('clearing-wishlist-success'))
                dispatch(wishListActions.setWishListItems([]))
                setTimeout(() => {
                    dispatch(wishListActions.toggleWishListModal(false))
                }, 2000)
            }
        } catch (error) {
            dispatch(wishListActions.setNetworkStatus('clearing-wishlist-error'))
        }
    })
export const deleteWishListThunk = createAsyncThunk<WishListItem[] | undefined, string, { state: AppState }>
    ('wishListSlice/deleteWishListThunk', async (itemId, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const { AuthReducer: { user: { _id: owner } } } = thunkAPI.getState()
        const { WishListReducer: { wishListItems } } = thunkAPI.getState()

        try {
            dispatch(wishListActions.setNetworkStatus('deleting'))
            const newData = wishListItems.filter((item) => item._id !== itemId)
            dispatch(wishListActions.setWishListItems(newData))
            const { data } = await WishListAPI.delete(itemId)
            if (data.success) {
                dispatch(wishListActions.setNetworkStatus('deleting-success'))
                if (!newData.length) {
                    setTimeout(() => {
                        dispatch(wishListActions.toggleWishListModal(false))
                    }, 2000)
                }
                return newData
            }
        } catch (error) {
            dispatch(fetchWishListItemsThunk(owner ?? ''))
            dispatch(wishListActions.setNetworkStatus('deleting-error'))
        }
    })



export const moveToCartThunk = createAsyncThunk<void, WishListItem, { state: AppState }>
    ('wishlistSlice/moveToCartThunk', async (product, thunkAPI) => {
        const state = thunkAPI.getState()
        const dispatch = thunkAPI.dispatch
        dispatch(wishListActions.setMovingId(product._id))
        const cartId = Randomstring.generate(17)
        const { WishListReducer: { wishListItems }, CartReducer: { cartItems } } = thunkAPI.getState()
        const owner = state.AuthReducer.user._id ?? ''
        const newCartItem: WishListItem = {
            ...product,
            _id: cartId,
        }
        //if alredy exists do move it delete it instead
        const exists = cartItems.find((item) => item.title === product.title)
        if (exists) {
            const { payload }: any = await dispatch(deleteWishListThunk(product._id))
            if (payload) {
                dispatch(wishListActions.setWishListItems(payload))
            }
            return
        }

        dispatch(wishListActions.setNetworkStatus('moving'))
        //open cart after moving all
        try {
            const cartRes = await CartAPI.create(newCartItem);
            if (cartRes) {
                dispatch(wishListActions.setNetworkStatus('moving-success'))
                dispatch(cartActions.setCartItem(newCartItem))
                const { payload }: any = await dispatch(deleteWishListThunk(product._id))
                if (payload?.length === 0) {
                    dispatch(cartActions.toggleCartModal(true))
                }
            }
        } catch (error) {
            dispatch(wishListActions.setNetworkStatus('moving-error'))
        }
    })

