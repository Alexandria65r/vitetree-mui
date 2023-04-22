import { PopperPlacementType } from "@mui/material"


//auth
export type TutorInfo = {
    id: string,
    name: string
    rating: number,
}

export type User = {
    _id?: string,
    firstName: string
    lastName: string,
    email: string,
    password: string
    imageAsset?: Asset,
    courses?: string[],
    accountType: 'Tutor' | 'Student' | '',
    tutorInfo?: TutorInfo
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
    owner: string,
    price: string
    imageAsset?: Asset
    createdAt?: string
}
export type Cart = {
    cartItems: CartItem[],
}





