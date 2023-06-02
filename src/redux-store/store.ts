import {AnyAction, applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux';
import {TodoListsReducer} from '../reducers/todoListsReducer';
import {TasksReducer} from '../reducers/tasksReducer';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';



export const rootReducer = combineReducers({
    todoLists: TodoListsReducer,
    tasks: TasksReducer
})

export type RootReducerType = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<RootStateType, unknown, AnyAction> // для санок
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
    RootStateType,
    unknown,
    AnyAction
>
export type RootStateType = ReturnType<typeof store.getState>

export const store = createStore(rootReducer, applyMiddleware(thunk)) // для санок
// export const store = createStore(rootReducer)