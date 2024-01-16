import mongoose from "mongoose"

export type WorkSpace = {
    _id: string;
    cartegory: 'task' | 'feature' | '',
    parentWorkSpaceId?: string,
    name: string,
    createdAt?: string
    updatedAt?: string
    __v?: number
}



const _WorkSpaceSchema = new mongoose.Schema<WorkSpace>({
    _id: String,
    cartegory: String,
    parentWorkSpaceId: { type: String, required: false },
    name: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const WorkSpaceModel = mongoose.models?.workSpace || mongoose.model("workSpace", _WorkSpaceSchema);

export const WorkSpaceSchema: WorkSpace = {
    _id: "",
    cartegory: "",
    name: ""
}
