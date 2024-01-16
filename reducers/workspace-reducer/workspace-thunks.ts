import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppState } from "../../store/store";
import router from "next/router";
import { workspaceActions } from ".";
import { Workspace } from "../../src/models/workspace";
import WorkspaceAPI from "../../src/api-services/workspace";

export const createWorkspaceThunk = createAsyncThunk<void, undefined, { state: AppState }>
    ('cartSlice/createWorkspaceThunk', async (_, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const { AuthReducer: { user: { _id: owner } }, WorkspaceReducer: { workspace } } = thunkAPI.getState()
        const workspaceId = workspace.name.replace(' ', '').toLowerCase()

        try {
            const newWorkspacePayload: Workspace = {
                ...workspace,
                author: {
                    id: owner ?? ''
                }
            }
            const newWorkspace = await WorkspaceAPI.create(newWorkspacePayload)
            if (newWorkspace) {
                //router.replace(`/workspace/${newWorkspace.workspaceId}`)
                dispatch(workspaceActions.setIsFormOpen(false))
            }
        } catch (error) {
           
        }
    })


export const fetchWorkspaceThunk = createAsyncThunk<void, string, { state: AppState }>
    ('cartSlice/fetchWorkspaceThunk', async (workspaceId, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const { AuthReducer: { user: { _id: owner } }, WorkspaceReducer: { workspace } } = thunkAPI.getState()
        try {
            const workspaceData = await WorkspaceAPI.fetchWorkspace(workspaceId)
            if (workspaceData) {
                dispatch(workspaceActions.setWorkspaceData(workspaceData))
            }
        } catch (error) {
            dispatch(workspaceActions.setWorkspaceNetworkStatus('fetching-error'))
        }
    })
export const fetchWorkspacesThunk = createAsyncThunk<void, undefined, { state: AppState }>
    ('cartSlice/fetchWorkspacesThunk', async (workspaceId, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        try {
            const workspace = await WorkspaceAPI.fetchWorkspaces()
            if (workspace) {
                dispatch(workspaceActions.setWorkspaces(workspace))
            }
        } catch (error) {
            dispatch(workspaceActions.setWorkspaceNetworkStatus('fetching-error'))
        }
    })


type UpdateWorkspaceTargets = 'profile-image' | 'balance' | 'other'
export const updateWorkspaceThunk = createAsyncThunk<any, {
    workspaceId: string, target: UpdateWorkspaceTargets, update: any
},
    { state: AppState }>
    ('workspacelice/updateWorkspaceThunk', async (params, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const { AuthReducer: { user: { _id: owner } }, WorkspaceReducer: { workspace } } = thunkAPI.getState()
        try {
            const { data } = await WorkspaceAPI.update(params.workspaceId, params)
            if (data.success) {
                return { ...data }
            }
        } catch (error) {
            dispatch(workspaceActions.setWorkspaceNetworkStatus(''))
        }
    })