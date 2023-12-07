
import axios from 'axios'
import { Post } from '../models/post'
export default class PostAPI {

    static async create(newVideo: Post) {
        const { data } = await axios.post('/api/post/create', newVideo)
        if (data.success) {
            return data.newPost as Post
        }
    }

    static update(id: string,update:any) {
        return axios.put(`/api/post/update/${id}`,update)
    }


    static delete(id: string) {
        return axios.delete(`/api/post/delete/${id}`)
    }

    static async fetchPost(id: string) {
        const { data } = await axios.get(`/api/post/fetch-post/${id}`)
        if (data.success) {
            return data.post as Post
        }
    }

    static async fetchPosts() {
        const { data } = await axios.get(`/api/post/fetch-posts/limit`)
        if (data.success) {
            return data.posts as Post[]
        }
    }

    static async fetchAll(type: 'introduction' | 'post') {
        const { data } = await axios.get(`/api/post/fetch-all/${type}`)
        if (data.success) {
            return data.posts as Post[]
        }
    }
    static async fetchOwnPosts(id: string, type: 'introduction' | 'post') {
        const { data } = await axios.get(`/api/post/fetch-own-posts/${id}/${type}`)
        if (data.success) {
            return data.posts as Post[]
        }
    }
    static async fetchPurchasedPosts(owner: string) {
        const { data } = await axios.get(`/api/post/fetch-purchased-posts/${owner}`)
        if (data.success) {
            return data.posts as Post[]
        }
    }


}