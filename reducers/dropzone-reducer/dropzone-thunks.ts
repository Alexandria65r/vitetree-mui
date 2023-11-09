import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppState } from "../../store/store";
import { DropzoneItem, dropzoneActions } from ".";
import Randomstring from "randomstring";
import CloudinaryService from "../../src/api-services/cloudinary";

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
            publicId: item.publicId
        })
        if (data.result.public_id) {
            console.log(data.result)

            const clonedList = [...dropzoneList]
            clonedList[0] = { ...clonedList[0], status: 'uploaded' }
            dispatch(dropzoneActions.setDropzoneList(clonedList))

        }
        console.log(data.result.public_id)

    })