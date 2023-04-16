import axios from "axios";
import { Test } from "../reusable/interfaces";


export default class TestAPI {

    static async fetchOne(testId: string) {
        try {
            const { data } = await axios.get(`/api/test-api/fetch/${testId}`)
            if (data.success) {
                return data.testData as Test
            }
        } catch (error) {
            console.log(error)
        }
    }
    static async fetchMany(authorId: string) {
        try {
            const { data } = await axios.get(`/api/test-api/fetch-many/${authorId}`)
            if (data.success) {
                return data.testsList as Test[]
            }
        } catch (error) {
            console.log(error)
        }
    }

    static async create(newTest: Test) {
        try {
            const { data } = await axios.post('/api/test-api/create', newTest)
            return data.newTest as Test

        } catch (error) {
            console.log(error)
        }
    }
    static update(id: string, update: any) {
        return axios.put(`/api/test-api/update/${id}`, update)
    }
    static delete(id:string) {
        return axios.delete(`/api/test-api/delete/${id}`)
    }
}