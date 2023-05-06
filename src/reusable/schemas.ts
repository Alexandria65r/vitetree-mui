import * as Types from "./interfaces";


export const UserSchema: Types.User = {

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

export const StudentInfo: Types.StudentInfo = {
    accountBalance: '',
    startYear: '',
    endYear: '',
    school: '',
    studentId: '',
    subjects: []
}

export const TutorInfo: Types.TutorInfo = {
    accountId: '',
    name: '',
    rating: 0,
    services: [],
    tutorId: '',
    createdAt: '',
    updatedAt: '',
}

export const testDataSchema: Types.Test = {
    _id: '',
    cartegory: '',
    sectionType: '',
    subjectOrlanguage: '',
    sections: [],
    description: '',
    authorId: "",
    status: ''
}

export const StudentInquiry: Types.StudentInquiry = {
    _id: '',
    tutorId: '',
    authorId: '',
    service: {
        name: '',
        perHour: false,
        price: ''
    },
    topic: '',
    subject: '',
    description: '',
    createdAt: '',
    dueDate: '',
}


export const sectionSchems: Types.Section = {
    name: "",
    questions: [],
    wayOfAnswering: '',
    numberOfQuestions: 0
}

export const participantSchema: Types.Participant = {
    fullname: "",
    email: "",
    reason: '',
    testId: "",
    score: "",
    taken: false
}


export const VideoCourseSchema: Types.VideoCourse = {
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

export const PostSchema: Types.Post = {
    _id: '',
    authorId: '',
    title: '',
    type: 'academic question',
    description: '',
    delivery: '',
    request: ''
}
