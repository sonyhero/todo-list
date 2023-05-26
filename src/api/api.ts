import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        'API-KEY': '275a40de-010f-4090-ae39-5e228c881a39'
    }
})

export const todoListAPI = {
    getTodoLists() {
        return instance.get('todo-lists')
            .then((res) => res.data)
    },
    createTodoList(title: string) {
        return instance.post('todo-lists', {title})
            .then((res)=>res.data)
    },
    deleteTodolist(id:string) {
        return instance.delete(`todo-lists/${id}`)
            .then((res)=>res.data)
    },
    updateTodolist(id:string, title: string) {
        return instance.put(`todo-lists/${id}`, {title})
            .then((res) => res.data)
    }
}