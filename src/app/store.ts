import { AnyAction, combineReducers } from 'redux'
import { todolistsReducer } from '../features/todolists-list/todoListsReducer'
import { tasksReducer } from '../features/todolists-list/tasksReducer'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { appReducer } from './app-reducer'
import { authReducer } from '../features/auth/auth-reducer'
import { configureStore } from '@reduxjs/toolkit'

export const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
  app: appReducer,
  auth: authReducer,
})

// для санок
export const store = configureStore({
  reducer: rootReducer,
})

// types
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction> // для санок
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>
