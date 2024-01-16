import mongoose from "mongoose"

export type SubFeature = {
    parentFeature: string,
    name: string,
    description: string,
    createdAt?: string,
    color?: string
}
export type Person = {
    id: string,
    username: string,
    publicId: string,
    initials: string
}
export type Board = {
    _id: string;
    cartegory: 'task' | 'feature' | '',
    name: string,
    author: {
        id: string
    },
    createdAt?: string
    updatedAt?: string
    __v?: number
}



const _BoardSchema = new mongoose.Schema<Board>({
    _id: String,
    cartegory: String,
    name: String,
    author:{
        id:String
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const BoardModel = mongoose.models?.board || mongoose.model("board", _BoardSchema);

export const BoardSchema: Board = {
    _id: "",
    cartegory: "",
    name: "",
    author: {
        id: ""
    }
}
