
import axios from "axios";
import { DropzoneItem } from "../../reducers/dropzone-reducer";


export default class CloudinaryService {
    static uploadFile(file: { base64: string, publicId: string }){
        return axios.post('/api/upload-asset', file)
    }
}