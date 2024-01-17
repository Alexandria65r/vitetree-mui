import mongoose from "mongoose"


export type Board = {
    _id?: string;
    cartegory?: string
    workspaceId:string
    name: string,
    author: {
        id: string
    },
    color: string
    description: string
    createdAt?: string
    updatedAt?: string
    __v?: number
}


const _BoardSchema = new mongoose.Schema<Board>({
    _id: String,
    name: String,
    color: String,
    workspaceId:String,
    author: {
        id: String
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const BoardModel = mongoose.models?.board || mongoose.model("board", _BoardSchema);

export const BoardSchema: Board = {
    name: "",
    author: {
        id: ""
    },
    color: "",
    description: '',
    workspaceId: "",
}
