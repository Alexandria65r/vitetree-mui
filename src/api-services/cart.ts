import { CartItem } from "../reusable/interfaces";
import axios from 'axios'
export default class CartAPI {

    static async create(item: CartItem) {
        const { data } = await axios.post('/api/cart/create', item)
        if (data.success) {
            return data.newCartItem as CartItem
        }
    }

    static update(id: string) {
        return axios.put(`/api/cart/update/${id}`)
    }


    static delete(id: string) {
        return axios.delete(`/api/cart/delete/${id}`)
    }
    static clearCart(owner: string) {
        return axios.delete(`/api/cart/delete/${owner}`)
    }

    static async fetchCartItem(id: string) {
        const { data } = await axios.get(`/api/cart/fetch-cart-item/${id}`)
        if (data.success) {
            return data.cartItem as CartItem
        }
    }

    static async fetchAll(id:string) {
        const { data } = await axios.get(`/api/cart/fetch-all/${id}`)
        if (data.success) {
            return data.cartItems as CartItem[]
        }
    }
}