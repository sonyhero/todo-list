import {v1} from 'uuid';
import {FilterValuesType} from '../App';
import {todoListAPI, TodolistType} from '../api/api';
import {fetchTasks} from './tasksReducer';
import {AppThunk} from '../redux-store/store';

const initialState: InitialStateType[] = []

export const TodoListsReducer = (state: InitialStateType[] = initialState, action: TodoListsActionType): InitialStateType[] => {
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
export const addTodoList = (newTitle: string) => ({
    type: 'TODOLIST/ADD_TODOLIST',
    payload: {
        newTitle,
        todoListId: v1()
    }
} as const)

export const removeTodoList = (todoListId: string) => ({
    type: 'TODOLIST/REMOVE_TODOLIST',
    payload: {
        todoListId
    }
} as const)
export const changeTodoListTitle = (todoListId: string, newTitle: string) => ({
    type: 'TODOLIST/CHANGE_TODOLIST_TITLE',
    payload: {
        todoListId,
        newTitle
    }
} as const)
export const changeTodoListFilter = (todoListId: string, filerValue: FilterValuesType,) => ({
    type: 'TODOLIST/CHANGE_TODOLIST_FILTER',
    payload: {
        todoListId,
        filerValue
    }
} as const)
export const setTodolist = (todoLists: TodolistType[]) => ({type: 'TODOLIST/SET_TODOLISTS', todoLists} as const)

// thunks
export const fetchTodoLists = (): AppThunk => async (dispatch) => {
    try{
        const todos = await todoListAPI.getTodoLists()
        dispatch(setTodolist(todos))
        todos.forEach((tl)=> dispatch(fetchTasks(tl.id)))
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
    | ReturnType<typeof addTodoList>
    | ReturnType<typeof removeTodoList>
    | ReturnType<typeof changeTodoListTitle>
    | ReturnType<typeof changeTodoListFilter>
    | ReturnType<typeof setTodolist>