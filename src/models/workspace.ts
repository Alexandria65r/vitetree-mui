import mongoose from "mongoose"

export type Workspace = {
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



const _WorkspaceSchema = new mongoose.Schema<Workspace>({
    _id: String,
    cartegory: String,
    name: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const WorkspaceModel = mongoose.models?.workspace || mongoose.model("workspace", _WorkspaceSchema);

export const WorkspaceSchema: Workspace = {
    _id: "",
    cartegory: "",
    name: "",
    author: {
        id: ""
    }
}
