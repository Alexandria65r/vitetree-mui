import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Element, ElementSchema, SubFeature, SubFeatureSchema } from '../../src/models/element'
import { CustomElement } from '../../src/components/element-tree/elements-factory'

export type UpdateElementPayload = {
    key: string, value: any
}

export type ElementAction = {
    elementId?: string
    action: 'sub-element' | 'edit-element' | 'edit-sub-element' |
    'add-sub-element' | 'element-detail' | 'show-element-update-edittor' |
    'show-element-delete-button'
     | 'mark-children' | ''
}

export type ElementNetworkStatus = 'updating' |
    'updating-success' | 'updating-error' | 'deleting-element' |
    'deleting-element-success' | 'deleting-element-error' | ''

type InitialState = {
    elements: Element[]
    customElements: CustomElement[]
    element: Element
    selectedElementId: string
    isAddingFeature: boolean,
    newElementName: string,
    elementTreeDetail: Element[],
    newSubFeature: SubFeature,
    newNote: string,
    edittingName: string,
    isProjectMenuOpen: boolean
    pickerType: string
    searchQuery: string
    elementAction: ElementAction
    collapedItems: string[],
    checkedItems: string[],
    elementNetworkStatus: ElementNetworkStatus
}


const initialState: InitialState = {
    elements: [],
    element: ElementSchema,
    elementTreeDetail: [],
    isAddingFeature: false,
    newElementName: '',
    newSubFeature: SubFeatureSchema,
    newNote: '',
    edittingName: '',
    isProjectMenuOpen: false,
    pickerType: "priority",
    searchQuery: '',
    elementAction: {
        elementId: '',
        action: ''
    },
    collapedItems: [],
    elementNetworkStatus: '',
    selectedElementId: '',
    checkedItems: [],
    customElements: []
}

const elementsSlice = createSlice({
    initialState,
    name: 'elementsSlice',
    reducers: {
        toggleIsAddingNewFeature(state) {
            state.isAddingFeature = !state.isAddingFeature
        },

        setElemetNetworkStatus(state, { payload }: PayloadAction<ElementNetworkStatus>) {
            state.elementNetworkStatus = payload
        },
        setElementDetail(state, { payload }: PayloadAction<Element[]>) {
            state.elementTreeDetail = payload
        },
        setSelectedElementId(state, { payload }: PayloadAction<string>) {
            state.selectedElementId = payload
        },
        setElements(state, { payload }: PayloadAction<Element[]>) {
            state.elements = payload
        },
        setElement(state, { payload }: PayloadAction<Element>) {
            state.element = payload
        },
        setcustomElements(state, { payload }: PayloadAction<CustomElement[]>) {
            state.customElements = payload
        },
        updateElement(state, { payload }: PayloadAction<{ id: string, update: UpdateElementPayload }>) {
            const element = state.elements.find((el) => el._id === payload.id)
            if (element) {
                const index = state.elements.indexOf(element)
                state.elements.splice(index, 1, { ...element, [payload.update.key]: payload.update.value })
            }
        },
        setNewElementName(state, { payload }: PayloadAction<string>) {
            state.newElementName = payload
        },
        setSearchQuery(state, { payload }: PayloadAction<string>) {
            state.searchQuery = payload
        },

        addFeature(state, { payload }: PayloadAction<Element>) {
            state.elements = [...state.elements, payload]
        },
        setElementAction(state, { payload }: PayloadAction<ElementAction>) {
            if (state.elementAction.action === payload.action) {
                state.elementAction = { action: '', elementId: '' }
            } else {
                state.elementAction = payload
            }
        },
        clearElementAction(state) {
            state.elementAction = { action: '', elementId: '' }
        },
        updateNewSubFeatureName(state, { payload }: PayloadAction<string>) {
            state.newSubFeature.name = payload
        },
        addSubFeature(state, { payload }: PayloadAction<Element>) {
            state.elements = [...state.elements, payload]
        },
        setNewNote(state, { payload }: PayloadAction<string>) {
            state.newNote = payload
        },
        updateProjectName(state, { payload }: PayloadAction<string>) {
            state.edittingName = payload
        },
        toggleProjectMenu(state, { payload }: PayloadAction<boolean>) {
            state.isProjectMenuOpen = payload
        },
        setPickerType(state, { payload }: PayloadAction<string>) {
            state.pickerType = payload
        },
        collapseItem(state, { payload }: PayloadAction<string>) {
            const isExist = state.collapedItems.find((id) => id === payload)
            if (isExist) {
                state.collapedItems.splice(state.collapedItems.indexOf(isExist), 1)
            } else {
                state.collapedItems.push(payload)
            }
        },
        checkItem(state, { payload }: PayloadAction<string>) {
            const isExist = state.checkedItems.find((id) => id === payload)
            if (isExist) {
                state.checkedItems.splice(state.checkedItems.indexOf(isExist), 1)
            } else {
                state.checkedItems.push(payload)
            }
        },
        clearCheckedItems(state) {
            state.checkedItems = []
        },


    }
})

export const elementsActions = elementsSlice.actions;
export default elementsSlice.reducer