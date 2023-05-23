import { Asset } from "../reusable/interfaces"




export type Bid = {
    _id: string
    author: {
        id: string
        name: string
    },
    coverLater: string
    postId: string
    postAuthorId: string
    imageAsset?: Asset
    viewed: boolean
    awarded: boolean
    createdAt?: string
}


export const bidModel: Bid = {
    _id: '',
    author: {
        id: '',
        name: ''
    },
    coverLater: '',
    postId: '',
    postAuthorId: '',
    viewed: false,
    awarded: false,
}