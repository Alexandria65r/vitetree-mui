import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppState } from "../../store/store";
import router from "next/router";
import { workspaceActions } from ".";
import { Workspace } from "../../src/models/workspace";
import WorkspaceAPI from "../../src/api-services/workspace";
import Randomstring from "randomstring";
import { mainActions } from "../main-reducer";
import { fetchBoardsThunk } from "../boards-reducer/boards-thunks";

export const createWorkspaceThunk = createAsyncThunk<void, undefined, { state: AppState }>
    ('cartSlice/createWorkspaceThunk', async (_, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const { AuthReducer: { user: { _id: owner } }, WorkspaceReducer: { workspace, workspaces } } = thunkAPI.getState()
        const id = Randomstring.generate(18)
        try {
            const newWorkspacePayload: Workspace = {
                _id: id,
                ...workspace,
                author: {
                    id: owner ?? ''
                }
            }
            dispatch(workspaceActions.setWorkspaceNetworkStatus('creating'))
            const newWorkspace = await WorkspaceAPI.create(newWorkspacePayload)
            if (newWorkspace) {
                dispatch(workspaceActions.setWorkspaces([...workspaces, newWorkspace]))
                dispatch(selectWorkspaceThunk(newWorkspace))
                dispatch(workspaceActions.setWorkspaceNetworkStatus('creating-success'))
                dispatch(workspaceActions.setIsFormOpen(false))
            }
        } catch (error) {
            dispatch(workspaceActions.setWorkspaceNetworkStatus('creating-error'))
        }
    })

export const selectWorkspaceThunk = createAsyncThunk<void, Workspace, { state: AppState }>
    ('cartSlice/selectWorkspaceThunk', async (workspace, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const state = thunkAPI.getState()
        dispatch(workspaceActions.setSelectedWorkspace(workspace))
        //  dispatch(fetchBoardsThunk(workspace?._id ?? ''))
        dispatch(mainActions.setIsSideBarOpen(false))
        localStorage.setItem('workspaceId', workspace?._id ?? '')
        router.replace(`/w/${workspace._id}`)
    })


export const fetchCurrentWorkspaceThunk = createAsyncThunk<void, string, { state: AppState }>
    ('cartSlice/fetchCurrentWorkspaceThunk', async (workspaceId, thunkAPI) => {
        const dispatch = thunkAPI.dispatch

        try {
            const workspaceData = await WorkspaceAPI.fetchWorkspace(workspaceId)
            if (workspaceData) {
                dispatch(selectWorkspaceThunk(workspaceData))
            }
        } catch (error) {
            dispatch(workspaceActions.setWorkspaceNetworkStatus('fetching-error'))
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
        const state = thunkAPI.getState()
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


//manage workspace people

export const AddWorkspacePersonThunk = createAsyncThunk<void, { workspaceId: string, email: string },
    { state: AppState }>
    ('cartSlice/AddWorkspacePersonThunk', async (params, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        try {
            dispatch(workspaceActions.setWorkspaceNetworkStatus('adding-person'))
            const workspaceData = await WorkspaceAPI.addWorkspacePerson(params.workspaceId, params.email)
            if (workspaceData) {
                dispatch(workspaceActions.setWorkspaceNetworkStatus('adding-person-success'))
            }
        } catch (error) {
            dispatch(workspaceActions.setWorkspaceNetworkStatus('adding-person-error'))
        }
    })
export const RemoveWorkspacePersonThunk = createAsyncThunk<void, { workspaceId: string, personId: string },
    { state: AppState }>
    ('cartSlice/AddWorkspacePersonThunk', async (params, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        try {
            dispatch(workspaceActions.setWorkspaceNetworkStatus('removing-person'))
            const workspaceData = await WorkspaceAPI.removeWorkspacePerson(params.workspaceId, params.personId)
            if (workspaceData) {
                dispatch(workspaceActions.setWorkspaceNetworkStatus('removing-person-success'))
            }
        } catch (error) {
            dispatch(workspaceActions.setWorkspaceNetworkStatus('removing-person-error'))
        }
    })


export const FetchWorkspacePeopleThunk = createAsyncThunk<void, { workspaceId: string, personId: string },
    { state: AppState }>
    ('cartSlice/FetchWorkspacePeopleThunk', async (params, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        try {
            dispatch(workspaceActions.setWorkspaceNetworkStatus('fetching-workspace-people'))
            const workspaceData = await WorkspaceAPI.removeWorkspacePerson(params.workspaceId, params.personId)
            if (workspaceData) {
                dispatch(workspaceActions.setWorkspaceNetworkStatus('fetching-workspace-people-success'))
            }
        } catch (error) {
            dispatch(workspaceActions.setWorkspaceNetworkStatus('fetching-workspace-people-error'))
        }
    })