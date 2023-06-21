import {addTodoList, removeTodoList, setTodolist} from './todoListsReducer';
import {v1} from 'uuid';
import {taskAPI, TaskType} from '../api/api';
import {Dispatch} from 'redux';

const initialState: InitialStateType = {}

export const TasksReducer = (state: InitialStateType = initialState, action: TasksReducerActionType): InitialStateType => {
    switch (action.type) {
        case 'TASKS/ADD_TASK': {
            const newTask = {
                id: v1(),
                title: action.payload.newTitle,
                description: '',
                status: 0,
                priority: 0,
                startDate: '',
                deadline: '',
                todoListId: action.payload.todoListId,
                order: 0,
                addedDate: new Date()
            }
            return {
                ...state,
                [action.payload.todoListId]: [newTask, ...state[action.payload.todoListId]]
            }
        }
        case 'TASKS/REMOVE_TASK': {
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].filter(el => el.id !== action.payload.taskId)
            }
        }
        case
        'TASKS/CHANGE_TASK_TITLE': {
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].map(el => el.id === action.payload.taskId
                    ? {...el, title: action.payload.newTitle}
                    : el
                )
            }
        }
        case 'TASKS/CHANGE_TASK_STATUS': {
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].map(el => el.id === action.payload.taskId
                    ? {...el, isDone: action.payload.newIsDone}
                    : el
                )
            }
        }
        case 'TODOLIST/ADD_TODOLIST': {
            return {
                ...state, [action.payload.todoListId]: []
            }
        }
        case 'TODOLIST/REMOVE_TODOLIST': {
            let stateCopy = {...state}
            delete stateCopy[action.payload.todoListId]
            return stateCopy
        }
        case 'TODOLIST/SET_TODOLISTS': {
            const stateCopy = {...state}
            action.todoLists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        case 'TASKS/SET_TASKS': {
            const stateCopy = {...state}
            stateCopy[action.payload.todoListId] = action.payload.tasks
            return stateCopy
        }
    }
    return state
}

// actions
export const addTask = (todoListId: string, newTitle: string) => {
    return {
        type: 'TASKS/ADD_TASK',
        payload: {
            todoListId,
            newTitle
        }
    } as const
}
export const removeTask = (todoListId: string, taskId: string) => {
    return {
        type: 'TASKS/REMOVE_TASK',
        payload: {
            todoListId,
            taskId
        }
    } as const
}
export const changeTaskStatus = (todoListId: string, taskId: string, newIsDone: boolean) => {
    return {
        type: 'TASKS/CHANGE_TASK_STATUS',
        payload: {
            todoListId,
            taskId,
            newIsDone
        }
    } as const
}
export const changeTaskTitle = (todoListId: string, taskId: string, newTitle: string,) => {
    return {
        type: 'TASKS/CHANGE_TASK_TITLE',
        payload: {
            todoListId,
            taskId,
            newTitle
        }
    } as const
}
export const setTasks = (tasks: TaskType[], todoListId: string) => ({
    type: 'TASKS/SET_TASKS',
    payload: {
        tasks,
        todoListId
    }
} as const)

// thunks
export const fetchTasks = (todoListId: string) => async (dispatch: Dispatch) => {
   const data = await taskAPI.getTasks(todoListId)
            dispatch(setTasks(data.items, todoListId))
}

//types
type TasksReducerActionType =
    ReturnType<typeof addTask>
    | ReturnType<typeof removeTask>
    | ReturnType<typeof changeTaskStatus>
    | ReturnType<typeof changeTaskTitle>
    | ReturnType<typeof addTodoList>
    | ReturnType<typeof removeTodoList>
    | ReturnType<typeof setTodolist>
    | ReturnType<typeof setTasks>

export type InitialStateType = {
    [key: string]: TaskType[]
}