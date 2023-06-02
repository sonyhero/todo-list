import axios, {AxiosResponse} from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        'API-KEY': '275a40de-010f-4090-ae39-5e228c881a39'
    }
})

type TodolistAPIType = {
    id: string
    addedDate: Date
    order: number
    title: string
}


type ResponseType<T = {}> = {
    resultCode: number
    messages: string[],
    data: T
}

export const todoListAPI = {
    getTodoLists() {
        return instance.get<TodolistAPIType[], AxiosResponse<TodolistAPIType[]>>('todo-lists')
            .then((res) => res.data)
    },
    createTodoList(title: string) {
        return instance.post<ResponseType<{ items: TodolistAPIType }>,
            AxiosResponse<ResponseType<{items: TodolistAPIType}>>, { title: string }>('todo-lists', {title})
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

type TaskAPIType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: Date
    deadline: Date
    id: string
    todoListId: string
    order: number
    addedDate: string
    totalCount: number
}


type ResponseGetTaskType = {
    items: TaskAPIType[]
    totalCount: number
    error: string
}

export const taskAPI = {
    getTasks(todolistId: string) {
        return instance.get<ResponseGetTaskType>(`todo-lists/${todolistId}/tasks`)
            .then((res) => res.data)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<TaskAPIType>>(`todo-lists/${todolistId}/tasks`, {title})
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