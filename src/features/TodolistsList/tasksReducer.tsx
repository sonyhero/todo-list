import { todolistActions } from './todoListsReducer'
import { taskAPI, TaskPriorities, TaskStatuses, TaskType, UpdateTaskModelType } from '../../api/api'
import { Dispatch } from 'redux'
import { AppRootStateType, AppThunk } from '../../app/store'
import { RequestStatusType, setAppStatus } from '../../app/app-reducer'
import { handleServerAppError, handleServerNetworkError } from '../../utils/error-utils'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: TasksStateType = {}

const slice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    removeTask(state, action: PayloadAction<{ taskId: string; todolistId: string }>) {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex((t) => t.id === action.payload.taskId)
      if (index !== -1) tasks.splice(index, 1)
    },
    addTask(state, action: PayloadAction<{ task: TaskType }>) {
      const tasks = state[action.payload.task.todoListId]
      tasks.unshift(action.payload.task)
    },
    updateTask(
      state,
      action: PayloadAction<{
        taskId: string
        model: UpdateTaskModelType
        todolistId: string
      }>,
    ) {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex((t) => t.id === action.payload.taskId)
      if (index !== -1) {
        tasks[index] = { ...tasks[index], ...action.payload.model }
      }
    },
    setTasks: (state, action: PayloadAction<{ tasks: TaskType[]; todolistId: string }>) => {
      state[action.payload.todolistId] = action.payload.tasks
    },
    changeEntityTask: (
      state,
      action: PayloadAction<{ taskId: string; todolistId: string; entityTaskStatus: RequestStatusType }>,
    ) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex((t) => t.id === action.payload.taskId)
      if (index !== -1) tasks[index].entityTaskStatus = action.payload.entityTaskStatus
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(todolistActions.addTodolist, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(todolistActions.removeTodoList, (state, action) => {
        delete state[action.payload.todolistId]
      })
      .addCase(todolistActions.setTodolist, (state, action) => {
        action.payload.todolists.forEach((tl) => (state[tl.id] = []))
      }),
})

export const tasksReducer = slice.reducer
export const { setTasks, updateTask, addTask, changeEntityTask, removeTask } = slice.actions
export const taskActions = slice.actions

// thunks
export const fetchTasks = (todolistId: string) => async (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }))
  try {
    const data = await taskAPI.getTasks(todolistId)
    dispatch(setTasks({ todolistId, tasks: data.items }))
    dispatch(setAppStatus({ status: 'succeeded' }))
  } catch (e) {
    const error = e as Error
    handleServerNetworkError(error, dispatch)
  }
}
export const deleteTaskTC = (todolistId: string, taskId: string) => async (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }))
  dispatch(changeEntityTask({ taskId, todolistId, entityTaskStatus: 'loading' }))
  try {
    await taskAPI.deleteTask(todolistId, taskId)
    dispatch(removeTask({ todolistId, taskId }))
    dispatch(setAppStatus({ status: 'succeeded' }))
  } catch (e) {
    const error = e as Error
    dispatch(changeEntityTask({ taskId, todolistId, entityTaskStatus: 'failed' }))
    handleServerNetworkError(error, dispatch)
  }
}

export const createTaskTC = (todolistId: string, title: string) => async (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }))
  try {
    const data = await taskAPI.createTask(todolistId, title)
    if (data.resultCode === 0) {
      dispatch(addTask({ task: data.data.item }))
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
  (todolistId: string, taskId: string, data: AdaptiveTaskType): AppThunk =>
  async (dispatch, getState: () => AppRootStateType) => {
    const task = getState().tasks[todolistId].find((t) => t.id === taskId)

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
      dispatch(changeEntityTask({ taskId, todolistId, entityTaskStatus: 'loading' }))
      try {
        const data = await taskAPI.updateTask(todolistId, taskId, model)
        if (data.resultCode === 0) {
          dispatch(updateTask({ todolistId, taskId, model }))
          dispatch(setAppStatus({ status: 'succeeded' }))
          dispatch(changeEntityTask({ taskId, todolistId, entityTaskStatus: 'succeeded' }))
        } else {
          handleServerAppError(data, dispatch)
          dispatch(changeEntityTask({ taskId, todolistId, entityTaskStatus: 'failed' }))
        }
      } catch (e) {
        const error = e as Error
        handleServerNetworkError(error, dispatch)
        dispatch(changeEntityTask({ taskId, todolistId, entityTaskStatus: 'failed' }))
      }
    }
  }

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
