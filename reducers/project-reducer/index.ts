import { createSlice, PayloadAction } from '@reduxjs/toolkit'


import { Element, Project, SubFeature } from '../../src/reusable/interfaces'
import { ProjectSchema, SubFeatureSchema } from '../../src/reusable/schemas'

type InitialState = {
    project: Project,
    projectList: Project[],
    isAddingFeature: boolean,
    newElementName: string,
    elementTreeDetail: Element[],
    newSubFeature: SubFeature,
    newNote: string,
    edittingName: string,
    isProjectMenuOpen: boolean
    pickerType: string
    newIvitation: {
        username: string,
        email: string
    },
    searchQuery: string
}


const initialState: InitialState = {
    project: ProjectSchema,
    elementTreeDetail: [],
    projectList: [],
    isAddingFeature: false,
    newElementName: '',
    newSubFeature: SubFeatureSchema,
    newNote: '',
    edittingName: '',
    isProjectMenuOpen: false,
    pickerType: "priority",
    newIvitation: {
        username: "",
        email: ""
    },
    searchQuery: ''
}

const projectSlice = createSlice({
    initialState,
    name: 'projectslice',
    reducers: {

        setProjectValues(state, { payload }: PayloadAction<{ name: string, value: string }>) {
            state.project = { ...state.project, [payload.name]: payload.value }
        },

        toggleIsAddingNewFeature(state) {
            state.isAddingFeature = !state.isAddingFeature
        },
        setProject(state, { payload }: PayloadAction<Project>) {
            state.project = payload
        },
        setElementDetail(state, { payload }: PayloadAction<Element[]>) {
            state.elementTreeDetail = payload
        },

        setProjectList(state, { payload }: PayloadAction<Project[]>) {
            state.projectList = payload
        },
        setProjectElements(state, { payload }: PayloadAction<Element[]>) {
            state.project.elements = payload

        },
        updateNewElementName(state, { payload }: PayloadAction<string>) {
            state.newElementName = payload
        },
        setSearchQuery(state, { payload }: PayloadAction<string>) {
            state.searchQuery = payload
        },

        addFeature(state, { payload }: PayloadAction<Element>) {
            state.project.elements = [...state.project.elements, payload]
        },

        updateNewSubFeatureName(state, { payload }: PayloadAction<string>) {
            state.newSubFeature.name = payload
        },
        addSubFeature(state, { payload }: PayloadAction<Element>) {
            state.project.elements = [...state.project.elements, payload]
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
        setNewIvitationData(state, { payload }: PayloadAction<{ name: string, value: string }>) {
            state.newIvitation = { ...state.newIvitation, [payload.name]: payload.value }
        },

    }
})

export const projectActions = projectSlice.actions;
export default projectSlice.reducer