import { createAsyncThunk } from "@reduxjs/toolkit";
import { elementsActions } from ".";
import { Element, ElementSchema, ElementType } from "../../src/models/element";
import { AppState } from "../../store/store";
import Randomstring from 'randomstring'
import randomColor from 'randomcolor'
import { mainActions } from "../main-reducer";
import { PickerBtn } from "../../src/reusable/interfaces";
import ListGroupElementAPI from "../../src/api-services/list-group-element";
import { listGroupActions } from "../list-group-reducer";
import { createToastThunk } from "../main-reducer/main-thunks";

export const AddNewElementThunk = createAsyncThunk<void,
    { elementType: ElementType, groupId?: string },
    { state: AppState }>
    ('elementsSlice/AddNewElementThunk', async (params, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const state = thunkAPI.getState()
        const elements = state.ElementsReducer.elements
        const newElementName = state.ElementsReducer.newElementName
        const selectedBoard = state.BoardReducer.selectedBoard
        const clonedElements = [...elements]
        const newId = Randomstring.generate(12)
        const color = randomColor()
        if (!newElementName.trim().length) {
            dispatch(listGroupActions.clearGroupAction())

            return
        } else {
            try {
                const newElementPayload: Element = {
                    _id: newId,
                    name: newElementName,
                    elementType: params.elementType,
                    groupId: params?.groupId ?? '',
                    loading: true,
                    workspaceId: selectedBoard.workspaceId,
                    boardId: selectedBoard?._id ?? ''
                }

                console.log(newElementPayload)

                dispatch(elementsActions.setElements([...elements, { ...newElementPayload, loading: false }]))
                dispatch(elementsActions.setNewElementName(''))

                const newElement = await ListGroupElementAPI.create(newElementPayload)
                if (newElement) {
                    const filterred = clonedElements.filter((item) => item._id !== newElement._id)
                    dispatch(elementsActions.setElements([...filterred, { ...newElement, loading: false }]))
                }
            } catch (error) {
                console.log(error)
            }
        }



    })



export const updateElementThunk = createAsyncThunk<void, { elementId: string, update: { key: string, value: any } },
    { state: AppState }>
    ('elementsSlice/updateElementThunk', async (params, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const state = thunkAPI.getState()
        console.log(params)

        dispatch(elementsActions.updateElement({
            id: params.elementId,
            update: params.update
        }))

        dispatch(elementsActions.setElemetNetworkStatus('updating'))
        try {
            const { data } = await ListGroupElementAPI.update(
                params.elementId,
                {
                    update: { [params.update.key]: params.update.value }
                })

            if (data.success) {
                dispatch(elementsActions.setElemetNetworkStatus('updating-success'))
            }

        } catch (error) {
            dispatch(elementsActions.setElemetNetworkStatus('updating-error'))
        }
    })


export const DeleteElementThunk = createAsyncThunk<void, undefined, { state: AppState }>
    ('elementsSlice/DeleteElementThunk', async (_, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const state = thunkAPI.getState()
        const elements = state.ElementsReducer.elements
        const modal = state.MainReducer.modal
        dispatch(elementsActions.setElemetNetworkStatus('deleting-element'))
        const newElementsList = elements.filter((item) => item._id !== modal.itemId)
        dispatch(elementsActions.setElements(newElementsList))
        dispatch(elementsActions.setElemetNetworkStatus(''))
        try {
            const { data } = await ListGroupElementAPI.delete(modal.itemId ?? '')
            if (data.success) {
                dispatch(elementsActions.setElemetNetworkStatus('deleting-element-success'))
                dispatch(createToastThunk(data.message))
                //close modal
                dispatch(mainActions.closeModal())
                dispatch(elementsActions.setSelectedElementId(''))
            }

        } catch (error) {
            dispatch(elementsActions.setElemetNetworkStatus('deleting-element-error'))
            dispatch(createToastThunk('An error occured, while trying to delete the item.'))
        }
    })

export function getElementById(state: AppState, id: string) {
    return state.ElementsReducer.elements.find((el) => el._id === id) ?? ElementSchema
}