import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit'

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
  status: 'loading' as RequestStatusType,
  error: null as null | string,
  isInitialized: false
}

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    // setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
    //   state.status = action.payload.status
    // },
    setAppInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized
    },
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error
    }
  },
  extraReducers: builder => {
    builder
      .addMatcher(
        (action: AnyAction) => {
          return action.type.endsWith('/pending')
      },
        (state) => {
          state.status = 'loading'
      })
      .addMatcher(
        (action: AnyAction) => {
          return action.type.endsWith('/fulfilled')
        },
        (state) => {
          state.status = 'succeeded'
        },
      )
  }
})

export const appReducer = slice.reducer
export const { setAppInitialized, setAppError } = slice.actions
export const appActions = slice.actions
