import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppState } from "../../store/store";
import router from "next/router";
import { boardActions } from ".";
import { Board, BoardSchema } from "../../src/models/board";
import BoardAPI from "../../src/api-services/board";
import randomColor from "randomcolor";
import Randomstring from "randomstring";
import { workspaceActions } from "../workspace-reducer";
import { elementsActions } from "../elements-reducer";
import { listGroupActions } from "../list-group-reducer";
import { prepareCustomElementsThunk } from "../list-group-reducer/list-group-thunks";


export const createBoardThunk = createAsyncThunk<void, undefined, { state: AppState }>
    ('cartSlice/createBoardThunk', async (_, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const { AuthReducer: { user: { _id: owner } }, BoardReducer: { board, boards } } = thunkAPI.getState()
        const color = randomColor()
        const id = Randomstring.generate(22)
        try {
            dispatch(boardActions.setBoardNetworkStatus('creating'))
            const newBoardPayload: Board = {
                _id: id,
                ...board,
                color: color,
                author: {
                    id: owner ?? ''
                }
            }
            console.log(newBoardPayload)
            const newBoard = await BoardAPI.create(newBoardPayload)
            if (newBoard) {
                dispatch(boardActions.setBoards([...boards, newBoard]))
                dispatch(boardActions.setBoardData(BoardSchema))
                dispatch(selectBoardThunk(newBoard))
                dispatch(boardActions.setIsFormOpen(false))
            }
        } catch (error) {
            dispatch(boardActions.setBoardNetworkStatus('creating-error'))
        }
    })

export const selectBoardThunk = createAsyncThunk<void, Board, { state: AppState }>
    ('cartSlice/selectedBoardAction', async (board, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const state = thunkAPI.getState()
        const workspaceId = state.WorkspaceReducer.selectedWorkspace._id
        dispatch(boardActions.setSelectedBoard(board))
        router.replace(`/w/${workspaceId}/boardId/${board?._id ?? ''}`)
    })





export const fetchBoardThunk = createAsyncThunk<Board | undefined, string, { state: AppState }>
    ('cartSlice/fetchBoardThunk', async (boardId, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const { AuthReducer: { user: { _id: owner } }, BoardReducer: { board } } = thunkAPI.getState()
        try {
            dispatch(boardActions.setBoardNetworkStatus('fetching-board'))
            const data = await BoardAPI.fetchBoard(boardId)
            if (data) {
                dispatch(boardActions.setBoardData(data.board))
                dispatch(boardActions.setSelectedBoard(data?.board))
                dispatch(workspaceActions.setSelectedWorkspace(data?.workspace))
                localStorage.setItem('workspaceId', data.workspace?._id ?? '')
                return data.board
            }
        } catch (error) {
            dispatch(boardActions.setBoardNetworkStatus('fetching-board-error'))
        }
    })

export const fetchActiveWorkspaceBoardAndBoardData = createAsyncThunk<Board | undefined, string, { state: AppState }>
    ('cartSlice/fetchActiveWorkspaceBoardAndBoardData', async (path, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const state = thunkAPI.getState()
        const selectedWorkspace = state.WorkspaceReducer.selectedWorkspace
        dispatch(boardActions.setBoardNetworkStatus('fetching-board-data'))
        console.log('called!🎉')
        try {
            const data = await BoardAPI.fetchActiveWorkspaceBoardAndBoardData(path)
            //const workspaceId = localStorage.getItem('workspaceId')
            if (data) {
                dispatch(boardActions.setBoardNetworkStatus('fetching-board-data-success'))
                dispatch(prepareCustomElementsThunk({ listGroups: data?.listGroups, elements: data.elements }))
                dispatch(boardActions.setSelectedBoard(data?.board))
                dispatch(boardActions.setBoards(data?.boards))
                if (selectedWorkspace._id !== data.workspace._id) {
                    dispatch(workspaceActions.setSelectedWorkspace(data?.workspace))
                    dispatch(workspaceActions.setWorkspacePeople(data.people))
                }
                dispatch(listGroupActions.setListGroups(data?.listGroups))
                dispatch(elementsActions.setElements(data.elements))

                localStorage.setItem('workspaceId', data.workspace?._id ?? '')
                return data.board
            }
        } catch (error) {
            dispatch(boardActions.setBoardNetworkStatus('fetching-board-data-error'))
        }
    })


export const fetchBoardsThunk = createAsyncThunk<void, string, { state: AppState }>
    ('cartSlice/fetchBoardsThunk', async (workspaceId, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const state = thunkAPI.getState()

        try {
            dispatch(boardActions.setBoardNetworkStatus('fetching-boards'))
            const boards = await BoardAPI.fetchBoards(workspaceId ?? '')
            if (boards) {
                dispatch(boardActions.setBoardNetworkStatus('fetching-boards-success'))
                dispatch(boardActions.setBoards(boards))
            }
        } catch (error) {
            dispatch(boardActions.setBoardNetworkStatus('fetching-boards-error'))
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

export function getBoardById(state: AppState, id: string) {
    return state.BoardReducer.boards.find((el) => el._id === id) ?? BoardSchema
}