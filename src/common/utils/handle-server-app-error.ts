import { ResponseAppType } from '../types'
import { Dispatch } from 'redux'
import { setAppError } from '../../app/app.slice'

export const handleServerAppError = <D>(data: ResponseAppType<D>, dispatch: Dispatch, showError: boolean = true) => {
  if (showError) {
    dispatch(setAppError({ error: data.messages.length ? data.messages[0] : 'Some error occurred' }))
  }
}
