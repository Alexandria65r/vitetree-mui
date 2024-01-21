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
import { UpdateElementPayload } from "../elements-reducer";
import { createToastThunk } from "../main-reducer/main-thunks";
import { mainActions } from "../main-reducer";


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
                dispatch(listGroupActions.setListGroups([newListGroupPayload, ...listGroups]))

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





export const updateGroupThunk = createAsyncThunk<void, { groupId: string, update: UpdateElementPayload },
    { state: AppState }>
    ('elementsSlice/updateElementThunk', async (params, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const state = thunkAPI.getState()
        console.log(params)

        dispatch(listGroupActions.updateGroup({
            id: params.groupId,
            update: params.update
        }))
        dispatch(listGroupActions.clearGroupAction())
        dispatch(listGroupActions.setListGroupNetworkStatus('updating'))

        try {
            const { data } = await ListGroupAPI.update(
                params.groupId,
                {
                    update: { [params.update.key]: params.update.value }
                })

            if (data.success) {
                dispatch(createToastThunk(data.message))
                dispatch(listGroupActions.setListGroupNetworkStatus('updating-success'))
            }

        } catch (error) {
            dispatch(listGroupActions.setListGroupNetworkStatus('updating-error'))
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






export const deleteListGroupThunk = createAsyncThunk<any, string,
    { state: AppState }>
    ('listGrouplice/deleteListGroupThunk', async (id, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        dispatch(listGroupActions.deleteGroup(id))
        dispatch(mainActions.closeModal())
        try {
            const { data } = await ListGroupAPI.delete(id)
            if (data.success) {
                dispatch(createToastThunk(data.message))
            }
        } catch (error) {
            dispatch(createToastThunk('Opps,An error occured while deleting a group.'))
            dispatch(listGroupActions.setListGroupNetworkStatus(''))
        }
    })


export function getGroupById(state: AppState, id: string) {
    return state.ListGroupReducer.listGroups.find((el) => el._id === id) ?? ListGroupSchema
}