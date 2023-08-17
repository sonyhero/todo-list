import { Dispatch } from 'redux'
import axios, { AxiosError } from 'axios'
import { setAppError } from '@/app/app.slice'
import { toast } from 'react-toastify'

export const handleServerNetworkError = (e: unknown, dispatch: Dispatch) => {
  const err = e as Error | AxiosError<{ error: string }>
  if (axios.isAxiosError(err)) {
    const error = err.message ? err.message : 'Some error occurred'
    dispatch(setAppError({ error }))
    toast.error(error)
  } else {
    dispatch(setAppError({ error: `Native error ${err.message}` }))
    toast.error(`Native error ${err.message}`)
  }
}
