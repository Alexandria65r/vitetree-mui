import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Board, BoardSchema } from '../../src/models/board';

export type BoardNetworkStatus =
    'creating' |
    'creating-error' |
    'creating-success' |
    'fetching-board' |
    'fetching-board-error' |
    'fetching-board-success' |
    'fetching-boards' |
    'fetching-boards-error' |
    'fetching-boards-success' |
    'updating' |
    'updating-error' |
    'updating-success' |
    'deleting' |
    'deleting-error' |
    'deleting-success' | ''



type BoardState = {
    selectedBoard: Board;
    board: Board;
    boards: Board[];
    isFormOpen: boolean;
    boardNetworkStatus: BoardNetworkStatus
}


const initialState: BoardState = {
    selectedBoard: BoardSchema,
    board: BoardSchema,
    boards: [],
    isFormOpen: false,
    boardNetworkStatus: ''
}




const boardSlice = createSlice({
    name: 'boardSlice',
    initialState,
    reducers: {
        setIsFormOpen: (state, { payload }: PayloadAction<boolean>) => {
            state.isFormOpen = payload
        },
        setBoardData: (state, { payload }: PayloadAction<Board>) => {
            state.board = payload
        },
        setSelectedBoard: (state, { payload }: PayloadAction<Board>) => {
            state.selectedBoard = payload
        },
        setBoards: (state, { payload }: PayloadAction<Board[]>) => {
            state.boards = payload
        },
        setBoardNetworkStatus: (state, { payload }: PayloadAction<BoardNetworkStatus>) => {
            state.boardNetworkStatus = payload
        }
    }
})

export const boardActions = boardSlice.actions
export default boardSlice.reducer