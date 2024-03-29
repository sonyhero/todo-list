import { AnyAction, createSlice, isFulfilled, isPending, isRejected, PayloadAction } from '@reduxjs/toolkit'
import { isARejectedTasksAction } from '@/features/todo-list-list/tasks/tasks.slice'
import { isARejectedTodolistsAction } from '@/features/todo-list-list/todo-list.slice'
import { handleServerAppError } from '@/common/utils/handle-app-error'

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
  status: 'loading' as RequestStatusType,
  error: null as null | string,
  isMobile: null as null | boolean,
  isInitialized: false,
}

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized
    },
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error
    },
    setIsMobile: (state, action: PayloadAction<{ isMobile: boolean | null }>) => {
      state.isMobile = action.payload.isMobile
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action: AnyAction) => {
          return isPending(action)
        },
        (state) => {
          state.status = 'loading'
        },
      )
      .addMatcher(
        (action: AnyAction) => {
          return isFulfilled(action)
        },
        (state) => {
          state.status = 'succeeded'
        },
      )
      .addMatcher(
        (action: AnyAction) => {
          return isARejectedTasksAction(action)
        },
        (state, action) => {
          handleServerAppError(action)
          state.status = 'failed'
        },
      )
      .addMatcher(
        (action: AnyAction) => {
          return isARejectedTodolistsAction(action)
        },
        (state, action) => {
          handleServerAppError(action)
          state.status = 'failed'
        },
      )
      .addMatcher(
        (action: AnyAction) => {
          if (isARejectedTasksAction(action)) {
            return false
          }
          if (isARejectedTodolistsAction(action)) {
            return false
          } else return isRejected(action)
        },
        (state, action) => {
          handleServerAppError(action)
          state.status = 'failed'
        },
      )
  },
})

export const appReducer = slice.reducer
export const { setAppInitialized, setAppError } = slice.actions
export const appActions = slice.actions
