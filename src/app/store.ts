import {AnyAction, combineReducers} from 'redux';
import {todoListsReducer} from '../features/TodolistsList/todoListsReducer';
import {tasksReducer} from '../features/TodolistsList/tasksReducer';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {appReducer} from './app-reducer';
import {authReducer} from '../features/Login/auth-reducer';
import {configureStore} from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer,
})
//redux dev tools
// const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// для санок
// export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
export const store = configureStore({
    reducer: rootReducer
})

// types
export type AppRootStateType = ReturnType<typeof store.getState>
export type RootReducerType = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction> // для санок
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppRootStateType,
    unknown,
    AnyAction
>