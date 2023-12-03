import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import MainReducer from '../reducers/main-reducer'
import ChatReducer from '../reducers/chat-reducer'
import TestReducer from '../reducers/test-reducer'
import PartcipantReducer from '../reducers/partcipant-reducer'
import AuthReducer from '../reducers/auth-reducer/auth-reducer'
import CourseReducer from '../reducers/course-reducer'
import CartReducer from '../reducers/cart-reducer'
import WishListReducer from '../reducers/wishlist-reducer'
import ForumReducer from '../reducers/forum-reducer'
import InquiryReducer from '../reducers/inquiry-reducer'
import NotificationsReducer from '../reducers/notification-reducer'

import AcademicReducer from '../reducers/academic-answers-reducer'
import DropzoneReducer from '../reducers/dropzone-reducer'
import PageReducer from '../reducers/page-reducer'
import PostReducer from '../reducers/post-reducer'




const rootReducer = combineReducers({
  AuthReducer,
  MainReducer,
  ChatReducer,
  TestReducer,
  PartcipantReducer,
  CourseReducer,
  CartReducer,
  WishListReducer,
  ForumReducer,
  InquiryReducer,
  NotificationsReducer,
  AcademicReducer,
  DropzoneReducer,
  PageReducer,
  PostReducer
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


