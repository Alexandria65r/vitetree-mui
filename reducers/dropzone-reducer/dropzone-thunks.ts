import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppState } from "../../store/store";
import { dropzoneActions } from ".";
import CloudinaryService from "../../src/api-services/cloudinary";
import UploadAPI from "../../src/api-services/upload";
import { FileAsset } from "../../src/models/task";
import { createToastThunk } from "../main-reducer/main-thunks";

export type Base64 = string | ArrayBuffer | null

export const uploadFileThunk = createAsyncThunk<void,
    { base64: string, publicId: string },
    { state: AppState }>
    ('dropzoneSlice/createAsyncThunk', async (item, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const state = thunkAPI.getState()
        const { dropzoneList } = state.DropzoneReducer

        const { data } = await CloudinaryService.uploadFile({
            base64: item.base64 as string,
            publicId: item.publicId,
            // preset: 'image_preset',
            // resource_type:'auto'
        })

        console.log(data)
       // console.log(data.errorInfo.name === 'TimeoutError')
        if (data.result.public_id) {
            console.log(data)
            const clonedList = [...dropzoneList]
            clonedList[0] = { ...clonedList[0], status: 'uploaded', publicId: data.result.public_id, downloadURL: data.result.secure_url }
            dispatch(dropzoneActions.setDropzoneList(clonedList))
        } else if (data.errorInfo.name === 'TimeoutError') {
            dispatch(createToastThunk('Upload request timeout! try again.'))
            const newList: any = dropzoneList.filter((file) => file.publicId !== item.publicId)
            dispatch(dropzoneActions.setDropzoneList(newList))
        }
        console.log(data.public_id)

    })
export const removeUploadedFileThunk = createAsyncThunk<void, FileAsset, { state: AppState }>
    ('dropzoneSlice/removeUploadedFileThunk', async (file, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const state = thunkAPI.getState()
        const dropzoneList = [...state.DropzoneReducer.dropzoneList]
        const index = dropzoneList.indexOf(file);
        dropzoneList[index] = { ...file, status: 'deleting' }
        dispatch(dropzoneActions.setDropzoneList(dropzoneList))
        if (file.status !== 'uploaded') {
            const newList: any = dropzoneList.filter((item) => item.publicId !== file.publicId)
            dispatch(dropzoneActions.setDropzoneList(newList))
        } else {
            const { data } = await UploadAPI.DeleteAsset('image', file.publicId)
            if (data.success) {
                const newList: any = dropzoneList.filter((item) => item.publicId !== file.publicId)
                dispatch(dropzoneActions.setDropzoneList(newList))
            } else {
                dispatch(createToastThunk('An error occured!'))
            }
        }
    })