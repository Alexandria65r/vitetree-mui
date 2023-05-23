import { Descendant } from "slate"




export interface AcademicAnswer {
    _id: string
    postId: string
    postAuthorId: string
    author: {
        id: string
        userName: string
    }
    upVote: string[]
    downVote: string[]
    data: Descendant[]
    createdAt: string
}


export const taskUpdateModel: AcademicAnswer = {
    _id: '',
    postId: '',
    postAuthorId: '',
    author: {
        id: '',
        userName: ''
    },
    upVote: [],
    downVote: [],
    data: [],
    createdAt: ''
}