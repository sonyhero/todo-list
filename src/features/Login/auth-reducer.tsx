import {setAppStatus} from '../../app/app-reducer'
import {authAPI, LoginParamsType, securityAPI} from '../../api/api';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {AppThunk} from '../../app/store';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    captchaUrl: ''
}

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
            state.isLoggedIn = action.payload.isLoggedIn
        },
        getCaptchaUrl: (state, action: PayloadAction<{ captchaUrl: string }>) => {
            state.captchaUrl = action.payload.captchaUrl
        }
    }
})

export const authReducer = slice.reducer
export const {setIsLoggedIn, getCaptchaUrl} = slice.actions
export const authActions = slice.actions

// export const authReducer = (state: InitialStateType = initialState, action: AuthReducerActionsType): InitialStateType => {
//     switch (action.type) {
//         case 'LOGIN/SET_IS_LOGGED_IN':
//             return {...state, isLoggedIn: action.value}
//         case 'LOGIN/GET_CUPTCHA_URL_SUCCESS':
//             return {...state, captchaUrl: action.captchaUrl}
//         default:
//             return state
//     }
// }
// // actions
// export const setIsLoggedInAC = (value: boolean) =>
//     ({type: 'LOGIN/SET_IS_LOGGED_IN', value} as const)
// export const getCaptchaUrlSuccess = (captchaUrl: string) =>
//     ({type: 'LOGIN/GET_CUPTCHA_URL_SUCCESS', captchaUrl} as const)

// thunks
export const loginTC = (params: LoginParamsType): AppThunk => async (dispatch) => {
    dispatch(setAppStatus({status:'loading'}))
    try {
        const data = await authAPI.login(params)
        if (data.resultCode === 0) {
            dispatch(setIsLoggedIn({isLoggedIn: true}))
            dispatch(setAppStatus({status:'succeeded'}))
        } else {
            if (data.resultCode === 10) {
                dispatch(getCaptcha())
            }
            handleServerAppError(data, dispatch)
        }
    } catch (e) {
        const error = (e as Error)
        handleServerNetworkError(error, dispatch)
    }
}
export const logoutTC = (): AppThunk => async (dispatch) => {
    dispatch(setAppStatus({status:'loading'}))
    try {
        const data = await authAPI.logout()
        if (data.resultCode === 0) {
            dispatch(setIsLoggedIn({isLoggedIn: false}))
            dispatch(setAppStatus({status:'succeeded'}))
        } else {
            handleServerAppError(data, dispatch)
        }
    } catch (e) {
        const error = (e as Error)
        handleServerNetworkError(error, dispatch)
    }
}
export const getCaptcha = (): AppThunk => async (dispatch) => {
    try {
        const data = await securityAPI.getCaptchaUrl()
        const captchaUrl = data.url
        dispatch(getCaptchaUrl({captchaUrl}))
    } catch (e) {
        const error = (e as Error)
        handleServerNetworkError(error, dispatch)
    }
}

// types
// type AuthReducerActionsType =
//     | ReturnType<typeof setIsLoggedInAC>
//     | ReturnType<typeof getCaptchaUrlSuccess>
//     | AppReducerActionsType

