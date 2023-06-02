import {v1} from 'uuid';
import {FilterValuesType, TodoListsStateType} from '../App';

const initialState: InitialStateType[] = [
    {id: 'todoListId_1', title: 'What to learn', filter: 'all'},
    {id: 'todoListId_2', title: 'What to buy', filter: 'all'}
]

export const TodoListsReducer = (state: InitialStateType[] = initialState, action: TodoListsActionType): InitialStateType[] => {
    switch (action.type) {
        case 'ADD_TODOLIST': {
            let newTodoList: TodoListsStateType = {
                id: action.payload.todoListId,
                title: action.payload.newTitle,
                filter: 'all'
            }
            return [...state, newTodoList]
        }
        case 'REMOVE_TODOLIST': {
            return state.filter(el => el.id !== action.payload.todoListId)
        }
        case 'CHANGE_TODOLIST_TITLE': {
            return state.map(el => el.id === action.payload.todoListId ? {...el, title: action.payload.newTitle} : el)
        }
        case 'CHANGE_TODOLIST_FILTER': {
            return state.map(el => el.id === action.payload.todoListId ? {
                ...el,
                filter: action.payload.filerValue
            } : el)
        }
    }
    return state
}

// actions
export const addTodoListAC = (newTitle: string) => {
    return {
        type: 'ADD_TODOLIST',
        payload: {
            newTitle,
            todoListId: v1()
        }
    } as const
}
export const removeTodoListAC = (todoListId: string) => {
    return {
        type: 'REMOVE_TODOLIST',
        payload: {
            todoListId
        }
    } as const
}
export const changeTodoListTitleAC = (todoListId: string, newTitle: string) => {
    return {
        type: 'CHANGE_TODOLIST_TITLE',
        payload: {
            todoListId,
            newTitle
        }
    } as const
}
export const changeTodoListFilterAC = (todoListId: string, filerValue: FilterValuesType,) => {
    return {
        type: 'CHANGE_TODOLIST_FILTER',
        payload: {
            todoListId,
            filerValue
        }
    } as const
}

// types
type InitialStateType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TodoListsActionType =
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof changeTodoListTitleAC>
    | ReturnType<typeof changeTodoListFilterAC>