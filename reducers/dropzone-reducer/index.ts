import { createSlice, PayloadAction } from '@reduxjs/toolkit'




export type DropzoneItem = {
    publicId: string;
    name: string;
    base64?: string | ArrayBuffer | null;
    fitleType: string;
    status: 'uploading' | 'uploaded' | 'deleting' | 'deleted' | ''
}

type DropzoneState = {
    dropzoneList: DropzoneItem[]
}
const initialState: DropzoneState = {
    dropzoneList: []
}


const dropzoneSlice = createSlice({
    name: 'dropzoneSlice',
    initialState,
    reducers: {
        setDropzoneList: (state, { payload }: PayloadAction<DropzoneItem[]>) => {
            state.dropzoneList = payload
        },
        setNewUpload: (state, { payload }: PayloadAction<DropzoneItem>) => {
            state.dropzoneList = [payload, ...state.dropzoneList]
        },
        delete: (state, { payload }: PayloadAction<string>) => {
            state.dropzoneList = state.dropzoneList.filter((item) => item.publicId !== payload)
        },
        clearState: (state) => {
            state.dropzoneList
        },
    },
})


export const dropzoneActions = dropzoneSlice.actions
export default dropzoneSlice.reducer