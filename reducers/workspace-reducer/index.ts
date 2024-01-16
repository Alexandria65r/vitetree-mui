import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Workspace, WorkspaceSchema } from '../../src/models/workspace';

export type WorkspaceNetworkStatus =
    'fetching' |
    'fetching-error' |
    'fetching-success' |
    'updating' |
    'updating-error' |
    'updating-success' |
    'deleting' |
    'deleting-error' |
    'deleting-success'|''



type WorkspaceState = {
    workspace: Workspace;
    workspaces:Workspace[];
    isFormOpen: boolean;
    workspaceNetworkStatus: WorkspaceNetworkStatus
}


const initialState: WorkspaceState = {
   workspace: WorkspaceSchema,
   workspaces: [],
    isFormOpen: false,
   workspaceNetworkStatus: ''
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
        setWorkspaces: (state, { payload }: PayloadAction<Workspace[]>) => {
            state.workspaces = payload
        },
        setWorkspaceNetworkStatus: (state, { payload }: PayloadAction<WorkspaceNetworkStatus>) => {
            state.workspaceNetworkStatus = payload
        }
    }
})

export const workspaceActions = workspaceSlice.actions
export default workspaceSlice.reducer