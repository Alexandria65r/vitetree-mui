import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FileAsset } from '../../src/models/task';






type DropzoneState = {
    dropzoneList: FileAsset[]
}
const initialState: DropzoneState = {
    dropzoneList: []
}


const dropzoneSlice = createSlice({
    name: 'dropzoneSlice',
    initialState,
    reducers: {
        setDropzoneList: (state, { payload }: PayloadAction<FileAsset[]>) => {
            state.dropzoneList = payload
        },
        setNewUpload: (state, { payload }: PayloadAction<FileAsset>) => {
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