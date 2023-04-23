import { createAsyncThunk } from "@reduxjs/toolkit"
import { VideoCourse, CartItem as WishListItem } from "../../src/reusable/interfaces"
import { AppState } from "../../store/store"
import { wishListActions } from "."
import WishListAPI from "../../src/api-services/wishlist"
import Randomstring from 'randomstring'



export const addToWishListThunk = createAsyncThunk<void, VideoCourse, { state: AppState }>
    ('wishListSlice/addToWishListThunk', async (product, thunkAPI) => {
        console.log('called!!')
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

        console.log(newWishItem)

        dispatch(wishListActions.setWishListItem(newWishItem))
        const cartRes = await WishListAPI.create(newWishItem);
        if (cartRes) {

        }

    })


export const fetchWishListItemsThunk = createAsyncThunk<void, string, { state: AppState }>
    ('wishListSlice/fetchWishListItems', async (owner, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        dispatch(wishListActions.setNetworkStatus('fetching'))
        try {
            const cartItems = await WishListAPI.fetchAll(owner)
            if (cartItems) {
                dispatch(wishListActions.setNetworkStatus('success'))
                dispatch(wishListActions.setWishListItems(cartItems))
            }

        } catch (error) {
            dispatch(wishListActions.setNetworkStatus('error'))
        }
    })

