import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { DeletePartcipantModal, DeleteTestModal, DuplicateTestModal, ModalComponent, PopperState, Toast } from '../../src/reusable/interfaces'
import { testDataSchema } from '../../src/reusable/schemas'


type CardMenu = {
    component: 'account-menu' | 'page-more-options-menu' | 'read-only-more-options-menu' | 'send-tip-picker' | '',
    title: string;
    showClose?:boolean;
    postId?:string
}
type Modal = {
    component: 'page-more-options-menu' | 'read-only-more-options-menu' |'complete-send-tip-action' |'',
    options?: any;
    postId?: string;
}


interface State {
    popperState: PopperState
    showSelectedImage: boolean
    isMultipleChoiceEnabled: boolean;
    isOneWordAnswerEnabled: boolean;
    isDiagramQuestion: boolean;
    isSidebarOpen: boolean
    duplicateTestModal: DuplicateTestModal
    deleteTestModal: DeleteTestModal
    deletePartcipantModal: DeletePartcipantModal
    toasts: Toast[]
    cardMenu: CardMenu
    modal: Modal

}
const initialState: State = {
    popperState: {
        component: '',
        popperId: '',
        placement: ''
    },
    showSelectedImage: false,
    isMultipleChoiceEnabled: false,
    isOneWordAnswerEnabled: false,
    isDiagramQuestion: false,
    isSidebarOpen: false,
    duplicateTestModal: {
        component: 'close',
        testData: testDataSchema
    },
    deleteTestModal: {
        component: 'close',
        testId: '',
        subject: ''
    },
    deletePartcipantModal: {
        component: 'close',
        partcipantId: '',
        fullname: '',
    },
    toasts: [],
    cardMenu: {
        component: '',
        title: '',
        showClose: true
    },
    modal: {
        component: ''
    }
}

const mainSlice = createSlice({
    name: 'mainSlice',
    initialState,
    reducers: {
        setToasts: (state, { payload }: PayloadAction<Toast>) => {
            state.toasts = [...state.toasts, payload]
        },
        closeToast: (state, { payload }: PayloadAction<string>) => {
            state.toasts = state.toasts.filter((toast) => toast.id !== payload)
        },
        setPopperState: (state, { payload }: PayloadAction<PopperState>) => {
            state.popperState = payload
        },
        setShowSelectedImage: (state, { payload }: PayloadAction<boolean>) => {
            state.showSelectedImage = payload
        },
        setIsOneWordAnswer: (state, { payload }: PayloadAction<boolean>) => {
            state.isOneWordAnswerEnabled = payload
        },
        setIsMultipleQuestion: (state, { payload }: PayloadAction<boolean>) => {
            state.isMultipleChoiceEnabled = payload
        },
        setIsDiagramQuestion: (state, { payload }: PayloadAction<boolean>) => {
            state.isDiagramQuestion = payload
        },
        setIsSideBarOpen: (state, { payload }: PayloadAction<boolean>) => {
            state.isSidebarOpen = payload
        },
        setDuplicateTestModal: (state, { payload }: PayloadAction<DuplicateTestModal>) => {
            state.duplicateTestModal = payload
        },
        setDeleteTestModal: (state, { payload }: PayloadAction<DeleteTestModal>) => {
            state.deleteTestModal = payload
        },
        setDeletePartcipantModal: (state, { payload }: PayloadAction<DeletePartcipantModal>) => {
            state.deletePartcipantModal = payload
        },
        setCardMenu: (state, { payload }: PayloadAction<CardMenu>) => {
            state.cardMenu = payload
        },
        setModal: (state, { payload }: PayloadAction<Modal>) => {
            state.modal = payload
        },

    },

    extraReducers: {
        [HYDRATE]: (state, { payload }: any) => {
            return {
                ...state,
                ...payload.MainReducer
            }
        }
    }
})


export const mainActions = mainSlice.actions
export default mainSlice.reducer