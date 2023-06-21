import axios, {AxiosResponse} from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        'API-KEY': '275a40de-010f-4090-ae39-5e228c881a39'
    }
})

export const todoListAPI = {
    getTodoLists() {
        return instance.get<TodolistType[], AxiosResponse<TodolistType[]>>('todo-lists')
            .then((res) => res.data)
    },
    createTodoList(title: string) {
        return instance.post<ResponseType<{ items: TodolistType }>,
            AxiosResponse<ResponseType<{ items: TodolistType }>>, { title: string }>('todo-lists', {title})
            .then((res) => res.data)
    },
    deleteTodolist(id: string) {
        return instance.delete<ResponseType, AxiosResponse<ResponseType>>(`todo-lists/${id}`)
            .then((res) => res.data)
    },
    updateTodolist(id: string, title: string) {
        return instance.put<ResponseType, AxiosResponse<ResponseType>, { title: string }>(`todo-lists/${id}`, {title})
            .then((res) => res.data)
    }
}
export const taskAPI = {
    getTasks(todolistId: string) {
        return instance.get<ResponseGetTaskType>(`todo-lists/${todolistId}/tasks`)
            .then((res) => res.data)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks`, {title})
            .then((res) => res.data)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
            .then((res) => res.data)
    },
    updateTask(todolistId: string, taskId: string, title: string) {
        return instance.put<ResponseType>
        (`todo-lists/${todolistId}/tasks/${taskId}`, {title})
            .then((res) => res.data)
    }
}

// types
type ResponseType<T = {}> = {
    resultCode: number
    messages: string[],
    data: T
}
export type TodolistType = {
    id: string
    addedDate: Date
    order: number
    title: string
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
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
}

type ResponseGetTaskType = {
    items: TaskType[]
    totalCount: number
    error: string | null
}

