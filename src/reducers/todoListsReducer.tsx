import {v1} from 'uuid';
import {FilterValuesType} from '../app/App';
import {todoListAPI, TodolistType} from '../api/api';
import {fetchTasks} from './tasksReducer';
import {AppThunk} from '../app/store';
import {setAppStatusAC} from '../app/app-reducer';

const initialState: InitialStateType[] = []

export const todoListsReducer = (state: InitialStateType[] = initialState, action: TodoListsActionType): InitialStateType[] => {
    switch (action.type) {
        case 'TODOLIST/ADD_TODOLIST': {
            let newTodoList: TodoListType = {
                id: action.payload.todoListId,
                title: action.payload.newTitle,
                addedDate: new Date(),
                order: 0,
                filter: 'all'
            }
            return [...state, newTodoList]
        }
        case 'TODOLIST/REMOVE_TODOLIST': {
            return state.filter(el => el.id !== action.payload.todoListId)
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
                filter: 'all'
            }))
        }
    }
    return state
}

// actions
export const addTodoListAC = (newTitle: string) => ({
    type: 'TODOLIST/ADD_TODOLIST',
    payload: {
        newTitle,
        todoListId: v1()
    }
} as const)

export const removeTodoListAC = (todoListId: string) => ({
    type: 'TODOLIST/REMOVE_TODOLIST',
    payload: {
        todoListId
    }
} as const)
export const changeTodoListTitleAC = (todoListId: string, newTitle: string) => ({
    type: 'TODOLIST/CHANGE_TODOLIST_TITLE',
    payload: {
        todoListId,
        newTitle
    }
} as const)
export const changeTodoListFilterAC = (todoListId: string, filerValue: FilterValuesType,) => ({
    type: 'TODOLIST/CHANGE_TODOLIST_FILTER',
    payload: {
        todoListId,
        filerValue
    }
} as const)
export const setTodolistAC = (todoLists: TodolistType[]) => ({type: 'TODOLIST/SET_TODOLISTS', todoLists} as const)

// thunks
export const fetchTodoLists = (): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const todos = await todoListAPI.getTodoLists()
        dispatch(setTodolistAC(todos))
        todos.forEach((tl) => dispatch(fetchTasks(tl.id)))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        console.log(e)
    }
}
export const deleteTodoList = (todoListId: string): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const data = await todoListAPI.deleteTodolist(todoListId)
        dispatch(removeTodoListAC(todoListId))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        console.log(e)
    }
}
export const createTodoList = (title: string): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const data = await todoListAPI.createTodoList(title)
        dispatch(addTodoListAC(title))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        console.log(e)
    }
}
export const updateTodolist = (todoListId: string, title: string): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const data = await todoListAPI.updateTodolist(todoListId, title)
        dispatch(changeTodoListTitleAC(todoListId, title))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        console.log(e)
    }
}
// types
type InitialStateType = {
    id: string
    addedDate: Date
    order: number
    title: string
    filter: FilterValuesType
}
export type TodoListType = TodolistType & {
    filter: FilterValuesType
}
type TodoListsActionType =
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof changeTodoListTitleAC>
    | ReturnType<typeof changeTodoListFilterAC>
    | ReturnType<typeof setTodolistAC>