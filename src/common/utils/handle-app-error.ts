import { AnyAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

export const handleServerAppError = (action: AnyAction) => {
  const { payload, error } = action
  if (payload) {
    if (payload.showGlobalError) {
      const err = payload.data.messages.length ? payload.data.messages[0] : 'Some error occurred'
      toast.error(err)
    }
  } else {
    const err = error.message ? error.message : 'Some error occurred'
    toast.error(err)
  }
}
