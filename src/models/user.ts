import mongoose from "mongoose";
import { Asset, Role } from "../reusable/interfaces";


export type User = {
    _id?: string,
    firstName: string
    lastName: string,
    email: string,
    password: string
    imageAsset?: Asset,
    pageInfo?: {
        pageId?: string;
        name: string
        photoURL:string
    }
    role?: Role,
    interaction?: Role;
    gender: 'female' | 'male' | '',
    birthday?: string;
    phone?: string;
    country?: string;
    accountBalance?: string,
    createdAt?: string
}


const _UserSchema = new mongoose.Schema<User>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: false },
    interaction: { type: String, required: false },
    birthday: { type: String, required: false },
    password: { type: String, required: true },
    country: { type: String, required: false },
    phone: { type: String, required: true },
    pageInfo: {
        pageId: { type: String, required: false },
        name: { type: String, required: false },
        photoURL: { type: String, required: false },
    },
    imageAsset: { publicId: String, secureURL: String },
    accountBalance: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
});

export const UserModel = mongoose.models?.user || mongoose.model<User>("user", _UserSchema);

export const UserSchema: User = {
    gender: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    birthday: "",
    country: ""
}
