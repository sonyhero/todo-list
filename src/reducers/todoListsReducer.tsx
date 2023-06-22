import {FilterValuesType} from '../app/App';
import {todoListAPI, TodolistType} from '../api/api';
import {fetchTasks} from './tasksReducer';
import {AppThunk} from '../app/store';
import {RequestStatusType, setAppStatusAC} from '../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../utils/error-utils';

const initialState: TodoListDomainType[] = []

export const todoListsReducer = (state: TodoListDomainType[] = initialState, action: TodoListsActionType):
    TodoListDomainType[] => {
    switch (action.type) {
        case 'TODOLIST/ADD_TODOLIST': {
            return [{...action.todoList, filter: 'all', entityStatus: 'idle'}, ...state]
        }
        case 'TODOLIST/REMOVE_TODOLIST': {
            return state.filter(el => el.id !== action.todoListId)
        }
        case 'TODOLIST/CHANGE_TODOLIST_TITLE': {
            return state.map(el => el.id === action.payload.todoListId ? {...el, title: action.payload.newTitle} : el)
        }
        case 'TODOLIST/CHANGE_TODOLIST_FILTER': {
            return state.map(el => el.id === action.payload.todoListId ? {
                ...el,
                filter: action.payload.filerValue
            } : el)
        }
        case 'TODOLIST/SET_TODOLISTS': {
            return action.todoLists.map(tl => ({
                ...tl,
                filter: 'all',
                entityStatus: 'idle'
            }))
        }
        case 'TODOLIST/CHANGE_ENTITY_STATUS': {
            return state.map(el => el.id === action.todoListId ? {
                ...el,
                entityStatus: action.status
            } : el)
        }
    }
    return state
}

// actions
export const addTodoListAC = (todoList: TodolistType) => ({
    type: 'TODOLIST/ADD_TODOLIST',
    todoList
} as const)
export const removeTodoListAC = (todoListId: string) => ({
    type: 'TODOLIST/REMOVE_TODOLIST',
    todoListId
} as const)
export const changeTodoListTitleAC = (todoListId: string, newTitle: string) => ({
    type: 'TODOLIST/CHANGE_TODOLIST_TITLE',
    payload: {
        todoListId,
        newTitle
    }
} as const)
export const changeTodoListFilterAC = (todoListId: string, filerValue: FilterValuesType) => ({
    type: 'TODOLIST/CHANGE_TODOLIST_FILTER',
    payload: {
        todoListId,
        filerValue
    }
} as const)
export const setTodolistAC = (todoLists: TodolistType[]) => ({type: 'TODOLIST/SET_TODOLISTS', todoLists} as const)
export const changeTodoListEntityStatusAC = (todoListId: string, status: RequestStatusType) =>
    ({type: 'TODOLIST/CHANGE_ENTITY_STATUS', todoListId, status} as const)

// thunks
export const fetchTodoLists = (): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const todos = await todoListAPI.getTodoLists()
        dispatch(setTodolistAC(todos))
        todos.forEach((tl) => dispatch(fetchTasks(tl.id)))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        const error = (e as Error)
        handleServerNetworkError(error, dispatch)
    }
}
export const deleteTodoList = (todoListId: string): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodoListEntityStatusAC(todoListId, 'loading'))
    try {
        await todoListAPI.deleteTodolist(todoListId);
        dispatch(removeTodoListAC(todoListId))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        const error = (e as Error)
        handleServerNetworkError(error, dispatch)
        dispatch(changeTodoListEntityStatusAC(todoListId, 'failed'))
    }
}
export const createTodoList = (title: string): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const data = await todoListAPI.createTodoList(title)
        if (data.resultCode === 0) {
            dispatch(addTodoListAC(data.data.item))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(data, dispatch)
        }
    } catch (e) {
        const error = (e as Error)
        handleServerNetworkError(error, dispatch)
    }
}
export const updateTodolist = (todoListId: string, title: string): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const data = await todoListAPI.updateTodolist(todoListId, title)
        if (data.resultCode === 0) {
            dispatch(changeTodoListTitleAC(todoListId, title))
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
export type TodoListDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
type TodoListsActionType =
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof changeTodoListTitleAC>
    | ReturnType<typeof changeTodoListFilterAC>
    | ReturnType<typeof setTodolistAC>
    | ReturnType<typeof changeTodoListEntityStatusAC>