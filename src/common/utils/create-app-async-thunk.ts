import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppDispatch, AppRootStateType } from '@/app/store'
import { ResponseAppType } from '../types'

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppRootStateType
  dispatch: AppDispatch
  rejectValue: null | RejectValueType
}>()

export type RejectValueType = {
  data: ResponseAppType
  showGlobalError: boolean
}
