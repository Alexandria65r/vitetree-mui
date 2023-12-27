
import axios from 'axios'
import { Job } from '../models/post'

export default class JobAPI {

    static async create(newVideo: Job) {
        const { data } = await axios.post('/api/post/create', newVideo)
        if (data.success) {
            return data.newJob as Job
        }
    }

    static update(id: string,update:any) {
        return axios.put(`/api/post/update/${id}`,update)
    }


    static delete(id: string) {
        return axios.delete(`/api/post/delete/${id}`)
    }

    static async fetchJob(id: string) {
        const { data } = await axios.get(`/api/post/fetch-job/${id}`)
        if (data.success) {
            return data.job as Job
        }
    }

    static async fetchJobs() {
        const { data } = await axios.get(`/api/post/fetch-jobs/limit`)
        if (data.success) {
            return data.jobs as Job[]
        }
    }

    static async fetchAll(type: 'introduction' | 'job') {
        const { data } = await axios.get(`/api/post/fetch-all/${type}`)
        if (data.success) {
            return data.jobs as Job[]
        }
    }
    static async fetchOwnJobs(id: string, type: 'introduction' | 'job') {
        const { data } = await axios.get(`/api/post/fetch-own-jobs/${id}/${type}`)
        if (data.success) {
            return data.jobs as Job[]
        }
    }
    static async fetchPurchasedJobs(owner: string) {
        const { data } = await axios.get(`/api/post/fetch-purchased-jobs/${owner}`)
        if (data.success) {
            return data.jobs as Job[]
        }
    }


}