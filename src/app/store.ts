import {AnyAction, applyMiddleware, combineReducers, compose, legacy_createStore as createStore} from 'redux';
import {TodoListsReducer} from '../reducers/todoListsReducer';
import {TasksReducer} from '../reducers/tasksReducer';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';

export const rootReducer = combineReducers({
    todoLists: TodoListsReducer,
    tasks: TasksReducer
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