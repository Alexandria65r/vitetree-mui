import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppState } from "../../store/store";
import { listGroupActions } from ".";
import { ListGroup, ListGroupSchema } from "../../src/models/list-group";
import ListGroupAPI from "../../src/api-services/list-group";
import Randomstring from "randomstring";
import randomColor from "randomcolor";
import { fetchBoardThunk } from "../boards-reducer/boards-thunks";
import { UpdateElementPayload } from "../elements-reducer";
import { createToastThunk } from "../main-reducer/main-thunks";
import { mainActions } from "../main-reducer";


export const createListGroupThunk = createAsyncThunk<void, undefined, { state: AppState }>
    ('listGroupSlice/createListGroupThunk', async (_, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const { AuthReducer: { user: { _id: owner } }, ListGroupReducer: { listGroup, listGroups, newListGroupName },
            BoardReducer: { selectedBoard }, WorkspaceReducer: { selectedWorkspace } } = thunkAPI.getState()
        const id = Randomstring.generate(18)
        const color = randomColor()

        try {

            if (!newListGroupName.trim().length) {
                dispatch(listGroupActions.setIsNewGroupInputOpen(false))
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
                dispatch(listGroupActions.setIsNewGroupInputOpen(false))

                const newListGroup = await ListGroupAPI.create(newListGroupPayload)
                if (newListGroup) {
                    dispatch(listGroupActions.setListGroupNetworkStatus('creating-success'))
                }
                dispatch(listGroupActions.setListGroupName(''))
            }
        } catch (error) {
            dispatch(listGroupActions.setListGroupNetworkStatus('creating-error'))
        }

    })


export const createManyListGroupsThunk = createAsyncThunk<void, string[], { state: AppState }>
    ('listGroupSlice/createManyListGroupsThunk', async (newGroups, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const { AuthReducer: { user: { _id: owner } }, ListGroupReducer: { listGroup, listGroups, newListGroupName },
            BoardReducer: { selectedBoard }, WorkspaceReducer: { selectedWorkspace } } = thunkAPI.getState()
        const newListGroups: ListGroup[] = []

        try {

            if (newGroups.length > 1) {
                for (let groupIndex = 0; groupIndex < newGroups.length; groupIndex++) {
                    const color = randomColor()
                    const _id = Randomstring.generate(18)
                    const newListGroupPayload: ListGroup = {
                        _id,
                        ...listGroup,
                        name: newGroups[groupIndex],
                        workspaceId: selectedWorkspace?._id ?? '',
                        boardId: selectedBoard?._id ?? '',
                        color,
                        author: {
                            id: owner ?? ''
                        }
                    }
                    newListGroups.push(newListGroupPayload)
                }
                dispatch(listGroupActions.setListGroupNetworkStatus('creating'))
                dispatch(listGroupActions.setListGroups([...newListGroups, ...listGroups]))
                dispatch(listGroupActions.setListGroupName(''))
                dispatch(listGroupActions.setIsNewGroupInputOpen(false))

                const { data } = await ListGroupAPI.createMany(newListGroups)
                if (data.success) {
                    dispatch(listGroupActions.setListGroupNetworkStatus('creating-success'))
                    dispatch(createToastThunk(data.message))
                }
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



export const deleteBulkListGroupsThunk = createAsyncThunk<void, undefined,
    { state: AppState }>
    ('listGroupSlice/deleteBulkListGroupsThunk', async (_, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const state = thunkAPI.getState()
        const checkedGroups = state.ListGroupReducer.checkedGroups
        const groups = state.ListGroupReducer.listGroups
        const clonedGroups = [...groups]

        console.log(checkedGroups)

        for (let idIndex = 0; idIndex < checkedGroups.length; idIndex++) {
            const itemToDelete = clonedGroups.find((group) => group._id === checkedGroups[idIndex])
            console.log(itemToDelete)
            if (itemToDelete) {
                const index = clonedGroups.indexOf(itemToDelete)
                clonedGroups.splice(index, 1)
            }
        }

        dispatch(listGroupActions.setListGroups(clonedGroups))
        dispatch(listGroupActions.clearCheckedGroups())
        dispatch(mainActions.closeModal())
        try {
            const { data } = await ListGroupAPI.deleteBulk(checkedGroups)
            if (data.success) {
                dispatch(createToastThunk(data.message))
            }
        } catch (error) {
            dispatch(listGroupActions.setListGroupNetworkStatus('deleting-error'))
        }
    })





export function getGroupById(state: AppState, id: string) {
    return state.ListGroupReducer.listGroups.find((el) => el._id === id) ?? ListGroupSchema
}