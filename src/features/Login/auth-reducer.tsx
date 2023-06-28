import {Dispatch} from 'redux'
import {AppReducerActionsType, setAppStatusAC} from '../../app/app-reducer'
import {authAPI, LoginParamsType} from "../../api/api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: AuthReducerActionsType): InitialStateType => {
    switch (action.type) {
        case 'LOGIN/SET_IS_LOGGED_IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'LOGIN/SET_IS_LOGGED_IN', value} as const)

// thunks
export const loginTC = (params: LoginParamsType) => async (dispatch: Dispatch<AuthReducerActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const data = await authAPI.login(params)
        if (data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(data, dispatch)
        }
    } catch (e) {
        const error = (e as Error)
        handleServerNetworkError(error, dispatch)
    }
}

// types
type AuthReducerActionsType = ReturnType<typeof setIsLoggedInAC> | AppReducerActionsType

