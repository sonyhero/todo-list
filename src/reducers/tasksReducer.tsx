import {addTodoListAC, removeTodoListAC, setTodolistAC} from './todoListsReducer';
import {taskAPI, TaskPriorities, TaskStatuses, TaskType, UpdateTaskModelType} from '../api/api';
import {Dispatch} from 'redux';
import {AppThunk, RootStateType} from '../app/store';
import {setAppStatusAC} from '../app/app-reducer';

const initialState: InitialStateType = {}

export const tasksReducer = (state: InitialStateType = initialState, action: TasksReducerActionType): InitialStateType => {
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
            return {...state, [action.payload.todoListId]: action.payload.tasks}
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

// thunks
export const fetchTasks = (todoListId: string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try{
        const data = await taskAPI.getTasks(todoListId)
        dispatch(setTasksAC(todoListId, data.items))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        console.log(e)
    }
}
export const deleteTaskTC = (todoListId: string, taskId: string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const data = await taskAPI.deleteTask(todoListId, taskId)
        dispatch(removeTaskAC(todoListId, taskId))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        console.log(e)
    }
}
export const createTaskTC = (todoListId: string, title: string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const data = await taskAPI.createTask(todoListId, title)
        dispatch(addTaskAC(data.data.item))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        console.log(e)
    }
}

export const updateTaskTC = (todolistId: string, taskId: string, data: AdaptiveTaskType): AppThunk => async (dispatch, getState: () => RootStateType) => {
    dispatch(setAppStatusAC('loading'))

    const task = getState().tasks[todolistId].find(t => t.id === taskId)

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

        try {
            await taskAPI.updateTask(todolistId, taskId, model)
            dispatch(updateTaskAC(todolistId, taskId, model))
            dispatch(setAppStatusAC('succeeded'))
        } catch (e) {
            console.log(e)
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

export type InitialStateType = {
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