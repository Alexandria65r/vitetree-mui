import { User } from "../models/user";
import { StudentInquiry } from "../reusable/interfaces";
import axios from 'axios'



export default class InquiryAPI {

    static async create(newInquiry: StudentInquiry) {
        const { data } = await axios.post('/api/inquiry/create', newInquiry)
        if (data.success) {
            const newInquiry = data.newInquiry as StudentInquiry
            const updatedUser = data.updated as User
            return {
                newInquiry,
                updatedUser
            }
        }
    }

    static update(id: string) {
        return axios.put(`/api/inquiry/update/${id}`)
    }


    static delete(id: string) {
        return axios.delete(`/api/inquiry/delete/${id}`)
    }

    static async fetchInquiry(id: string) {
        const { data } = await axios.get(`/api/inquiry/fetch-inquiry/${id}`)
        if (data.success) {
            return data.inquiry as StudentInquiry
        }
    }

    static async fetchOwnInquiries(authorId: string) {
        const { data } = await axios.get(`/api/inquiry/own-inquiries/${authorId}`)
        if (data.success) {
            return data.inquiries as StudentInquiry[]
        }
    }

    static async fetchInquiries(tutorId: string) {
        const { data } = await axios.get(`/api/inquiry/fetch-inquiries/${tutorId}`)
        if (data.success) {
            return data.inquiries as StudentInquiry[]
        }
    }


}