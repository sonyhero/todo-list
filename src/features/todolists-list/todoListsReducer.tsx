import { tasksThunks } from './tasksReducer'
import { RequestStatusType } from '../../app/app-reducer'
import { createSlice, isRejected, PayloadAction } from '@reduxjs/toolkit'
import { createAppAsyncThunk, handleServerNetworkError } from '../../common/utils'
import { todoListAPI, TodolistType, UpdateTodolistTitleArgType } from '../../api/api'
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
      .addCase(fetchTodolists.fulfilled, (_, action) => {
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
  async (_, { dispatch }) => {
      const todolists = await todoListAPI.getTodoLists()
      todolists.forEach((tl) => dispatch(tasksThunks.fetchTasks(tl.id)))
      return { todolists }
  },
)
const createTodolist = createAppAsyncThunk<
  { todolist: TodolistType },
  {
    title: string
  }
>('todolists/createTodolist', async (arg, { rejectWithValue }) => {
  const data = await todoListAPI.createTodoList(arg.title)
  if (data.resultCode === ResultCode.success) {
    const todolist = data.data.item
    return { todolist }
  } else {
    return rejectWithValue({ data, showGlobalError: false })
  }
})
const deleteTodolist = createAppAsyncThunk<{ todolistId: string }, { todolistId: string }>(
  'todolists/deleteTodolist',
  async (arg, { dispatch, rejectWithValue }) => {
    try {
      dispatch(changeTodoListEntityStatus({ todolistId: arg.todolistId, status: 'loading' }))
      await todoListAPI.deleteTodolist(arg.todolistId)
      return { todolistId: arg.todolistId }
    } catch (e) {
      handleServerNetworkError(e, dispatch)
      dispatch(changeTodoListEntityStatus({ todolistId: arg.todolistId, status: 'failed' }))
      return rejectWithValue(null)
    }
  },
)
const changeTodolistTitle = createAppAsyncThunk<
  UpdateTodolistTitleArgType,
  UpdateTodolistTitleArgType
>('todolists/changeTodolistTitle', async (arg, { rejectWithValue }) => {
    const data = await todoListAPI.updateTodolist(arg)
    if (data.resultCode === ResultCode.success) {
      return arg
    } else {
      return rejectWithValue(null)
    }
})

export const todolistsReducer = slice.reducer
export const { changeTodoListEntityStatus } = slice.actions
export const todolistActions = slice.actions
export const todolistsThunks = { fetchTodolists, deleteTodolist, createTodolist, changeTodolistTitle }
export const isARejectedTodolistsAction = isRejected(deleteTodolist)

// types
export type TodoListDomainType = TodolistType & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
}
export type FilterValuesType = 'all' | 'active' | 'completed'
