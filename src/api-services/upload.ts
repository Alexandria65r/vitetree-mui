import { UploadPayload, VideoCourse } from "../reusable/interfaces";
import axios from 'axios'
export default class UploadAPI {
    // upload to cloudinary
    static uploadFile({ base64, resource_type, preset }: UploadPayload) {
        const url = `https://api.cloudinary.com/v1_1/alexandriah65/${resource_type}/upload`;

        const formData = new FormData();
        formData.append("file", base64 as string);
        formData.append("upload_preset", preset);

        return fetch(url, {
            method: "POST",
            body: formData,
        })
            .then((res) => res.json())
            .then((data) => data).catch((error) => {
                console.log(error)
            });
    }

    //delete assets
    static DeleteAsset(resource_type: string, public_id: string) {
        return axios.post(`/api/delete-cloudinary-asset/${resource_type}`, {
            public_id,
        });
    }
}