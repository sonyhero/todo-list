import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RequestStatusType, setAppError } from '../../app/app-reducer'
import { todolistsThunks } from './todoListsReducer'
import { createAppAsyncThunk, handleServerAppError, handleServerNetworkError } from '../../common/utils'
import { taskAPI, TaskType, UpdateTaskModelType } from '../../api/api'
import { ResultCode, TaskPriorities, TaskStatuses } from '../../common/enums'

const initialState: TasksStateType = {}

const slice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    changeEntityTask: (
      state,
      action: PayloadAction<{ taskId: string; todolistId: string; entityTaskStatus: RequestStatusType }>,
    ) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex((t) => t.id === action.payload.taskId)
      if (index !== -1) tasks[index].entityTaskStatus = action.payload.entityTaskStatus
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks
      })
      .addCase(createTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.task.todoListId]
        tasks.unshift(action.payload.task)
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId]
        const index = tasks.findIndex((t) => t.id === action.payload.taskId)
        if (index !== -1) tasks.splice(index, 1)
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId]
        const index = tasks.findIndex((t) => t.id === action.payload.taskId)
        if (index !== -1) {
          tasks[index] = { ...tasks[index], ...action.payload.data }
        }
      })
      .addCase(todolistsThunks.createTodolist.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(todolistsThunks.deleteTodolist.fulfilled, (state, action) => {
        delete state[action.payload.todolistId]
      })
      .addCase(todolistsThunks.fetchTodolists.fulfilled, (state, action) => {
        action.payload.todolists.forEach((tl) => (state[tl.id] = []))
      })
  },
})

const fetchTasks = createAppAsyncThunk<
  {
    todolistId: string
    tasks: TaskType[]
  },
  string
>('tasks/fetchTasks', async (todolistId, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
  try {
    const data = await taskAPI.getTasks(todolistId)
    const tasks = data.items
    return { todolistId, tasks }
  } catch (e) {
    handleServerNetworkError(e, dispatch)
    return rejectWithValue(null)
  }
})

const createTask = createAppAsyncThunk<{ task: TaskType }, AddTaskArgType>(
  'tasks/createTask',
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      const data = await taskAPI.createTask(arg.todolistId, arg.title)
      const task = data.data.item
      if (data.resultCode === ResultCode.success) {
        return { task }
      } else {
        handleServerAppError(data, dispatch)
        return rejectWithValue(null)
      }
    } catch (e) {
      handleServerNetworkError(e, dispatch)
      return rejectWithValue(null)
    }
  },
)

const deleteTask = createAppAsyncThunk<RemoveTaskArgType, RemoveTaskArgType>(
  'tasks/deleteTasks',
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      dispatch(changeEntityTask({ taskId: arg.taskId, todolistId: arg.todolistId, entityTaskStatus: 'loading' }))
      await taskAPI.deleteTask(arg.todolistId, arg.taskId)
      return { todolistId: arg.todolistId, taskId: arg.taskId }
    } catch (e) {
      dispatch(changeEntityTask({ taskId: arg.taskId, todolistId: arg.todolistId, entityTaskStatus: 'failed' }))
      handleServerNetworkError(e, dispatch)
      return rejectWithValue(null)
    }
  },
)

const updateTask = createAppAsyncThunk<UpdateTaskArgType, UpdateTaskArgType>(
  'tasks/updateTasks',
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue, getState } = thunkAPI
    try {
      const task = getState().tasks[arg.todolistId].find((t) => t.id === arg.taskId)
      if (!task) {
        dispatch(setAppError({ error: 'Task not found' }))
        return rejectWithValue(null)
      }
      const model: UpdateTaskModelType = {
        title: task.title,
        deadline: task.deadline,
        priority: task.priority,
        startDate: task.startDate,
        description: task.description,
        status: task.status,
        ...arg.data,
      }

      dispatch(changeEntityTask({ taskId: arg.taskId, todolistId: arg.todolistId, entityTaskStatus: 'loading' }))

      const data = await taskAPI.updateTask(arg.todolistId, arg.taskId, model)
      if (data.resultCode === ResultCode.success) {
        dispatch(
          changeEntityTask({
            taskId: arg.taskId,
            todolistId: arg.todolistId,
            entityTaskStatus: 'succeeded',
          }),
        )
        return arg
      } else {
        handleServerAppError(data, dispatch)
        dispatch(changeEntityTask({ taskId: arg.taskId, todolistId: arg.todolistId, entityTaskStatus: 'failed' }))
        return rejectWithValue(null)
      }
    } catch (e) {
      handleServerNetworkError(e, dispatch)
      dispatch(changeEntityTask({ taskId: arg.taskId, todolistId: arg.todolistId, entityTaskStatus: 'failed' }))
      return rejectWithValue(null)
    }
  },
)

export const tasksReducer = slice.reducer
export const { changeEntityTask } = slice.actions
export const tasksThunks = { fetchTasks, deleteTask, createTask, updateTask }

export type TasksStateType = {
  [key: string]: TaskType[]
}

type AddTaskArgType = { todolistId: string; title: string }
type RemoveTaskArgType = { todolistId: string; taskId: string }
type UpdateTaskArgType = { todolistId: string; taskId: string; data: AdaptiveTaskType }
type AdaptiveTaskType = {
  title?: string
  deadline?: string
  priority?: TaskPriorities
  status?: TaskStatuses
  startDate?: string
  description?: string
}
