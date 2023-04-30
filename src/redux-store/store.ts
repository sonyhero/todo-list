import {combineReducers, legacy_createStore as createStore} from 'redux';
import {TodoListsReducer} from '../reducers/todoListsReducer';
import {TasksReducer} from '../reducers/tasksReducer';


export const rootReducer = combineReducers({
    todoLists: TodoListsReducer,
    tasks: TasksReducer
})

export type RootStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)