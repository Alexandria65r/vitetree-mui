import { Section, Test, User } from "./interfaces";


export const UserSchema: User = {
    
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    imageAsset: {
        public_id: '',
        imageURL: ''
    }
}

export const testDataSchema: Test = {
    _id: '',
    cartegory: '',
    sectionType: '',
    subjectOrlanguage: '',
    sections: [],
    description: '',
    authorId: ""
}


export const sectionSchems: Section = {
    name: "",
    questions: [],
    wayOfAnswering: '',
    numberOfQuestions: 0
}