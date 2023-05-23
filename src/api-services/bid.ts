
import { Bid } from "../models/bid";
import axios from 'axios'


export default class BidAPI {

    static async create(newBid: Bid) {
        const { data } = await axios.post('/api/bid/create', newBid)
        if (data.success) {
            return data.newBid as Bid
        }
    }

    static update(id: string, update: Bid | any) {
        return axios.put(`/api/bid/update/${id}`, update)
    }

    static delete(id: string) {
        return axios.delete(`/api/bid/delete/${id}`)
    }

    static async fetchBid(id: string) {
        const { data } = await axios.get(`/api/bid/fetch-bid/${id}`)
        if (data.success) {
            return data.bid as Bid
        }
    }

    static async fetchBids(postId:string) {
        const { data } = await axios.get(`/api/bid/fetch-bids/${postId}`)
        if (data.success) {
            return data.bids as Bid[]
        }
    }

}