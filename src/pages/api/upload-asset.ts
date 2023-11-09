import { NextApiRequest, NextApiResponse } from 'next'
import { v2 as cloudinary } from 'cloudinary';
import { DropzoneItem } from '../../../reducers/dropzone-reducer';

cloudinary.config({
    cloud_name: 'alexandriah65',
    api_key: '448852269434659',
    api_secret: 'r7L3MA-7yZUdmK9pd7aBJVtoTeE'
});

export default async function UploadAsset(req: NextApiRequest, res: NextApiResponse) {
    const file: { base64: string, publicId:string} = req.body
    cloudinary.uploader.upload(file?.base64 ,
        { public_id: file.publicId},
        function (error, result) {
            if (error) return res.json({ error: true, message:error })
            console.log(result);
            if (result) {
                return res.json({
                    success: true,
                    result
                })
            }
        });
}