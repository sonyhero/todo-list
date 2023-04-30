
import {v1} from 'uuid';
import {FilterValuesType, TodoListsStateType} from '../App';

const initialState: InitialStateType[] = [
    {id: 'todoListId_1', title: 'What to learn', filter: 'all'},
    {id: 'todoListId_2', title: 'What to buy', filter: 'all'}
]
type InitialStateType = {
    id: string
    title: string
    filter: FilterValuesType
}

export const TodoListsReducer = (state: InitialStateType[] = initialState   , action: TodoListsActionType): InitialStateType[] => {
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

type TodoListsActionType =
    AddTodoListACType |
    RemoveTodoListACType |
    ChangeTodoListTitleACType |
    ChangeTodoListFilterACType

export type AddTodoListACType = ReturnType<typeof AddTodoListAC>
export const AddTodoListAC = (newTitle: string) => {
    return {
        type: 'ADD_TODOLIST',
        payload: {
            newTitle,
            todoListId: v1()
        }
    } as const
}

export type RemoveTodoListACType = ReturnType<typeof RemoveTodoListAC>
export const RemoveTodoListAC = (todoListId: string) => {
    return {
        type: 'REMOVE_TODOLIST',
        payload: {
            todoListId
        }
    } as const
}

type ChangeTodoListTitleACType = ReturnType<typeof ChangeTodoListTitleAC>
export const ChangeTodoListTitleAC = (newTitle: string, todoListId: string) => {
    return {
        type: 'CHANGE_TODOLIST_TITLE',
        payload: {
            newTitle,
            todoListId
        }
    } as const
}

type ChangeTodoListFilterACType = ReturnType<typeof ChangeTodoListFilterAC>
export const ChangeTodoListFilterAC = (filerValue: FilterValuesType, todoListId: string) => {
    return {
        type: 'CHANGE_TODOLIST_FILTER',
        payload: {
            filerValue,
            todoListId
        }
    } as const
}