import {AppReducerActionsType, setAppErrorAC, setAppStatusAC} from '../app/app-reducer'
import {Dispatch} from 'redux'
import {ResponseType} from '../api/api'

// generic function
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Unknown error!'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (e: { message: string }, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setAppErrorAC(e.message))
    dispatch(setAppStatusAC('failed'))
}

type ErrorUtilsDispatchType = Dispatch<AppReducerActionsType>
