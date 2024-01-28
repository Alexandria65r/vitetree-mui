import mongoose from "mongoose"

export type Person = {
    id?: string,
    email?: string,
    username?: string,
    initials?: string
    publicId?: string,
    createdAt: string
}

export type Workspace = {
    _id?: string;
    cartegory: 'task' | 'feature' | '',
    name: string,
    author: {
        id: string
    },
    people: Person[]
    description: string
    createdAt?: string
    updatedAt?: string
    __v?: number
}



const _WorkspaceSchema = new mongoose.Schema<Workspace>({
    _id: String,
    cartegory: String,
    name: String,
    author: {
        id: String
    },
    people: Array,
    description: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const WorkspaceModel = mongoose.models?.workspace || mongoose.model("workspace", _WorkspaceSchema);

export const WorkspaceSchema: Workspace = {
    name: "",
    cartegory: "",
    author: {
        id: ""
    },
    description: "",
    people: []
}
