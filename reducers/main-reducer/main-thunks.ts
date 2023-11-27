import { createAsyncThunk } from "@reduxjs/toolkit"
import { AppState } from "../../store/store"
import Randomstring from "randomstring"
import { mainActions } from "."
import UploadAPI from "../../src/api-services/upload"
import { Asset, UploadPayload, UploadResponse } from "../../src/reusable/interfaces"


export const createToastThunk = createAsyncThunk<void, string, { state: AppState }>
    ('mainSlice/createToast', async (message, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const toastId = Randomstring.generate(17)
        dispatch(mainActions.setToasts({
            id: toastId,
            message
        }))
    })



export const uploadFileThunk = createAsyncThunk<Asset, UploadPayload, { state: AppState }>
    ('mainSlice/uploadFileThunk', async (payload, thunkAPI) => {
        const response: UploadResponse = await UploadAPI.uploadFile(payload)
        return {
            publicId: response.public_id,
            secureURL: response.secure_url
        }
    })




