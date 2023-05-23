
import axios from 'axios'
import { setAxiosDefaults } from "./helpers";
import { AcademicAnswer } from "../models/academic-answer";



export default class AcademicAnswersAPI {

    static async create(newAcademicAnswer: AcademicAnswer) {
        const { data } = await axios.post('/api/academic-answer/create', newAcademicAnswer)
        if (data.success) {
            return data.newAcademicAnswer as AcademicAnswer
        }
    }

    static update(id: string, update: AcademicAnswer | any) {
        return axios.put(`/api/academic-answer/update/${id}`, update)
    }

    static delete(id: string) {
        return axios.delete(`/api/academic-answer/delete/${id}`)
    }

    static async fetchAcademicAnswer(id: string) {
        const { data } = await axios.get(`/api/academic-answer/fetch-academic-answer/${id}`)
        if (data.success) {
            return data.task as AcademicAnswer
        }
    }

    static async fetchAcademicAnswers(ansId: string) {
        setAxiosDefaults()
        const { data } = await axios.get(`/api/academic-answer/fetch-academic-answers/${ansId}`)
        if (data.success) {
            return data.academicAnswers as AcademicAnswer[]
        }
    }

}