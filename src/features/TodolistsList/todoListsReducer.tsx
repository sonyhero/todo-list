import { FilterValuesType } from '../../app/App'
import { todoListAPI, TodolistType } from '../../api/api'
import { tasksThunks } from './tasksReducer'
import { AppThunk } from '../../app/store'
import { RequestStatusType, setAppStatus } from '../../app/app-reducer'
import { handleServerAppError, handleServerNetworkError } from '../../utils/error-utils'
import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit'

export const clearTasksAndTodolists = createAction('common/clear-tasks-todolists')

const initialState: TodoListDomainType[] = []

const slice = createSlice({
  name: 'todolist',
  initialState,
  reducers: {
    addTodolist(state, action: PayloadAction<{ todolist: TodolistType }>) {
      const newTodolist: TodoListDomainType = { ...action.payload.todolist, filter: 'all', entityStatus: 'idle' }
      state.unshift(newTodolist)
    },
    removeTodoList(state, action: PayloadAction<{ todolistId: string }>) {
      const index = state.findIndex((t) => t.id === action.payload.todolistId)
      if (index !== -1) state.splice(index, 1)
    },
    changeTodoListTitle(state, action: PayloadAction<{ todolistId: string; title: string }>) {
      const index = state.findIndex((t) => t.id === action.payload.todolistId)
      if (index !== -1) state[index].title = action.payload.title
    },
    changeTodoListFilter(state, action: PayloadAction<{ todolistId: string; filter: FilterValuesType }>) {
      const index = state.findIndex((t) => t.id === action.payload.todolistId)
      if (index !== -1) state[index].filter = action.payload.filter
    },
    setTodolist(state, action: PayloadAction<{ todolists: TodolistType[] }>) {
      return action.payload.todolists.map((tl) => ({
        ...tl,
        filter: 'all',
        entityStatus: 'idle',
      }))
    },
    changeTodoListEntityStatus(state, action: PayloadAction<{ todolistId: string; status: RequestStatusType }>) {
      const index = state.findIndex((t) => t.id === action.payload.todolistId)
      if (index !== -1) state[index].entityStatus = action.payload.status
    },
  },
  extraReducers: (builder) => {
    builder.addCase(clearTasksAndTodolists, () => {
      return []
    })
  },
})

export const todolistsReducer = slice.reducer
export const { changeTodoListEntityStatus, changeTodoListTitle, removeTodoList, setTodolist, addTodolist } =
  slice.actions
export const todolistActions = slice.actions

// thunks
export const fetchTodoLists = (): AppThunk => async (dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }))
  try {
    const todolists = await todoListAPI.getTodoLists()
    dispatch(setTodolist({ todolists }))
    todolists.forEach((tl) => dispatch(tasksThunks.fetchTasks(tl.id)))
    dispatch(setAppStatus({ status: 'succeeded' }))
  } catch (e) {
    const error = e as Error
    handleServerNetworkError(error, dispatch)
  }
}
export const deleteTodoList =
  (todolistId: string): AppThunk =>
  async (dispatch) => {
    dispatch(setAppStatus({ status: 'loading' }))
    dispatch(changeTodoListEntityStatus({ todolistId, status: 'loading' }))
    try {
      await todoListAPI.deleteTodolist(todolistId)
      dispatch(removeTodoList({ todolistId }))
      dispatch(setAppStatus({ status: 'succeeded' }))
    } catch (e) {
      const error = e as Error
      handleServerNetworkError(error, dispatch)
      dispatch(changeTodoListEntityStatus({ todolistId, status: 'failed' }))
    }
  }
export const createTodoList =
  (title: string): AppThunk =>
  async (dispatch) => {
    dispatch(setAppStatus({ status: 'loading' }))
    try {
      const data = await todoListAPI.createTodoList(title)
      if (data.resultCode === 0) {
        dispatch(addTodolist({ todolist: data.data.item }))
        dispatch(setAppStatus({ status: 'succeeded' }))
      } else {
        handleServerAppError(data, dispatch)
      }
    } catch (e) {
      const error = e as Error
      handleServerNetworkError(error, dispatch)
    }
  }
export const updateTodolist =
  (todolistId: string, title: string): AppThunk =>
  async (dispatch) => {
    dispatch(setAppStatus({ status: 'loading' }))
    try {
      const data = await todoListAPI.updateTodolist(todolistId, title)
      if (data.resultCode === 0) {
        dispatch(changeTodoListTitle({ todolistId, title }))
        dispatch(setAppStatus({ status: 'succeeded' }))
      } else {
        handleServerAppError(data, dispatch)
      }
    } catch (e) {
      const error = e as Error
      handleServerNetworkError(error, dispatch)
    }
  }
// types

export type TodoListDomainType = TodolistType & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
}
