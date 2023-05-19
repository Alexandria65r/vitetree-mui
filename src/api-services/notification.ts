import { Notification, NotificationType } from "../models/notifications";
import axios from 'axios'
import cookies from "js-cookie";
import { setAxiosDefaults } from "./helpers";
export default class NotificationAPI {

    static async create(newNotification: Notification) {
        const { data } = await axios.post('/api/notification/create', newNotification)
        if (data.success) {
            return data.newNotification as Notification
        }
    }

    static update(id: string) {
        return axios.put(`/api/notification/update/${id}`)
    }

    static delete(id: string) {
        return axios.delete(`/api/notification/delete/${id}`)
    }

    static async fetchAll(owner:string) {
        setAxiosDefaults()
        const { data } = await axios.get(`/api/notification/fetch-all/${owner}`)
        if (data.success) {
            return data.notifications as Notification[]
        }
    }
}

