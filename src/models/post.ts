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
    jobId?: string;
    name: string;
    emoji: string;
    amount: number;
    state: 'pending' | 'sent'
}
export type Like = {
    name: 'like' | 'love' | 'angry' | 'sad' | 'haha' | 'wow' | ''
    owner?: string 
    jobId?: string;
    emoji: string;
}
export type Payout = {

}

export type JobType = 'video' | 'photo' | 'photo-with-audio' | 'audio' | 'text' | '';

export type Job = {
    save?: any;
    title: string;
    jobId: string;
    description: string;
    cartegory?: string;
    author: {
        userId: string
        companyId: string
        pageName: string
        profileAsset?:Asset
    },
    jobAssets: {
        audio?: Asset;
        image?: Asset;
        video?: Asset;
    };
    isReactionsOpen?: boolean;
    createdAt?: string;
    updatedAt?: string;
}



const _JobSchema = new mongoose.Schema<Job>({
    title: String,
    jobId: String,
    description: { type: String, required: false },
    cartegory: String,
    author: {
        companyId: String,
        pageId: String,
        pageName: String
    },
    jobAssets: { type: Object, required: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});


export const JobModel = mongoose.models?.job || mongoose.model<Job>("job", _JobSchema);

export const JobSchema: Job = {
    title: '',
    jobId: '',
    description: '',
    author: {
        userId: "",
        companyId: "",
        pageName: ""
    },
    jobAssets: {
        audio: undefined,
        image: undefined,
        video: undefined
    },
    isReactionsOpen: false,
}


export const LikeSchema: Like = {
    name: '',
    owner: '',
    jobId: '',
    emoji: '',
}
export const TipSchema: Tip = {
    name: "",
    emoji: "",
    amount: 0,
    state: "pending"
}

