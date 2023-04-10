import axios from "axios";
import { Participant } from "../reusable/interfaces";


export default class PartcipantAPI {
    static async fetch(id: string) {
        try {
            const { data } = await axios.get(`/api/partcipate-api/fetch/${id}`)
            if (data.success) {
                return data.partcipant as Participant
            }
        } catch (error) {
            console.log(error)
        }
    }
    static async fetchMany(id: string) {
        try {
            const { data } = await axios.get(`/api/partcipate-api/fetch-many/${id}`)
            if (data.success) {
                return data.partcipants as Participant[]
            }
        } catch (error) {
            console.log(error)
        }
    }

    static create(partcipant: Participant) {
        return axios.post('/api/partcipate-api/create', partcipant)
    }

    static update(id:string, update: any) {
        return axios.put(`/api/partcipate-api/update/${id}`, update)
    }
    
    static delete() {
        return axios.post('/api/partcipate-api/delete')
    }
}