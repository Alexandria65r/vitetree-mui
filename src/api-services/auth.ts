import axios from "axios";
import { Signin, User } from "../reusable/interfaces";


export default class AuthAPI {

    static DecodeToken(token: string) {
        axios.defaults.headers.common["Authorization"] = token;
        return axios.get('/api/auth/decode-token');
    }
    static signin(signin: Signin) {
        return axios.post('/api/auth/signin', signin)
    }
    static signUp(signup: User) {
        return axios.post('/api/auth/signup', signup)
    }

    static update(id: string, update: any) {
        return axios.put(`/api/auth/update/${id}`, update)
    }
    static async fetchAll(role: string) {
        const { data } = await axios.get(`/api/auth/fetch-all/${role}`)
        if (data.success) {
            return data.users as User[]
        }
    }
    static async fetchUser(id: string) {
        const { data } = await axios.get(`/api/auth/fetch-user/${id}`)
        if (data.success) {
            return data.user as User
        }
    }
    static async fetchInquired(authorId: string) {
        const { data } = await axios.get(`/api/inquiry/fetch-inquired/${authorId}`)
        if (data.success) {
            return data.tutors as User[]
        }
    }

    static delete() {
        return axios.post('/api/auth/delete')
    }


}