import {TasksStateType} from '../App';
import {AddTodoListACType, RemoveTodoListACType} from './todoListsReducer';
import {v1} from 'uuid';

export const TasksReducer = (state: TasksStateType, action: TasksReducerActionType) => {
    switch (action.type) {
        case 'ADD_TASK': {
            return {
                ...state,
                [action.payload.todoListId]: [{id: v1(), title: action.payload.newTitle, isDone: false}, ...state[action.payload.todoListId]]
            }
        }
        case 'REMOVE_TASK': {
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].filter(el => el.id !== action.payload.taskId)
            }
        }
        case
        'CHANGE_TASK_TITLE': {
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].map(el => el.id === action.payload.taskId
                    ? {...el, title: action.payload.newTitle}
                    : el
                )
            }
        }
        case 'CHANGE_TASK_STATUS': {
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].map(el => el.id === action.payload.taskId
                    ? {...el, isDone: action.payload.newIsDone}
                    : el
                )
            }
        }
        case 'ADD_TODOLIST': {
            return {
                ...state, [action.payload.todoListId]: []
            }
        }
        case 'REMOVE_TODOLIST': {
            let stateCopy = {...state}
            delete stateCopy[action.payload.todoListId]
            return stateCopy
        }
    }
    return state
}

type TasksReducerActionType =
    AddTaskACType |
    RemoveTaskACType |
    ChangeTaskStatusACType |
    ChangeTaskTitleACType |
    AddTodoListACType |
    RemoveTodoListACType

type AddTaskACType = ReturnType<typeof AddTaskAC>
export const AddTaskAC = (newTitle: string, todoListId: string) => {
    return {
        type: 'ADD_TASK',
        payload: {
            newTitle,
            todoListId
        }
    } as const
}
type RemoveTaskACType = ReturnType<typeof RemoveTaskAC>
export const RemoveTaskAC = (taskId: string, todoListId: string) => {
    return {
        type: 'REMOVE_TASK',
        payload: {
            taskId,
            todoListId
        }
    } as const
}

type ChangeTaskStatusACType = ReturnType<typeof ChangeTaskStatusAC>
export const ChangeTaskStatusAC = (taskId: string, newIsDone: boolean, todoListId: string) => {
    return {
        type: 'CHANGE_TASK_STATUS',
        payload: {
            taskId,
            newIsDone,
            todoListId
        }
    } as const
}

type ChangeTaskTitleACType = ReturnType<typeof ChangeTaskTitleAC>
export const ChangeTaskTitleAC = (taskId: string, newTitle: string, todoListId: string) => {
    return {
        type: 'CHANGE_TASK_TITLE',
        payload: {
            taskId,
            newTitle,
            todoListId
        }
    } as const
}

// type AddEmptyTodoListACType = ReturnType<typeof AddEmptyTodoListAC>
// export const AddEmptyTodoListAC = (newTodolistId: string) => {
//     return {
//         type: 'ADD_EMPTY_TODOLIST',
//         payload: {
//             newTodolistId
//         }
//     } as const
// }
//
// type RemoveTodoListTasksACType = ReturnType<typeof RemoveTodoListTasksAC>
//
// export const RemoveTodoListTasksAC = (todoListId: string) => {
//     return {
//         type: 'REMOVE_TODOLIST_TASKS',
//         payload: {
//             todoListId
//         }
//     } as const
// }