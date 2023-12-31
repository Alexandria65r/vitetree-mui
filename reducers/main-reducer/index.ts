import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { Toast } from '../../src/reusable/interfaces';




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
    showSelectedImage: boolean
    isMultipleChoiceEnabled: boolean;
    isOneWordAnswerEnabled: boolean;
    isDiagramQuestion: boolean;
    isSidebarOpen: boolean
    toasts: Toast[]
    cardMenu: CardMenu
    modal: Modal

}
const initialState: State = {
    showSelectedImage: false,
    isMultipleChoiceEnabled: false,
    isOneWordAnswerEnabled: false,
    isDiagramQuestion: false,
    isSidebarOpen: false,

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
        setCardMenu: (state, { payload }: PayloadAction<CardMenu>) => {
            state.cardMenu = payload
        },
        closeCardMenu: (state) => {
            state.cardMenu = {
                component:'',
                title:'',
                postId:''
            }
        },
        setModal: (state, { payload }: PayloadAction<Modal>) => {
            state.modal = payload
        },
        closeModal: (state) => {
            state.modal = {
                component:'',
                postId:''
            }
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