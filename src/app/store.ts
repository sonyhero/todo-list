import {AnyAction, applyMiddleware, combineReducers, compose, legacy_createStore as createStore} from 'redux';
import {todoListsReducer} from '../reducers/todoListsReducer';
import {tasksReducer} from '../reducers/tasksReducer';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {appReducer} from './app-reducer';

export const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
    app: appReducer
})
//redux dev tools
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// для санок
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

// types
export type RootStateType = ReturnType<typeof store.getState>
export type RootReducerType = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<RootStateType, unknown, AnyAction> // для санок
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootStateType,
    unknown,
    AnyAction
>