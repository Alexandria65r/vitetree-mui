import mongoose from "mongoose"
import { PickerBtn } from "../reusable/interfaces"

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
export type Element = {
    _id: string;
    projectAccessId: string,
    elementType: 'parent' | 'child' | '',
    cartegory: 'task' | 'feature' | '',
    parentElementId?: string,
    name: string,
    isAddingSubFeature?: boolean
    isAddingNote?: boolean
    isShowOptions?: boolean
    color?: string
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



const ElementSchema = new mongoose.Schema<Element>({
    _id: String,
    projectAccessId: String,
    cartegory: String,
    elementType: String,
    parentElementId: { type: String, required: false },
    name: String,
    priority: {
        value: String,
        accent: String,
    },
    status: {
        value: String,
        accent: String,
    },
    person: {
        id: String,
        username: String,
        publicId: String,
        initials: String,
    },
    color: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const ElementModel = mongoose.models?.element || mongoose.model("element", ElementSchema);



export const SubFeatureSchema: SubFeature = {
    parentFeature: '',
    name: "",
    description: "",
}
export const FeatureSchema: Element = {
    projectAccessId: "",
    cartegory: "",
    elementType: "",
    parentElementId: "",
    name: "",
    priority: {
        value: "",
        accent: "",
    },
    status: {
        value: "",
        accent: "",
    },
    _id: ""
}