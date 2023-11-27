import mongoose from "mongoose";
import { Asset } from "../../reusable/interfaces";


export type Star = {

}
export type Payout = {

}


export type Page = {
    name: string;
    pageId: string;
    bio: string;
    author: {
        id: string
    },
    earnings: {
        balance: number;
        activity?: {
            payouts: Payout;
            stars: Star
        }
    },
    imageAssets: {
        profile: Asset;
        background: Asset;
    };
    about:string,
    published: boolean,
    createdAt?: string;
    updatedAt?: string;
}



const _PageSchema = new mongoose.Schema<Page>({
    name: String,
    pageId: String,
    bio: String,
    author: {
        id: String
    },
    earnings: {
        balance: Number,
        activity: {
            payouts: { type: Object, required: false },
            stars: { type: Object, required: false },
        },
    },
    imageAssets: {
        profile: { type: Object, required: false },
        background: { type: Object, required: false },
    },
    about:String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});


export const CreatorPage = mongoose.models?.page  || mongoose.model<Page>("page", _PageSchema);

export const PageSchema: Page = {
    name: '',
    pageId: '',
    bio: '',
    author: {
        id: ''
    },
    earnings: {
        balance: 0,
    },
    imageAssets: {
        profile: {
            publicId: "",
            secureURL: ""
        },
        background: {
            publicId: "",
            secureURL: ""
        }
    },
    about:'',
    published:false
}