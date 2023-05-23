import { createAsyncThunk } from "@reduxjs/toolkit"
import { AppState } from "../../store/store"
import Randomstring from "randomstring"
import { mainActions } from "."


export const createToastThunk = createAsyncThunk<void, string, { state: AppState }>
    ('mainSlice/createToast', async (message, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const toastId = Randomstring.generate(17)
            dispatch(mainActions.setToasts({
                id:toastId,
                message
            }))
    })