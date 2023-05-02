import { Participant, Post, Section, Test, User, VideoCourse } from "./interfaces";


export const UserSchema: User = {

    firstName: '',
    lastName: '',
    email: '',
    password: '',
    imageAsset: {
        publicId: '',
        secureURL: ''
    },
    role: ''
}

export const testDataSchema: Test = {
    _id: '',
    cartegory: '',
    sectionType: '',
    subjectOrlanguage: '',
    sections: [],
    description: '',
    authorId: "",
    status: ''
}


export const sectionSchems: Section = {
    name: "",
    questions: [],
    wayOfAnswering: '',
    numberOfQuestions: 0
}

export const participantSchema: Participant = {
    fullname: "",
    email: "",
    reason: '',
    testId: "",
    score: "",
    taken: false
}


export const VideoCourseSchema: VideoCourse = {
    _id: '',
    description: '',
    price: '',
    title: '',
    type: '',
    authorId: '',
    vidAsset: {
        publicId: '',
        secureURL: ''
    },
    imageAsset: {
        publicId: '',
        secureURL: ''
    }

}


export const CartItem = {
    _id: '',
    owner: '',
    price: '',
    imageAsset: '',
}

export const PostSchema: Post = {
    _id:'',
    authorId:'',
    title:'',
    type:'academic question',
    description:'',
    delivery:'',
    request:''
}
