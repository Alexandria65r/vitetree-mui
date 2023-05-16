
import cookies from 'js-cookie'
import axios from 'axios'
import { SCHOOYARD_AUTH_TOKEN } from '../reusable'

export function setAxiosDefaults() {
    const token = cookies.get(SCHOOYARD_AUTH_TOKEN)
    axios.defaults.headers.common['Authorization'] = token
}