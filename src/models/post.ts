import mongoose from "mongoose";
import { Asset } from "../reusable/interfaces";
import React from "react";

type Package = {
    name: string;
    amount: number;
    accent: string
}

export type Star = {
    username: string;
    package: Package
}
export type Tip = {
    owner?: string;
    postId?: string;
    name: string;
    emoji: string;
    amount: number;
    state: 'pending' | 'sent'
}
export type Like = {
    name: 'like' | 'love' | 'angry' | 'sad' | 'haha' | 'wow' | ''
    owner?: string 
    postId?: string;
    emoji: string;
}
export type Payout = {

}

export type PostType = 'video' | 'photo' | 'photo-with-audio' | 'audio' | 'text' | '';

export type Post = {
    save?: any;
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
    likes: Like[],
    tips: Tip[],
    postAssets: {
        audio?: Asset;
        image?: Asset;
        video?: Asset;
    };
    isReactionsOpen?: boolean;
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
        pageName: String
    },
    likes: Array,
    tips: Array,
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
    likes: [],
    tips: [],
    postAssets: {
        audio: undefined,
        image: undefined,
        video: undefined
    },
    isReactionsOpen: false,
}


export const LikeSchema: Like = {
    name: '',
    owner: '',
    postId: '',
    emoji: '',
}
export const TipSchema: Tip = {
    name: "",
    emoji: "",
    amount: 0,
    state: "pending"
}

