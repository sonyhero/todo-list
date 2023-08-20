import { todolistsReducer } from '@/features/todo-list-list/todo-list.slice'
import { tasksReducer } from '@/features/todo-list-list/tasks/tasks.slice'
import { appReducer } from './app.slice'
import { authReducer } from '@/features/auth/auth.slice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer,
  },
})
// types
export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
