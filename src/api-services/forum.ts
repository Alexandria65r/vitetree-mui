import { Post, PostType } from "../reusable/interfaces";
import axios from 'axios'
export default class ForumAPI {

    static async create(item: Post) {
        const { data } = await axios.post('/api/forum/create', item)
        if (data.success) {
            return data.newPost as Post
        }
    }

    static update(id: string) {
        return axios.put(`/api/forum/update/${id}`)
    }


    static delete(id: string) {
        return axios.delete(`/api/forum/delete/${id}`)
    }
    static clearCart(owner: string) {
        return axios.delete(`/api/forum/delete/${owner}`)
    }

    static async fetchPostItem(id: string) {
        const { data } = await axios.get(`/api/forum/fetch-post-item/${id}`)
        if (data.success) {
            return data.post as Post
        }
    }

    static async fetchAll(type: PostType) {
        const { data } = await axios.get(`/api/forum/fetch-all/${type}`)
        if (data.success) {
            return data.posts as Post[]
        }
    }
    static async fetchOwnPosts(id:string, type: PostType) {
        const { data } = await axios.get(`/api/forum/my-posts/${id}/${type}`)
        if (data.success) {
            return data.posts as Post[]
        }
    }
}