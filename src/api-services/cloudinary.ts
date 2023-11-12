
import axios from "axios";



export default class CloudinaryService {
    static uploadFile(file: { base64: string, publicId: string }){
        return axios.post('/api/upload-asset', file)
    }
}