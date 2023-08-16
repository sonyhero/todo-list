import { AxiosResponse } from 'axios'
import { RequestStatusType } from '../app/app.slice'
import { instance } from '../common/api'
import { TaskPriorities, TaskStatuses } from '../common/enums'
import { ResponseAppType } from '../common/types'

export const todoListAPI = {
  getTodoLists() {
    return instance.get<TodolistType[], AxiosResponse<TodolistType[]>>('todo-lists').then((res) => res.data)
  },
  createTodoList(title: string) {
    return instance
      .post<
        ResponseAppType<{ item: TodolistType }>,
        AxiosResponse<
          ResponseAppType<{
            item: TodolistType
          }>
        >,
        { title: string }
      >('todo-lists', { title })
      .then((res) => res.data)
  },
  deleteTodolist(id: string) {
    return instance.delete<ResponseAppType, AxiosResponse<ResponseAppType>>(`todo-lists/${id}`).then((res) => res.data)
  },
  updateTodolist(arg: UpdateTodolistTitleArgType) {
    return instance
      .put<ResponseAppType, AxiosResponse<ResponseAppType>, {
        title: string
      }>(`todo-lists/${arg.todolistId}`, { title: arg.title })
      .then((res) => res.data)
  }
}

export const taskAPI = {
  getTasks(todolistId: string) {
    return instance.get<ResponseGetTaskType>(`todo-lists/${todolistId}/tasks`).then((res) => res.data)
  },
  createTask(todolistId: string, title: string) {
    return instance
      .post<ResponseAppType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, { title })
      .then((res) => res.data)
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseAppType>(`todo-lists/${todolistId}/tasks/${taskId}`).then((res) => res.data)
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instance
      .put<ResponseAppType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
      .then((res) => res.data)
  }
}

export const authAPI = {
  login(data: LoginParamsType) {
    return instance.post<ResponseAppType<{ userId: number }>>('auth/login', data).then((res) => res.data)
  },
  me() {
    return instance
      .get<
        ResponseAppType<{
          id: number
          email: string
          login: string
        }>
      >('auth/me')
      .then((res) => res.data)
  },
  logout() {
    return instance.delete<ResponseAppType>('auth/login').then((res) => res.data)
  }
}

export const securityAPI = {
  getCaptchaUrl() {
    return instance.get<{ url: string }>(`security/get-captcha-url`).then((res) => res.data)
  }
}

// types
export type LoginParamsType = {
  email: string
  password: string
  rememberMe: boolean
  captcha: string
}
export type TodolistType = {
  id: string
  addedDate: Date
  order: number
  title: string
}
export type TaskType = {
  description: string
  title: string
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: Date
  entityTaskStatus: RequestStatusType
}
export type UpdateTaskModelType = {
  title: string
  description: string
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string
  deadline: string
}
type ResponseGetTaskType = {
  items: TaskType[]
  totalCount: number
  error: string | null
}

export type UpdateTodolistTitleArgType = {
  todolistId: string
  title: string
}
