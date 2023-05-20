import * as Types from "./interfaces";
import { TutorService } from "./interfaces";


export const UserSchema: Types.User = {
    role: '',
    gender:'',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
}

export const StudentInfo: Types.StudentInfo = {
    accountBalance: '00.00',
    startYear: '',
    endYear: '',
    school: '',
    studentId: '',
   // subjects: [],
    description: ''
}

export const TutorInfo: Types.TutorInfo = {
    accountId: '',
    name: '',
    collage: '',
    qualifications: '',
    rating: 0,
    services: [],
    tutorId: '',
    description: '',
    startYear: '',
    endYear: '',
    yearsOfExperience: 0,
    status: '',
    subjects: []

}

export const TutorServiceSchema: TutorService = {
    label: '',
    price: '0.00',
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
    studentName: '',
    tutorName: '',
    service: TutorServiceSchema,
    topic: '',
    subjects: [],
    description: '',
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
