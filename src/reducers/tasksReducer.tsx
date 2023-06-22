import {addTodoListAC, removeTodoListAC, setTodolistAC} from './todoListsReducer';
import {taskAPI, TaskPriorities, TaskStatuses, TaskType, UpdateTaskModelType} from '../api/api';
import {Dispatch} from 'redux';
import {AppThunk, RootStateType} from '../app/store';
import {RequestStatusType, setAppStatusAC} from '../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../utils/error-utils';

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksReducerActionType): TasksStateType => {
    switch (action.type) {
        case 'TASKS/ADD_TASK': {
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        }
        case 'TASKS/REMOVE_TASK': {
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].filter(el => el.id !== action.payload.taskId)
            }
        }
        case 'TASKS/UPDATE_TASK': {
            state[action.todolistId] = state[action.todolistId]
                .map(t => t.id === action.taskId ? {...t, ...action.model} : t);
            return ({...state});
        }
        case 'TODOLIST/ADD_TODOLIST': {
            return {
                ...state, [action.todoList.id]: []
            }
        }
        case 'TODOLIST/REMOVE_TODOLIST': {
            let stateCopy = {...state}
            delete stateCopy[action.todoListId]
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
            return {...state, [action.payload.todoListId]: action.payload.tasks.map(t=> ({...t, entityTaskStatus: 'idle'}))}
        }
        case 'TASKS/CHANGE_ENTITY_TASK_STATUS':
            return {
                ...state,
                [action.todoListId]: state[action.todoListId]
                    .map(t => t.id === action.taskId ? {...t, entityTaskStatus: action.entityTaskStatus} : t)
            }
    }
    return state
}

// actions
export const addTaskAC = (task: TaskType) => {
    return {
        type: 'TASKS/ADD_TASK',
        task
    } as const
}
export const removeTaskAC = (todoListId: string, taskId: string) => {
    return {
        type: 'TASKS/REMOVE_TASK',
        payload: {
            todoListId,
            taskId
        }
    } as const
}
export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateTaskModelType) => ({
    type: 'TASKS/UPDATE_TASK',
    model,
    todolistId,
    taskId
} as const)
export const setTasksAC = (todoListId: string, tasks: TaskType[]) => ({
    type: 'TASKS/SET_TASKS',
    payload: {
        tasks,
        todoListId
    }
} as const)
export const changeEntityTaskAC = (taskId: string, todoListId: string, entityTaskStatus: RequestStatusType) => ({type: 'TASKS/CHANGE_ENTITY_TASK_STATUS', taskId, todoListId, entityTaskStatus} as const)


// thunks
export const fetchTasks = (todoListId: string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const data = await taskAPI.getTasks(todoListId)
        dispatch(setTasksAC(todoListId, data.items))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        const error = (e as Error)
        handleServerNetworkError(error, dispatch)
    }
}
export const deleteTaskTC = (todoListId: string, taskId: string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeEntityTaskAC(taskId,todoListId, 'loading'))
    try {
        const data = await taskAPI.deleteTask(todoListId, taskId)
        dispatch(removeTaskAC(todoListId, taskId))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        const error = (e as Error)
        dispatch(changeEntityTaskAC(taskId,todoListId, 'failed'))
        handleServerNetworkError(error, dispatch)
    }
}
export const createTaskTC = (todoListId: string, title: string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const data = await taskAPI.createTask(todoListId, title)
        if (data.resultCode === 0) {
            dispatch(addTaskAC(data.data.item))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(data, dispatch)
        }
    } catch (e) {
        const error = (e as Error)
        handleServerNetworkError(error, dispatch)
    }
}
export const updateTaskTC = (todoListId: string, taskId: string, data: AdaptiveTaskType): AppThunk => async (dispatch, getState: () => RootStateType) => {


    const task = getState().tasks[todoListId].find(t => t.id === taskId)

    if (task) {
        const model: UpdateTaskModelType = {
            title: task.title,
            deadline: task.deadline,
            priority: task.priority,
            startDate: task.startDate,
            description: task.description,
            status: task.status,
            ...data
        }

        dispatch(setAppStatusAC('loading'))
        dispatch(changeEntityTaskAC(taskId,todoListId, 'loading'))
        try {
            const data = await taskAPI.updateTask(todoListId, taskId, model)
            if (data.resultCode === 0){
                dispatch(updateTaskAC(todoListId, taskId, model))
                dispatch(setAppStatusAC('succeeded'))
                dispatch(changeEntityTaskAC(taskId,todoListId, 'succeeded'))
            } else {
                handleServerAppError(data, dispatch)
                dispatch(changeEntityTaskAC(taskId,todoListId, 'failed'))
            }
        } catch (e) {
            const error = (e as Error)
            handleServerNetworkError(error, dispatch)
            dispatch(changeEntityTaskAC(taskId,todoListId, 'failed'))
        }

    }
}

//types
type TasksReducerActionType =
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof setTodolistAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof changeEntityTaskAC>

export type TasksStateType = {
    [key: string]: TaskType[]
}

type AdaptiveTaskType = {
    title?: string
    deadline?: string
    priority?: TaskPriorities
    status?: TaskStatuses
    startDate?: string
    description?: string
}