import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from './store'
import { authAPI } from '../api/api'
import { ResultCode } from '../common/enums'
import { setIsLoggedIn } from '../features/auth/auth-reducer'
import { handleServerNetworkError } from '../common/utils'

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
  status: 'loading' as RequestStatusType,
  error: null as null | string,
  isInitialized: false,
}

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status
    },
    setAppInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized
    },
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error
    },
  },
})

export const appReducer = slice.reducer
export const { setAppStatus, setAppInitialized, setAppError } = slice.actions

export const initializeAppTC = (): AppThunk => async (dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }))
  try {
    const data = await authAPI.me()
    if (data.resultCode === ResultCode.success) {
      dispatch(setIsLoggedIn({ isLoggedIn: true }))
      dispatch(setAppStatus({ status: 'succeeded' }))
    } else {
      // handleServerAppError(data, dispatch)
    }
  } catch (e) {
    handleServerNetworkError(e, dispatch)
  } finally {
    dispatch(setAppInitialized({ isInitialized: true }))
  }
}
