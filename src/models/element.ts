import mongoose from "mongoose"
import { PickerBtn } from "../reusable/interfaces"
import { Person } from "./workspace"
export type ElementType = 'list-group-element' | ''


export type SubFeature = {
    parentFeature: string,
    name: string,
    description: string,
    createdAt?: string,
    color?: string
}

export type Element = {
    _id: string;
    elementType: ElementType,
    workspaceId: string,
    boardId: string,
    groupId?: string,
    name: string,
    isAddingSubFeature?: boolean
    isAddingNote?: boolean
    isShowOptions?: boolean
    isCollapsed?: boolean,
    showActionBtns?: boolean
    isNameEdditing?: boolean
    isPickerOpen?: boolean
    priority?: PickerBtn
    status?: PickerBtn
    loading?: boolean
    person?: Person,
    updatesCount?: number
    createdAt?: string
    updatedAt?: string
    __v?: number
}



const _ElementSchema = new mongoose.Schema<Element>({
    _id: String,
    elementType: String,
    boardId: String,
    groupId: String,
    workspaceId: String,
    name: String,
    priority: {
        value: String,
        accent: String,
    },
    status: {
        value: String,
        accent: String,
    },
    person: {type:Object, required:false},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const ElementModel = mongoose.models?.element || mongoose.model("element", _ElementSchema);

export const ElementSchema: Element = {
    _id: "",
    elementType: "",
    name: "",
    workspaceId: "",
    boardId: ""
}

export const SubFeatureSchema: SubFeature = {
    parentFeature: '',
    name: "",
    description: "",
}


