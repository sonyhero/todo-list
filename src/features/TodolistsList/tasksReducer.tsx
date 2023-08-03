import { todolistActions } from './todoListsReducer'
import { taskAPI, TaskPriorities, TaskStatuses, TaskType, UpdateTaskModelType } from '../../api/api'
import { Dispatch } from 'redux'
import { AppRootStateType, AppThunk } from '../../app/store'
import { RequestStatusType, setAppStatus } from '../../app/app-reducer'
import { handleServerAppError, handleServerNetworkError } from '../../utils/error-utils'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: TasksStateType = {}

const slice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<{ task: TaskType }>) => {
      const tasks = state[action.payload.task.todoListId]
      tasks.unshift(action.payload.task)
    },
    removeTask: (state, action: PayloadAction<{ todolistId: string; taskId: string }>) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex((t) => t.id === action.payload.taskId)
      if (index !== -1) tasks.slice(index, 1)
    },
    updateTask: (
      state,
      action: PayloadAction<{
        taskId: string
        model: UpdateTaskModelType
        todolistId: string
      }>,
    ) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex((t) => t.id === action.payload.taskId)
      if (index !== -1) {
        tasks[index] = { ...tasks[index], ...action.payload.model }
      }
    },
    setTasks: (state, action: PayloadAction<{ tasks: TaskType[]; todolistId: string }>) => {
      state[action.payload.todolistId] = action.payload.tasks
    },
  },
})

export const tasksReducer = (state: TasksStateType = initialState, action: TasksReducerActionType): TasksStateType => {
  switch (action.type) {
    case 'TASKS/ADD_TASK': {
      return { ...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]] }
    }
    case 'TASKS/REMOVE_TASK': {
      return {
        ...state,
        [action.payload.todoListId]: state[action.payload.todoListId].filter((el) => el.id !== action.payload.taskId),
      }
    }
    case 'TASKS/UPDATE_TASK': {
      state[action.todolistId] = state[action.todolistId].map((t) =>
        t.id === action.taskId ? { ...t, ...action.model } : t,
      )
      return { ...state }
    }
    case 'TODOLIST/ADD_TODOLIST': {
      return {
        ...state,
        [action.todoList.id]: [],
      }
    }
    case 'TODOLIST/REMOVE_TODOLIST': {
      let stateCopy = { ...state }
      delete stateCopy[action.todoListId]
      return stateCopy
    }
    case 'TODOLIST/SET_TODOLISTS': {
      const stateCopy = { ...state }
      action.todoLists.forEach((tl) => {
        stateCopy[tl.id] = []
      })
      return stateCopy
    }
    case 'TASKS/SET_TASKS': {
      return {
        ...state,
        [action.payload.todoListId]: action.payload.tasks.map((t) => ({ ...t, entityTaskStatus: 'idle' })),
      }
    }
    case 'TASKS/CHANGE_ENTITY_TASK_STATUS':
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].map((t) =>
          t.id === action.taskId ? { ...t, entityTaskStatus: action.entityTaskStatus } : t,
        ),
      }
    case 'TODOLIST/CLEAR_STATE':
      return {}
  }
  return state
}

// actions
export const addTaskAC = (task: TaskType) => {
  return {
    type: 'TASKS/ADD_TASK',
    task,
  } as const
}
export const removeTaskAC = (todoListId: string, taskId: string) => {
  return {
    type: 'TASKS/REMOVE_TASK',
    payload: {
      todoListId,
      taskId,
    },
  } as const
}
export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateTaskModelType) =>
  ({
    type: 'TASKS/UPDATE_TASK',
    model,
    todolistId,
    taskId,
  }) as const
export const setTasksAC = (todoListId: string, tasks: TaskType[]) =>
  ({
    type: 'TASKS/SET_TASKS',
    payload: {
      tasks,
      todoListId,
    },
  }) as const
export const changeEntityTaskAC = (taskId: string, todoListId: string, entityTaskStatus: RequestStatusType) =>
  ({ type: 'TASKS/CHANGE_ENTITY_TASK_STATUS', taskId, todoListId, entityTaskStatus }) as const

// thunks
export const fetchTasks = (todoListId: string) => async (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }))
  try {
    const data = await taskAPI.getTasks(todoListId)
    dispatch(setTasksAC(todoListId, data.items))
    dispatch(setAppStatus({ status: 'succeeded' }))
  } catch (e) {
    const error = e as Error
    handleServerNetworkError(error, dispatch)
  }
}
export const deleteTaskTC = (todoListId: string, taskId: string) => async (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }))
  dispatch(changeEntityTaskAC(taskId, todoListId, 'loading'))
  try {
    await taskAPI.deleteTask(todoListId, taskId)
    dispatch(removeTaskAC(todoListId, taskId))
    dispatch(setAppStatus({ status: 'succeeded' }))
  } catch (e) {
    const error = e as Error
    dispatch(changeEntityTaskAC(taskId, todoListId, 'failed'))
    handleServerNetworkError(error, dispatch)
  }
}
export const createTaskTC = (todoListId: string, title: string) => async (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }))
  try {
    const data = await taskAPI.createTask(todoListId, title)
    if (data.resultCode === 0) {
      dispatch(addTaskAC(data.data.item))
      dispatch(setAppStatus({ status: 'succeeded' }))
    } else {
      handleServerAppError(data, dispatch)
    }
  } catch (e) {
    const error = e as Error
    handleServerNetworkError(error, dispatch)
  }
}
export const updateTaskTC =
  (todoListId: string, taskId: string, data: AdaptiveTaskType): AppThunk =>
  async (dispatch, getState: () => AppRootStateType) => {
    const task = getState().tasks[todoListId].find((t) => t.id === taskId)

    if (task) {
      const model: UpdateTaskModelType = {
        title: task.title,
        deadline: task.deadline,
        priority: task.priority,
        startDate: task.startDate,
        description: task.description,
        status: task.status,
        ...data,
      }

      dispatch(setAppStatus({ status: 'loading' }))
      dispatch(changeEntityTaskAC(taskId, todoListId, 'loading'))
      try {
        const data = await taskAPI.updateTask(todoListId, taskId, model)
        if (data.resultCode === 0) {
          dispatch(updateTaskAC(todoListId, taskId, model))
          dispatch(setAppStatus({ status: 'succeeded' }))
          dispatch(changeEntityTaskAC(taskId, todoListId, 'succeeded'))
        } else {
          handleServerAppError(data, dispatch)
          dispatch(changeEntityTaskAC(taskId, todoListId, 'failed'))
        }
      } catch (e) {
        const error = e as Error
        handleServerNetworkError(error, dispatch)
        dispatch(changeEntityTaskAC(taskId, todoListId, 'failed'))
      }
    }
  }

//types
type TasksReducerActionType =
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof updateTaskAC>
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
