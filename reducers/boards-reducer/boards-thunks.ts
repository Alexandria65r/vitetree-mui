import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppState } from "../../store/store";
import router from "next/router";
import { boardActions } from ".";
import { Board } from "../../src/models/board";
import BoardAPI from "../../src/api-services/board";

export const createBoardThunk = createAsyncThunk<void, undefined, { state: AppState }>
    ('cartSlice/createBoardThunk', async (_, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const { AuthReducer: { user: { _id: owner } }, BoardReducer: { board } } = thunkAPI.getState()
        const boardId = board.name.replace(' ', '').toLowerCase()

        try {
            const newBoardPayload: Board = {
                ...board,
                author: {
                    id: owner ?? ''
                }
            }
            const newBoard = await BoardAPI.create(newBoardPayload)
            if (newBoard) {
                //router.replace(`/board/${newBoard.boardId}`)
                dispatch(boardActions.setIsFormOpen(false))
            }
        } catch (error) {

        }
    })


export const fetchBoardThunk = createAsyncThunk<void, string, { state: AppState }>
    ('cartSlice/fetchBoardThunk', async (boardId, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const { AuthReducer: { user: { _id: owner } }, BoardReducer: { board } } = thunkAPI.getState()
        try {
            const boardData = await BoardAPI.fetchBoard(boardId)
            if (boardData) {
                dispatch(boardActions.setBoardData(boardData))
            }
        } catch (error) {
            dispatch(boardActions.setBoardNetworkStatus('fetching-error'))
        }
    })
export const fetchBoardsThunk = createAsyncThunk<void, undefined, { state: AppState }>
    ('cartSlice/fetchBoardsThunk', async (boardId, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        try {
            const board = await BoardAPI.fetchBoards()
            if (board) {
                dispatch(boardActions.setBoards(board))
            }
        } catch (error) {
            dispatch(boardActions.setBoardNetworkStatus('fetching-error'))
        }
    })


type UpdateBoardTargets = 'profile-image' | 'balance' | 'other'
export const updateBoardThunk = createAsyncThunk<any, {
    boardId: string, target: UpdateBoardTargets, update: any
},
    { state: AppState }>
    ('boardlice/updateBoardThunk', async (params, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const { AuthReducer: { user: { _id: owner } }, BoardReducer: { board } } = thunkAPI.getState()
        try {
            const { data } = await BoardAPI.update(params.boardId, params)
            if (data.success) {
                return { ...data }
            }
        } catch (error) {
            dispatch(boardActions.setBoardNetworkStatus(''))
        }
    })