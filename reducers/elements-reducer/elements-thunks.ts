import { createAsyncThunk } from "@reduxjs/toolkit";
import { elementsActions } from ".";
import { Element } from "../../src/models/element";
import { AppState } from "../../store/store";
import Randomstring from 'randomstring'
import randomColor from 'randomcolor'

export const AddNewElementThunk = createAsyncThunk<void,
    { elementType: 'parent' | 'child', cartegory: 'task' | 'feature' | '', parentElementId?: string },
    { state: AppState }>
    ('elementsSlice/AddNewElementThunk', async (params, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const state = thunkAPI.getState()
        const elements = state.ElementsReducer.elements
        const newElementName = state.ElementsReducer.newElementName
        const clonedElements = [...elements]
        if (!newElementName.trim().length) return
        const newId = Randomstring.generate(12)
        const color = randomColor()

        try {
            const newElement: Element = {
                _id: newId,
                name: newElementName,
                cartegory: params.cartegory,
                elementType: params.elementType,
                parentElementId: params.parentElementId,
                projectAccessId: '',
                color,
                loading: true
            }

            console.log(newElement)

            dispatch(elementsActions.setElements([...elements, { ...newElement, loading: false }]))
            dispatch(elementsActions.setNewElementName(''))

            // const { data } = await ApiService.createNewElement(newElement)
            // if (data.success) {
            //     const filterred = clonedElements.filter((item) => item._id !== data.newElement._id)
            //     dispatch(elementsActions.setElements([...filterred, { ...newElement, loading: false }]))
            // }  
        } catch (error) {
            console.log(error)
        }


    })


export function getElementById(state: AppState, id: string) {
    return state.ElementsReducer.elements.find((el) => el._id === id)
}