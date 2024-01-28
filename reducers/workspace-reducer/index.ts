import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Person, Workspace, WorkspaceSchema } from '../../src/models/workspace';

export type WorkspaceNetworkStatus =
    'creating' |
    'creating-error' |
    'creating-success' |
    'fetching' |
    'fetching-error' |
    'fetching-success' |
    'updating' |
    'updating-error' |
    'updating-success' |
    'deleting' |
    'deleting-error' |
    'deleting-success'|
    'adding-person' |
    'adding-person-error' |
    'adding-person-success'|
    'removing-person' |
    'removing-person-error' |
    'removing-person-success'|
    'fetching-workspace-people' |
    'fetching-workspace-people-error' |
    'fetching-workspace-people-success'|''



type WorkspaceState = {
    selectedWorkspace: Workspace;
    workspace: Workspace;
    workspaces:Workspace[];
    people:Person[];
    isFormOpen: boolean;
    isInvitePeopleModalOpen: boolean;
    workspaceNetworkStatus: WorkspaceNetworkStatus
}


const initialState: WorkspaceState = {
    selectedWorkspace: WorkspaceSchema,
    workspace: WorkspaceSchema,
    workspaces: [],
    isFormOpen: false,
    workspaceNetworkStatus: '',
    isInvitePeopleModalOpen: false,
    people: []
}




const workspaceSlice = createSlice({
    name: 'workspaceSlice',
    initialState,
    reducers: {
        setIsFormOpen: (state, { payload }: PayloadAction<boolean>) => {
            state.isFormOpen = payload
        },
        setWorkspaceData: (state, { payload }: PayloadAction<Workspace>) => {
            state.workspace = payload
        },
        setSelectedWorkspace: (state, { payload }: PayloadAction<Workspace>) => {
            state.selectedWorkspace = payload
        },
        setWorkspaces: (state, { payload }: PayloadAction<Workspace[]>) => {
            state.workspaces = payload
        },
        setWorkspacePeople: (state, { payload }: PayloadAction<Person[]>) => {
            state.people = payload
        },
        toggleInvitePeopleModal: (state, { payload }: PayloadAction<boolean>) => {
            state.isInvitePeopleModalOpen = payload
        },
        setWorkspaceNetworkStatus: (state, { payload }: PayloadAction<WorkspaceNetworkStatus>) => {
            state.workspaceNetworkStatus = payload
        }
    }
})

export const workspaceActions = workspaceSlice.actions
export default workspaceSlice.reducer