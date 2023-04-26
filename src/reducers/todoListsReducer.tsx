import {FilterValuesType, TodoListsStateType} from '../App';

export const TodoListsReducer = (state: TodoListsStateType[], action: TodoListsActionType) => {
    switch (action.type) {
        case 'ADD_TODOLIST': {
            return [...state, action.payload.newTodoList]
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

type AddTodoListACType = ReturnType<typeof AddTodoListAC>
export const AddTodoListAC = (newTodoList: TodoListsStateType) => {
    return {
        type: 'ADD_TODOLIST',
        payload: {
            newTodoList
        }
    } as const
}

type RemoveTodoListACType = ReturnType<typeof RemoveTodoListAC>
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