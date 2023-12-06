import mongoose from "mongoose";
import { Asset } from "../../reusable/interfaces";


export type Star = {
    type: 'post-tip' | 'support-creator',
    postId?: string;
    owner: string;
    amount: number;
    accent?: string;
    emoji?: string
}
export type Payout = {

}


export type Page = {
    name: string;
    pageId: string;
    bio: string;
    cartegory: string;
    author: {
        id: string
    },
    earnings: {
        balance: number;
        activity: {
            payouts: Payout[];
            stars: Star[]
        }
    },
    imageAssets: {
        profile: Asset;
        background: Asset;
    };
    about: string,
    published: boolean,
    createdAt?: string;
    updatedAt?: string;

}


const earningsSchema = new mongoose.Schema({
    balance: Number,
    activity: {
        type: Object, required: false,
        payouts: { type: Array, required: false },
        stars: { type: Array, required: false },
    },
})


const _PageSchema = new mongoose.Schema<Page>({
    name: String,
    pageId: String,
    bio: String,
    cartegory: String,
    author: {
        id: String
    },
    earnings: {
        balance: Number,
        activity: { type: Object, required: false, },
    },
    imageAssets: {
        profile: { type: Object, required: false },
        background: { type: Object, required: false },
    },
    about: String,
    published: { type: Boolean, required: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});


export const CreatorPage = mongoose.models?.page || mongoose.model<Page>("page", _PageSchema);

export const PageSchema: Page = {
    name: '',
    pageId: '',
    bio: '',
    cartegory: '',
    author: {
        id: ''
    },
    earnings: {
        balance: 0,
        activity: {
            payouts: [],
            stars: []
        }
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
    about: '',
    published: false
}