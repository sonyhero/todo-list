import { setAppError, setAppStatus } from '../app/app-reducer'
import { Dispatch } from 'redux'
import { ResponseType } from '../api/api'

// generic function
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch) => {
  if (data.messages.length) {
    dispatch(setAppError({ error: data.messages[0] }))
  } else {
    dispatch(setAppError({ error: 'Unknown error!' }))
  }
  dispatch(setAppStatus({ status: 'failed' }))
}

export const handleServerNetworkError = (e: { message: string }, dispatch: Dispatch) => {
  dispatch(setAppError({ error: e.message }))
  dispatch(setAppStatus({ status: 'failed' }))
}

// type ErrorUtilsDispatchType = Dispatch<AppReducerActionsType>
