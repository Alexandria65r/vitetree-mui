import { CartItem  as WishListItem} from "../reusable/interfaces";
import axios from 'axios'
export default class WishListAPI {

    static async create(item: WishListItem) {
        const { data } = await axios.post('/api/wishlist/create', item)
        if (data.success) {
            return data.wishListItem as WishListItem
        }
    }

    static update(id: string) {
        return axios.put(`/api/wishlist/update/${id}`)
    }


    static delete(id: string) {
        return axios.delete(`/api/wishlist/delete/${id}`)
    }
    static clearCart(owner: string) {
        return axios.delete(`/api/wishlist/delete/${owner}`)
    }

    static async fetchCartItem(id: string) {
        const { data } = await axios.get(`/api/wishlist/fetch-wishlist-item/${id}`)
        if (data.success) {
            return data.wishListItem as WishListItem
        }
    }

    static async fetchAll(id:string) {
        const { data } = await axios.get(`/api/wishlist/fetch-all/${id}`)
        if (data.success) {
            return data.wishListItems as WishListItem[]
        }
    }
}