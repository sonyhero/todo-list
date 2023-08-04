import { AnyAction, combineReducers } from 'redux'
import { todolistsReducer } from '../features/TodolistsList/todoListsReducer'
import { tasksReducer } from '../features/TodolistsList/tasksReducer'
import thunkMiddleware, { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { appReducer } from './app-reducer'
import { authReducer } from '../features/Login/auth-reducer'
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
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware),
})

// types
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction> // для санок
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>
