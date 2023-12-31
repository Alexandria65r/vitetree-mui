// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { AppState } from "../../store";



// export const AddNewElement = createAsyncThunk<void,
//     { elementType: string, parentElementId?: string }, { state: AppState }>
//     ('', async (params, thunkAPI) => {
//         const state = thunkAPI.getState()
//         const elements = state.ProjectReducer.project.elements
//         const clonedElements = [...elements]

//         if (!newElementName) {
//             const element = elements.find((el) => el._id === parentElementId)
//             if (element?._id) {
//                 clonedElements.splice(clonedElements.indexOf(element), 1,
//                     { ...element, isAddingSubFeature: false })
//                 dispatch(projectActions.setProjectElements(clonedElements))
//             }
//             if (elementType === 'parent') {
//                 toggleAddFeature()
//             }

//             return
//         }


//         const newId = Randomstring.generate(12)
//         setIsAddingNewElelement(true)
//         const cartegory = mode === 'tasks' ? types.Task : types.Feature
//         const newElement: Element = {
//             _id: newId,
//             name: newElementName,
//             cartegory,
//             elementType,
//             projectAccessId: accessId,
//             color,
//             loading: true
//         }

//         if (elementType === 'child' && parentElementId) {
//             newElement.parentElementId = parentElementId
//         } else {
//             newElement.color = color
//         }

//         dispatch(projectActions.addFeature(newElement))

//         const { data } = await ApiService.createNewElement(newElement)
//         if (data.success) {
//             const filterred = clonedElements.filter((item) => item._id !== data.newElement._id)
//             dispatch(projectActions.setProjectElements([...filterred, { ...newElement, loading: false }]))
//             setIsAddingNewElelement(false)
//             dispatch(projectActions.updateNewElementName(''))
//         }
//     })