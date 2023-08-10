import { createSlice } from '@reduxjs/toolkit'
import { authAPI, LoginParamsType, securityAPI } from '../../api/api'
import { setAppInitialized, setAppStatus } from '../../app/app-reducer'
import { ResultCode } from '../../common/enums'
import { createAppAsyncThunk, handleServerAppError, handleServerNetworkError } from '../../common/utils'
import { clearTasksAndTodolists } from '../../common/actions'

const initialState = {
  isLoggedIn: false,
  captchaUrl: '',
}

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      })
      .addCase(initializeApp.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      })
      .addCase(getCaptcha.fulfilled, (state, action) => {
        state.captchaUrl = action.payload.captchaUrl
      })
  },
})

const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>('auth/login', async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
  try {
    dispatch(setAppStatus({ status: 'loading' }))
    const data = await authAPI.login(arg)
    if (data.resultCode === ResultCode.success) {
      dispatch(setAppStatus({ status: 'succeeded' }))
      return { isLoggedIn: true }
    } else {
      if (data.resultCode === ResultCode.captcha) {
        dispatch(getCaptcha())
      }
      const isShowAppError = !data.fieldsErrors.length
      handleServerAppError(data, dispatch, isShowAppError)
      return rejectWithValue(null)
    }
  } catch (e) {
    handleServerNetworkError(e, dispatch)
    return rejectWithValue(null)
  }
})

const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, void>('auth/logout', async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
  try {
    dispatch(setAppStatus({ status: 'loading' }))
    const data = await authAPI.logout()
    if (data.resultCode === ResultCode.success) {
      dispatch(clearTasksAndTodolists())
      dispatch(setAppStatus({ status: 'succeeded' }))
      return { isLoggedIn: false }
    } else {
      if (data.resultCode === ResultCode.captcha) {
        dispatch(getCaptcha())
      }
      handleServerAppError(data, dispatch)
      return rejectWithValue(null)
    }
  } catch (e) {
    handleServerNetworkError(e, dispatch)
    return rejectWithValue(null)
  }
})

const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }, void>('auth/initializeApp', async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
  try {
    dispatch(setAppStatus({ status: 'loading' }))
    const data = await authAPI.me()
    if (data.resultCode === ResultCode.success) {
      dispatch(setAppStatus({ status: 'succeeded' }))
      return { isLoggedIn: true }
    } else {
      return rejectWithValue(null)
    }
  } catch (e) {
    handleServerNetworkError(e, dispatch)
    return rejectWithValue(null)
  } finally {
    dispatch(setAppInitialized({ isInitialized: true }))
  }
})

const getCaptcha = createAppAsyncThunk<{ captchaUrl: string }, void>('auth/getCaptcha', async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
  try {
    const data = await securityAPI.getCaptchaUrl()
    const captchaUrl = data.url
    return { captchaUrl }
  } catch (e) {
    handleServerNetworkError(e, dispatch)
    return rejectWithValue(null)
  }
})

export const authReducer = slice.reducer
export const authThunks = { login, logout, getCaptcha, initializeApp }
