import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import MainReducer from '../reducers/main-reducer'
import AuthReducer from '../reducers/auth-reducer/auth-reducer'
import NotificationsReducer from '../reducers/notification-reducer'
import ProjectReducer from '../reducers/project-reducer'
import ElementsReducer from '../reducers/elements-reducer'
import WorkspaceReducer from '../reducers/workspace-reducer'
import BoardReducer from '../reducers/boards-reducer'
import ListGroupReducer from '../reducers/list-group-reducer'
import TaskUpdatesReducer from '../reducers/task-updates-reducer'

const rootReducer = combineReducers({
  AuthReducer,
  MainReducer,
  NotificationsReducer,
  ProjectReducer,
  ElementsReducer,
  WorkspaceReducer,
  BoardReducer,
  ListGroupReducer,
  TaskUpdatesReducer
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


