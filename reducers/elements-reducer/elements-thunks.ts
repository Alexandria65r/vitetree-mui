import { createAsyncThunk } from "@reduxjs/toolkit";
import { UpdateElementPayload, elementsActions } from ".";
import { Element, ElementSchema, ElementType } from "../../src/models/element";
import { AppState } from "../../store/store";
import Randomstring from 'randomstring'
import { mainActions } from "../main-reducer";
import ListGroupElementAPI from "../../src/api-services/list-group-element";
import { listGroupActions } from "../list-group-reducer";
import { createToastThunk } from "../main-reducer/main-thunks";

export const AddNewElementThunk = createAsyncThunk<void,
    { elementType: ElementType, newElementName: string, groupId?: string },
    { state: AppState }>
    ('elementsSlice/AddNewElementThunk', async (params, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const state = thunkAPI.getState()
        const elements = state.ElementsReducer.elements
        // const newElementName = state.ElementsReducer.newElementName
        const selectedBoard = state.BoardReducer.selectedBoard
        const clonedElements = [...elements]
        const newId = Randomstring.generate(12)
        if (!params.newElementName.trim().length) {
            dispatch(listGroupActions.clearGroupAction())

            return
        } else {
            try {
                const newElementPayload: Element = {
                    _id: newId,
                    name: params.newElementName,
                    elementType: params.elementType,
                    groupId: params?.groupId ?? '',
                    loading: true,
                    workspaceId: selectedBoard.workspaceId,
                    boardId: selectedBoard?._id ?? ''
                }


                dispatch(elementsActions.setElements([...elements, { ...newElementPayload }]))
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


export const createManyElementsThunk = createAsyncThunk<void,
    { elementType: ElementType, elements: string[], groupId?: string },
    { state: AppState }>
    ('elementsSlice/createManyElementsThunk', async (params, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const state = thunkAPI.getState()
        const elements = state.ElementsReducer.elements
        const selectedBoard = state.BoardReducer.selectedBoard
        let newElements: Element[] = []

        if (params.elements.length > 1) {
            try {
                for (let elementIndex = 0; elementIndex < params.elements.length; elementIndex++) {
                    const name = params.elements[elementIndex]
                    const newId = Randomstring.generate(16)
                    const newElementPayload: Element = {
                        _id: newId,
                        name: name,
                        elementType: params.elementType,
                        groupId: params?.groupId ?? '',
                        loading: true,
                        workspaceId: selectedBoard.workspaceId,
                        boardId: selectedBoard?._id ?? ''
                    }

                    newElements.push(newElementPayload)
                }

                dispatch(elementsActions.setElements([...elements, ...newElements]))
                console.log(newElements)
                dispatch(listGroupActions.clearGroupAction())
                dispatch(elementsActions.setNewElementName(''))
                const clonedElements = [...elements, ...newElements]

                const { data } = await ListGroupElementAPI.createMany(newElements)
                if (data.success) {
                    const filterredLoading = clonedElements.filter((element) => element.groupId === params.groupId && element.loading === true)
                    if (filterredLoading) {
                        filterredLoading.forEach((el) => {
                            const targetElement = clonedElements.find((element) => element._id === el._id)
                            if (targetElement) {
                                clonedElements.splice(clonedElements.indexOf(targetElement), 1, { ...targetElement, loading: false })
                            }
                        })
                    }
                    dispatch(elementsActions.setElements(clonedElements))
                    newElements = []
                } else {
                    dispatch(createToastThunk(data.message))
                }
            } catch (error) {
                console.log(error)
                dispatch(createToastThunk('An error occured!'))
            }
        }


    })



export const updateElementThunk = createAsyncThunk<void, { elementId: string, update: UpdateElementPayload },
    { state: AppState }>
    ('elementsSlice/updateElementThunk', async (params, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
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
export const updateBulkElementsThunk = createAsyncThunk<void, UpdateElementPayload,
    { state: AppState }>
    ('elementsSlice/updateElementThunk', async (update, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const state = thunkAPI.getState()
        const checkedItems = state.ElementsReducer.checkedItems
        checkedItems.forEach((checkedId) => {
            dispatch(elementsActions.updateElement({
                id: checkedId,
                update
            }))
        })

        dispatch(elementsActions.clearCheckedItems())


        try {
            const { data } = await ListGroupElementAPI.updateBulk({
                ids: checkedItems,
                update: { [update.key]: update.value }
            }
            )

            if (data.success) {
                dispatch(createToastThunk('All Items updated successfully.'))
                dispatch(elementsActions.setElemetNetworkStatus('updating-success'))
            }

        } catch (error) {
            dispatch(elementsActions.setElemetNetworkStatus('updating-error'))
        }
    })
export const deleteBulkElementsThunk = createAsyncThunk<void, undefined,
    { state: AppState }>
    ('elementsSlice/updateElementThunk', async (_, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const state = thunkAPI.getState()
        const checkedItems = state.ElementsReducer.checkedItems
        const elements = state.ElementsReducer.elements
        const clonedElements = [...elements]

        console.log(checkedItems)

        for (let idIndex = 0; idIndex < checkedItems.length; idIndex++) {
            const itemToDelete = clonedElements.find((element) => element._id === checkedItems[idIndex])
            console.log(itemToDelete)
            if (itemToDelete) {
                const index = clonedElements.indexOf(itemToDelete)
                clonedElements.splice(index, 1)
            }
        }

        dispatch(elementsActions.setElements(clonedElements))
        dispatch(elementsActions.clearCheckedItems())
        dispatch(mainActions.closeModal())
        try {
            const { data } = await ListGroupElementAPI.deleteBulk(checkedItems)
            if (data.success) {
                dispatch(createToastThunk(data.message))
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