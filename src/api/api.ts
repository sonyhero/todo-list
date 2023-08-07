import axios, { AxiosResponse } from 'axios'
import { RequestStatusType } from '../app/app-reducer'

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  headers: {
    'API-KEY': '275a40de-010f-4090-ae39-5e228c881a39',
  },
})

export const todoListAPI = {
  getTodoLists() {
    return instance.get<TodolistType[], AxiosResponse<TodolistType[]>>('todo-lists').then((res) => res.data)
  },
  createTodoList(title: string) {
    return instance
      .post<
        ResponseType<{ item: TodolistType }>,
        AxiosResponse<
          ResponseType<{
            item: TodolistType
          }>
        >,
        { title: string }
      >('todo-lists', { title })
      .then((res) => res.data)
  },
  deleteTodolist(id: string) {
    return instance.delete<ResponseType, AxiosResponse<ResponseType>>(`todo-lists/${id}`).then((res) => res.data)
  },
  updateTodolist(id: string, title: string) {
    return instance
      .put<ResponseType, AxiosResponse<ResponseType>, { title: string }>(`todo-lists/${id}`, { title })
      .then((res) => res.data)
  },
}
export const taskAPI = {
  getTasks(todolistId: string) {
    return instance.get<ResponseGetTaskType>(`todo-lists/${todolistId}/tasks`).then((res) => res.data)
  },
  createTask(todolistId: string, title: string) {
    return instance
      .post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, { title })
      .then((res) => res.data)
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`).then((res) => res.data)
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instance
      .put<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
      .then((res) => res.data)
  },
}

export const authAPI = {
  login(data: LoginParamsType) {
    return instance.post<ResponseType<{ userId: number }>>('auth/login', data).then((res) => res.data)
  },
  me() {
    return instance
      .get<
        ResponseType<{
          id: number
          email: string
          login: string
        }>
      >('auth/me')
      .then((res) => res.data)
  },
  logout() {
    return instance.delete<ResponseType>('auth/login').then((res) => res.data)
  },
}

export const securityAPI = {
  getCaptchaUrl() {
    return instance.get<{ url: string }>(`security/get-captcha-url`).then((res) => res.data)
  },
}

// types
export type ResponseType<T = {}> = {
  resultCode: number
  messages: string[]
  data: T
}
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
export const ResultCode = {
  success: 0,
  error: 1,
  captcha: 10,
} as const
export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}
export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4,
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
