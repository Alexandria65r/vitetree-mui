
import cookies from 'js-cookie'
import axios from 'axios'
import { PUSHMEPAL_AUTH_TOKEN } from '../reusable'

export function setAxiosDefaults() {
    const token = cookies.get(PUSHMEPAL_AUTH_TOKEN)
    axios.defaults.headers.common['Authorization'] = token
}