import mongoose from "mongoose";
import { Asset } from "../reusable/interfaces";

type Package = {
    name: string;
    amount: number;
    accent: string
}

export type Star = {
    username: string;
    package: Package
}
export type Payout = {

}

export type PostType = 'video' | 'photo' | 'photo-with-audio' | 'audio' | 'text' | '';

export type Post = {
    title: string;
    postId: string;
    description: string;
    cartegory?: string;
    type: PostType;
    author: {
        userId: string
        pageId: string
        pageName: string
    },
    stars: Star[],
    postAssets: {
        audio?: Asset;
        image?: Asset;
        video?: Asset;
    };
    createdAt?: string;
    updatedAt?: string;
}



const _PostSchema = new mongoose.Schema<Post>({
    title: String,
    postId: String,
    description: { type: String, required: false },
    cartegory: String,
    type: String,
    author: {
        userId: String,
        pageId: String,
        pageName:String
    },
    stars: Array,
    postAssets: { type: Object, required: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});


export const PostModel = mongoose.models?.post || mongoose.model<Post>("post", _PostSchema);

export const PostSchema: Post = {
    title: '',
    postId: '',
    description: '',
    type: '',
    author: {
        userId: "",
        pageId: "",
        pageName: ""
    },
    stars: [],
    postAssets: {
        audio: undefined,
        image: undefined,
        video: undefined
    }
}