import {TasksStateType} from '../App';
import {v1} from 'uuid';

const ADD_TASK = 'ADD_TASK'
const REMOVE_TASK = 'REMOVE_TASK'
const CHANGE_TASK_TITLE = 'CHANGE_TASK_TITLE'
const CHANGE_TASK_STATUS = 'CHANGE_TASK_STATUS'


export const TasksReducer = (state: TasksStateType, action: ActionType) => {
    switch (action.type) {
        case ADD_TASK: {
            const newTask = {id: v1(), title: action.payload.newTitle, isDone: false}
            return {
                ...state,
                [action.payload.todoListId]: [newTask, ...state[action.payload.todoListId]]
            }
        }
        case REMOVE_TASK: {
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].filter(el => el.id !== action.payload.taskId)
            }
        }
        case
        CHANGE_TASK_TITLE: {
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].map(el => el.id === action.payload.taskId
                    ? {...el, title: action.payload.newTitle}
                    : el
                )
            }
        }
        case CHANGE_TASK_STATUS: {
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].map(el => el.id === action.payload.taskId
                    ? {...el, isDone: action.payload.newIsDone}
                    : el
                )
            }
        }
    }
    return state
}

type ActionType = AddTaskACType | RemoveTaskACType | ChangeTaskStatusACType | ChangeTaskTitleACType

type AddTaskACType = ReturnType<typeof AddTaskAC>
export const AddTaskAC = (newTitle: string, todoListId: string) => {
    return {
        type: ADD_TASK,
        payload: {
            newTitle,
            todoListId
        }
    } as const
}
type RemoveTaskACType = ReturnType<typeof RemoveTaskAC>
export const RemoveTaskAC = (taskId: string, todoListId: string) => {
    return {
        type: REMOVE_TASK,
        payload: {
            taskId,
            todoListId
        }
    } as const
}

type ChangeTaskStatusACType = ReturnType<typeof ChangeTaskStatusAC>
export const ChangeTaskStatusAC = (taskId: string, newIsDone: boolean, todoListId: string) => {
    return {
        type: CHANGE_TASK_STATUS,
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
        type: CHANGE_TASK_TITLE,
        payload: {
            taskId,
            newTitle,
            todoListId
        }
    } as const
}