import { TutorService } from "../reusable/interfaces"
import { TutorServiceSchema } from "../reusable/schemas"

export type InquiryFeedbacType = 'terms' | 'purchase' | 'decline' | ''

export type ServiceTerms = {
    price: string
    dueDate: string
}

export interface InquiryFeedback {
    _id: string
    type: InquiryFeedbacType
    tutorId: string
    studentId: string
    service: TutorService
    serviceTerms: ServiceTerms
    description: string
    createdAt?: string
}

export const inquiryFeedbackModel: InquiryFeedback = {
    _id: '',
    type: '',
    tutorId: '',
    studentId: '',
    service: TutorServiceSchema,
    serviceTerms: {
        price: '',
        dueDate: ''
    },
    description: ''
}




