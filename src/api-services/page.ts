import path from "path/posix";

import axios from 'axios'
import { setAxiosDefaults } from "./helpers";
import { Page } from "../models/page/page.model";

export type PagesQueryPath = 'studentInfo.id' | 'tutorInfo.id'

export default class PageAPI {

    static async create(newPage: Page) {
        const { data } = await axios.post('/api/page/create', newPage)
        if (data.success) {
            return data.newPage as Page
        }
    }
    static async fetchPage(pageId: string) {
        const { data } = await axios.get(`/api/page/fetch-page/${pageId}`)
        if (data.success) {
            return data.page as Page
        }
    }

    static update(id: string, update: Page | any) {
        return axios.put(`/api/page/update/${id}`, update)
    }

    static delete(id: string) {
        return axios.delete(`/api/page/delete/${id}`)
    }



    static async fetchPages() {
        setAxiosDefaults()
        const { data } = await axios.get(`/api/page/fetch-pages/limit`)
        if (data.success) {
            return data.pages as Page[]
        }
    }

}