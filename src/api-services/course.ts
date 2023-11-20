import { VideoCourse } from "../reusable/interfaces";
import axios from 'axios'
export default class CourseAPI {

    static async create(newVideo: VideoCourse) {
        const { data } = await axios.post('/api/course/create', newVideo)
        if (data.success) {
            return data.newCourse as VideoCourse
        }
    }

    static update(id: string) {
        return axios.put(`/api/course/update/${id}`)
    }


    static delete(id: string) {
        return axios.delete(`/api/course/delete/${id}`)
    }

    static async fetchCourse(id: string) {
        const { data } = await axios.get(`/api/course/fetch-course/${id}`)
        if (data.success) {
            return data.course as VideoCourse
        }
    }
    static async fetchCourseLectures(id: string) {
        const { data } = await axios.get(`/api/course/fetch-course-lectures/${id}`)
        if (data.success) {
            return data.lectures as VideoCourse[]
        }
    }

    static async fetchAll(type: 'introduction' | 'course') {
        const { data } = await axios.get(`/api/course/fetch-all/${type}`)
        if (data.success) {
            return data.courses as VideoCourse[]
        }
    }
    static async fetchOwnCourses(id: string, type: 'introduction' | 'course') {
        const { data } = await axios.get(`/api/course/fetch-own-courses/${id}/${type}`)
        if (data.success) {
            return data.courses as VideoCourse[]
        }
    }
    static async fetchPurchasedCourses(owner: string) {
        const { data } = await axios.get(`/api/course/fetch-purchased-courses/${owner}`)
        if (data.success) {
            return data.courses as VideoCourse[]
        }
    }


}