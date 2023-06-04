
import axios from 'axios'
import { Card } from '../models/card'
export default class BillingAPI {

    static async fetchCards(owner: string) {
        const { data } = await axios.get(`/api/billing/fetch-all/${owner}`)
        if (data.success) {
            return data.cards as Card[]
        }
    }
    static fetchCard(id: string) {
        return axios.post(`/api/billing/fetch-card/${id}`)
    }
    static addCard(card: Card) {
        return axios.post(`/api/billing/add-card`, card)
    }
    static removeCard(id: string) {
        return axios.delete(`/api/billing/remove-card/${id}`)
    }
}