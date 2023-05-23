import { PopperPlacementType } from "@mui/material"


//auth

export type Toast = {
    id: string
    message: string

}
export type TutorService = {
    price: string
    label: string
    description?: string
}

export type Inquired = {
    tutorId: string
    inquiryId: string
    status: 'active' | 'done'
}

export type TutorInfo = {
    inquiryId?: string
    tutorId: string,
    accountId: string
    services: TutorService[]
    name: string
    collage: string
    status: 'available' | 'unavailable' | ''
    qualifications: string
    yearsOfExperience: number
    subjects: string[]
    description: string
    startYear: string
    endYear: string
    rating?: number
    feedBack?: string
    updatedAt?: string
    createdAt?: string
}

export type StudentInfo = {
    studentId: string
    accountBalance: string
    school: string
    // subjects: string[]
    startYear: string
    endYear: string
    description: string
}
export type Role = 'tutor' | 'student' | ''

export type Hired = {
    tutorId: string
    createdAt?: string
}

export type UserAvatarAsset = {
    publicId: string;
    secureURL: string;
    initials: string
}

export type User = {
    _id?: string,
    firstName: string
    lastName: string,
    email: string,
    password: string
    imageAsset?: Asset,
    courses?: string[],
    role: Role,
    gender: 'female' | 'male' | '',
    tutorInfo?: TutorInfo
    studentInfo?: StudentInfo
    inquiredList?: Inquired[]
    createdAt?: string
}


export type Signin = {
    provider: 'google-provider' | 'schooyard-provider'
    email: string,
    password?: string
    photoURL?: string
}

export type MessageThread = {
    _id: string,
    text: string,
    owner: boolean
    name: string
    type: 'text' | 'reply' | 'image' | 'audio'
}

export type PopperState = {
    component: string,
    popperId: string
    placement?: any
}


//new test
export type Test = {
    _id: string
    cartegory: 'School' | 'Coding' | 'Survey' | '';
    sectionType: 'None sectioned' | 'With sections' | ''
    subjectOrlanguage: string,
    sections: Section[]
    duration?: string
    description: string
    authorId: string
    status: 'published' | 'dirty' | ''
}

//test preparation
export type Section = {
    name: string;
    questions: Question[];
    wayOfAnswering: '' | 'multiple choice' | 'word answer'
    numberOfQuestions: number;
}

export type Choice = {
    choice: ChoiceTarget,
    ans: string,
    isCorrect: boolean
}
export type ChoiceTarget = 'a' | 'b' | 'c' | 'd'

export type Diagram = {
    description?: string
    assets: {
        imageURL: string
        publidId: string
    },
}

export type Question = {
    diagram?: Diagram,
    withDiagram?: boolean,
    question: string;
    answer: string,
    section: string,
    isCorrect?: boolean,
    choices?: {
        a: Choice;
        b: Choice;
        c: Choice;
        d: Choice;
    }
}

// take test

export type Participant = {
    _id?: string
    fullname: string
    email: string
    reason: 'school test' | 'survey' | ''
    testId: string
    test?: Test
    score: string
    taken: boolean
    createdAt?: string
}

export type ModalComponent = 'duplicate-test' | 'delete-test' | ''

export type DuplicateTestModal = {
    component: 'duplicate-test' | 'close',
    testData: Test
}
export type DeleteTestModal = {
    component: 'delete-test' | 'close',
    testId: string,
    subject: string
}
export type DeletePartcipantModal = {
    component: 'delete-partcipnat' | 'close',
    partcipantId: string,
    fullname: string
}



export type Asset = {
    publicId: string,
    secureURL: string
}


export type VideoCourse = {
    type: 'introduction' | 'course' | ''
    _id: string
    title: string
    description: string
    courseId?: string
    authorId: string
    price: '',
    vidAsset: Asset,
    imageAsset: Asset,
}


export type CartItem = {
    _id: string,
    title: string,
    owner: string,
    price: string
    imageAsset?: Asset
    link?: string
    productInfo: {
        id: string
        authorId: string,
        name: string
    }
    createdAt?: string
}
export type Cart = {
    cartItems: CartItem[],
}



export type PaymentMethod = {
    _id: string
    cardNumber: string
    expires: string
    cvc: string
    preffered: boolean
    createdAt?: string
}


export type Order = {
    _id: string
    name: string
    courseId: string
    price: string
    authorId: string[]
    customerId: string
    assets: Asset[]
    link: string[]
    createdAt: string
}


//post the topic you want to learn

export type PostType = 'academic question' | 'hire tutor' | 'all' | ''
export type Post = {
    _id: string
    authorId: string
    type: PostType
    budget?: string
    title: string
    delivery: ' Course Video' | 'real time video' | 'Answer' | ''
    request: 'Assignment' | 'teach me' | 'stuck' | ''
    subjects?: string[],
    imageAssets?: Asset[]
    videoAssets?: Asset
    description: string
    createdAt?: string
}



export type StudentInquiry = {
    _id: string,
    authorId: string,
    studentName: string,
    tutorName: string,
    tutorId: string
    service: TutorService
    subjects: string[]
    topic?: string
    description: string
    dueDate?: string
    createdAt?: string
}

