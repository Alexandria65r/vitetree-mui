import mongoose from "mongoose"

export type ListGroup = {
    _id?: string;
    workspaceId: string,
    boardId: string,
    author: {
        id: string
    },

    name: string,
    color?: string
    isCollapsed?: boolean,
    showActionBtns?: boolean
    isNameEdditing?: boolean
    createdAt?: string
    updatedAt?: string
    __v?: number
}



const _ListGroupSchema = new mongoose.Schema<ListGroup>({
    _id: String,
    workspaceId: String,
    boardId: String,
    name: String,
    color: String,
    author: {
        id: String
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const ListGroupModel = mongoose.models?.listGroup || mongoose.model("listGroup", _ListGroupSchema);

export const ListGroupSchema: ListGroup = {
    name: "",
    boardId: "",
    workspaceId: "",
    author: {
        id: ""
    },
}

