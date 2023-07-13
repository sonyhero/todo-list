import {authAPI} from '../api/api';
import {handleServerNetworkError} from '../utils/error-utils';
import {setIsLoggedInAC} from '../features/Login/auth-reducer';
import {AppThunk} from './store';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as null | string,
    isInitialized: false
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppReducerActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET_STATUS':
            return {...state, status: action.status}
        case 'APP/SET_ERROR':
            return {...state, error: action.error}
        case 'APP/SET_INITIALIZED':
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET_STATUS', status} as const)

export const setAppInitializedAC = (isInitialized: boolean) => ({type: 'APP/SET_INITIALIZED', isInitialized} as const)

export const setAppErrorAC = (error: null | string) => ({type: 'APP/SET_ERROR', error} as const)

export const initializeAppTC = (): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const data = await authAPI.me()
        if (data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            // handleServerAppError(data, dispatch)
        }
    } catch (e) {
        const error = (e as Error)
        handleServerNetworkError(error, dispatch)
    } finally {
        dispatch(setAppInitializedAC(true))
    }
}


export type AppReducerActionsType =
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setAppInitializedAC>