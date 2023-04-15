import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { DeletePartcipantModal, DeleteTestModal, DuplicateTestModal, ModalComponent, PopperState } from '../src/reusable/interfaces'

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
        component: 'close'
    },
    deleteTestModal: {
        component: 'close',
        testId: '',
        subject: ''
    },
    deletePartcipantModal: {
        component: 'delete-partcipnat',
        partcipantId: '',
        fullname: '',
    }
}

const mainSlice = createSlice({
    name: 'mainSlice',
    initialState,
    reducers: {
        setAppName: (state, { payload }: PayloadAction<string>) => {

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
        }
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