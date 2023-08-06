import { Dispatch } from 'redux'
import axios, { AxiosError } from 'axios'
import { setAppError, setAppStatus } from '../app/app-reducer'

export const handleServerNetworkError = (e: unknown, dispatch: Dispatch) => {
  const err = e as Error | AxiosError<{ error: string }>
  if (axios.isAxiosError(err)) {
    const error = err.message ? err.message : 'Some error occurred'
    dispatch(setAppError({ error }))
  } else {
    dispatch(setAppError({ error: `Native error ${err.message}` }))
  }
  dispatch(setAppStatus({ status: 'failed' }))
}
