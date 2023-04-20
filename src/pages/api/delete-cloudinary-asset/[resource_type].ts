import { NextApiRequest, NextApiResponse } from "next";
import { v2 as cld } from "cloudinary";


cld.config({
    cloud_name: "alexandriah65",
    api_key: "448852269434659",
    api_secret: "r7L3MA-7yZUdmK9pd7aBJVtoTeE",
    secure: false,
});


export async function deleteAsset(resource_type: string, public_id: string) {
    return await cld.uploader.destroy(
        public_id,
        { resource_type },
        function (error, result) {
            return result;
        }
    );
}



export default async function DeleteAsset (req: NextApiRequest, res: NextApiResponse) {
    const resource_type: any = req.query.resource_type || [];
    const { public_id } = req.body;
    console.log(public_id);

    const response = await deleteAsset(resource_type, public_id);
    if (response.result === "not found") {
        console.log(response.result);
        res.json({ error: true });
    } else {
        console.log(response.result);
        res.json({ success: true });
    }
}