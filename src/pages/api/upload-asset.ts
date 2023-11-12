import { NextApiRequest, NextApiResponse } from 'next'
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: 'alexandriah65',
    api_key: '448852269434659',
    api_secret: 'r7L3MA-7yZUdmK9pd7aBJVtoTeE'
});

export default async function UploadAsset(req: NextApiRequest, res: NextApiResponse) {
    const file: { base64: string, publicId: string } = req.body

    try {
        cloudinary.uploader.upload(file?.base64,
            { public_id: file.publicId, upload_preset: 'image_preset' },
            function (error, result) {
                if (error) return res.json({ error: true, errorInfo: error })
                console.log(result);
                if (result) {
                    return res.json({
                        success: true,
                        result
                    })
                }
            });

    } catch (error) {
        return res.json({ error: true, errorInfo: error })
    }


}
