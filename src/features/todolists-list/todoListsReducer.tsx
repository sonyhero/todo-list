import { FilterValuesType } from '../../app/App'
import { tasksThunks } from './tasksReducer'
import { RequestStatusType, setAppStatus } from '../../app/app-reducer'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createAppAsyncThunk, handleServerAppError, handleServerNetworkError } from '../../common/utils'
import { todoListAPI, TodolistType } from '../../api/api'
import { ResultCode } from '../../common/enums'
import { clearTasksAndTodolists } from '../../common/actions'

const initialState: TodoListDomainType[] = []

const slice = createSlice({
  name: 'todolist',
  initialState,
  reducers: {
    changeTodoListFilter(state, action: PayloadAction<{ todolistId: string; filter: FilterValuesType }>) {
      const index = state.findIndex((t) => t.id === action.payload.todolistId)
      if (index !== -1) state[index].filter = action.payload.filter
    },
    changeTodoListEntityStatus(state, action: PayloadAction<{ todolistId: string; status: RequestStatusType }>) {
      const index = state.findIndex((t) => t.id === action.payload.todolistId)
      if (index !== -1) state[index].entityStatus = action.payload.status
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodolists.fulfilled, (state, action) => {
        return action.payload.todolists.map((tl) => ({
          ...tl,
          filter: 'all',
          entityStatus: 'idle',
        }))
      })
      .addCase(deleteTodolist.fulfilled, (state, action) => {
        const index = state.findIndex((t) => t.id === action.payload.todolistId)
        if (index !== -1) state.splice(index, 1)
      })
      .addCase(createTodolist.fulfilled, (state, action) => {
        const newTodolist: TodoListDomainType = {
          ...action.payload.todolist,
          filter: 'all',
          entityStatus: 'idle',
        }
        state.unshift(newTodolist)
      })
      .addCase(changeTodolistTitle.fulfilled, (state, action) => {
        const index = state.findIndex((t) => t.id === action.payload.todolistId)
        if (index !== -1) state[index].title = action.payload.title
      })
      .addCase(clearTasksAndTodolists, () => {
        return []
      })
  },
})

const fetchTodolists = createAppAsyncThunk<{ todolists: TodolistType[] }, void>(
  'todolists/fetchTodolists',
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      dispatch(setAppStatus({ status: 'loading' }))
      const todolists = await todoListAPI.getTodoLists()
      todolists.forEach((tl) => dispatch(tasksThunks.fetchTasks(tl.id)))
      dispatch(setAppStatus({ status: 'succeeded' }))
      return { todolists }
    } catch (e) {
      handleServerNetworkError(e, dispatch)
      return rejectWithValue(null)
    }
  },
)
const deleteTodolist = createAppAsyncThunk<{ todolistId: string }, { todolistId: string }>(
  'todolists/deleteTodolist',
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      dispatch(setAppStatus({ status: 'loading' }))
      dispatch(changeTodoListEntityStatus({ todolistId: arg.todolistId, status: 'loading' }))
      await todoListAPI.deleteTodolist(arg.todolistId)
      dispatch(setAppStatus({ status: 'succeeded' }))
      return { todolistId: arg.todolistId }
    } catch (e) {
      handleServerNetworkError(e, dispatch)
      dispatch(changeTodoListEntityStatus({ todolistId: arg.todolistId, status: 'failed' }))
      return rejectWithValue(null)
    }
  },
)
const createTodolist = createAppAsyncThunk<
  { todolist: TodolistType },
  {
    title: string
  }
>('todolists/createTodolist', async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
  try {
    dispatch(setAppStatus({ status: 'loading' }))
    const data = await todoListAPI.createTodoList(arg.title)
    if (data.resultCode === ResultCode.success) {
      const todolist = data.data.item
      dispatch(setAppStatus({ status: 'succeeded' }))
      return { todolist }
    } else {
      handleServerAppError(data, dispatch)
      return rejectWithValue(null)
    }
  } catch (e) {
    handleServerNetworkError(e, dispatch)
    return rejectWithValue(null)
  }
})
const changeTodolistTitle = createAppAsyncThunk<
  { todolistId: string; title: string },
  {
    todolistId: string
    title: string
  }
>('todolists/changeTodolistTitle', async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
  try {
    dispatch(setAppStatus({ status: 'loading' }))
    const data = await todoListAPI.updateTodolist(arg.todolistId, arg.title)
    if (data.resultCode === ResultCode.success) {
      dispatch(setAppStatus({ status: 'succeeded' }))
      return { todolistId: arg.todolistId, title: arg.title }
    } else {
      handleServerAppError(data, dispatch)
      return rejectWithValue(null)
    }
  } catch (e) {
    handleServerNetworkError(e, dispatch)
    return rejectWithValue(null)
  }
})

export const todolistsReducer = slice.reducer
export const { changeTodoListEntityStatus } = slice.actions
export const todolistActions = slice.actions
export const todolistsThunks = { fetchTodolists, deleteTodolist, createTodolist, changeTodolistTitle }

// types
export type TodoListDomainType = TodolistType & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
}
