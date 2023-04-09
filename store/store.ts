import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit'
import { MakeStore, createWrapper } from 'next-redux-wrapper'
import MainReducer from '../reducers'
import ChatReducer from '../reducers/chat-reducer'
import TestReducer from '../reducers/test-reducer'
import AuthReducer from '../reducers/auth-reducer'

const rootReducer = combineReducers({
  AuthReducer,
  MainReducer,
  ChatReducer,
  TestReducer
})


const makeStore = ({ reduxWrapperMiddleware }: any) =>
  configureStore({
    reducer: rootReducer,
    devTools: true,
    // middleware: getDefaultMiddleware =>
    //   [...getDefaultMiddleware(), reduxWrapperMiddleware].filter(Boolean) as any
  })





type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;
export type AppDispatch = ReturnType<AppStore['dispatch']>




export const wrapper = createWrapper<AppStore>(makeStore, { debug: true })


