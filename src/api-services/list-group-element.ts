
import axios from 'axios'
import { Element } from '../models/element'

export default class ListGroupElementAPI {

    static async create(newElement: Element) {
        const { data } = await axios.post('/api/element/create', newElement)
        if (data.success) {
            return data.newElement as Element
        }
    }

    static update(id: string,update:any) {
        return axios.put(`/api/element/update/${id}`,update)
    }


    static delete(id: string) {
        return axios.delete(`/api/element/delete/${id}`)
    }

    static async fetchElement(id: string) {
        const { data } = await axios.get(`/api/element/fetch-element/${id}`)
        if (data.success) {
            return data.element as Element
        }
    }

    static async fetchElements() {
        const { data } = await axios.get(`/api/element/fetch-elements/limit`)
        if (data.success) {
            return data.elements as Element[]
        }
    }

    static async fetchAll(type: 'introduction' | 'element') {
        const { data } = await axios.get(`/api/element/fetch-all/${type}`)
        if (data.success) {
            return data.elements as Element[]
        }
    }
    static async fetchOwnElements(id: string, type: 'introduction' | 'element') {
        const { data } = await axios.get(`/api/element/fetch-own-elements/${id}/${type}`)
        if (data.success) {
            return data.elements as Element[]
        }
    }
    static async fetchPurchasedElements(owner: string) {
        const { data } = await axios.get(`/api/element/fetch-purchased-elements/${owner}`)
        if (data.success) {
            return data.elements as Element[]
        }
    }


}