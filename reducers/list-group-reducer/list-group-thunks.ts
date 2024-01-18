import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppState } from "../../store/store";
import router from "next/router";
import { listGroupActions } from ".";
import { ListGroup, ListGroupSchema } from "../../src/models/list-group";
import ListGroupAPI from "../../src/api-services/list-group";
import Randomstring from "randomstring";
import randomColor from "randomcolor";
import { boardActions } from "../boards-reducer";
import { fetchBoardThunk } from "../boards-reducer/boards-thunks";


export const createListGroupThunk = createAsyncThunk<void, undefined, { state: AppState }>
    ('cartSlice/createListGroupThunk', async (_, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const { AuthReducer: { user: { _id: owner } }, ListGroupReducer: { listGroup, listGroups, newListGroupName },
            BoardReducer: { selectedBoard }, WorkspaceReducer: { selectedWorkspace } } = thunkAPI.getState()
        const id = Randomstring.generate(18)
        const color = randomColor()

        try {

            if (!newListGroupName.trim().length) {
                dispatch(listGroupActions.clearGroupAction())
                return
            } else {
                const newListGroupPayload: ListGroup = {
                    _id: id,
                    ...listGroup,
                    name: newListGroupName,
                    workspaceId: selectedWorkspace?._id ?? '',
                    boardId: selectedBoard?._id ?? '',
                    color,
                    author: {
                        id: owner ?? ''
                    }
                }
                dispatch(listGroupActions.setListGroupNetworkStatus('creating'))
                dispatch(listGroupActions.setListGroups([ newListGroupPayload,...listGroups]))

                const newListGroup = await ListGroupAPI.create(newListGroupPayload)
                if (newListGroup) {
                    dispatch(listGroupActions.setListGroupNetworkStatus('creating-success'))
                    dispatch(listGroupActions.setIsFormOpen(false))
                }
                dispatch(listGroupActions.setListGroupName(''))
            }
        } catch (error) {
            dispatch(listGroupActions.setListGroupNetworkStatus('creating-error'))
        }



    })


export const fetchListGroupThunk = createAsyncThunk<void, string, { state: AppState }>
    ('cartSlice/fetchListGroupThunk', async (listGroupId, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const { AuthReducer: { user: { _id: owner } }, ListGroupReducer: { listGroup } } = thunkAPI.getState()
        try {
            const listGroupData = await ListGroupAPI.fetchListGroup(listGroupId)
            if (listGroupData) {
                dispatch(listGroupActions.setListGroupData(listGroupData))
            }
        } catch (error) {
            dispatch(listGroupActions.setListGroupNetworkStatus('fetching-error'))
        }
    })
export const fetchListGroupsThunk = createAsyncThunk<void, undefined, { state: AppState }>
    ('cartSlice/fetchListGroupsThunk', async (listGroupId, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const state = thunkAPI.getState()
        const selectedBoard = state.BoardReducer.selectedBoard
        try {
            const listGroups = await ListGroupAPI.fetchListGroups(selectedBoard._id ?? '')
            if (listGroups) {
                dispatch(listGroupActions.setListGroups(listGroups))
            }
        } catch (error) {
            dispatch(listGroupActions.setListGroupNetworkStatus('fetching-error'))
        }
    })
export const fetchBoardAndListGroupsThunk = createAsyncThunk<void, { boardId: string }, { state: AppState }>
    ('cartSlice/fetchListGroupsThunk', async (params, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const state = thunkAPI.getState()
        try {
            const res = await dispatch(fetchBoardThunk(params.boardId))
            console.log(res.payload)
            if (res.payload) {
                await dispatch(fetchListGroupsThunk())
            }

        } catch (error) {
            dispatch(listGroupActions.setListGroupNetworkStatus('fetching-error'))
        }
    })





type UpdateListGroupTargets = 'profile-image' | 'balance' | 'other'
export const updateListGroupThunk = createAsyncThunk<any, {
    listGroupId: string, target: UpdateListGroupTargets, update: any
},
    { state: AppState }>
    ('listGrouplice/updateListGroupThunk', async (params, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const { AuthReducer: { user: { _id: owner } }, ListGroupReducer: { listGroup } } = thunkAPI.getState()
        try {
            const { data } = await ListGroupAPI.update(params.listGroupId, params)
            if (data.success) {
                return { ...data }
            }
        } catch (error) {
            dispatch(listGroupActions.setListGroupNetworkStatus(''))
        }
    })


export function getGroupById(state: AppState, id: string) {
    return state.ListGroupReducer.listGroups.find((el) => el._id === id) ?? ListGroupSchema
}