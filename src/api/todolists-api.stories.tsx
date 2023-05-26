import React, {useEffect, useState} from 'react'
import {todoListAPI} from './api';

export default {
    title: 'API-Todolist'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListAPI.getTodoLists().then(data => setState(data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [value, setValue] = useState<string>('')

    const addTodolist = () => {
        todoListAPI.createTodoList(value).then(data => {
            setState(data)
            setValue('')
        })
    }

    return (
        <div>
            <div>
                {JSON.stringify(state)}
            </div>
            <br/>
            <input value={value}
                   placeholder={'Todolist title'}
                   onChange={(e) => setValue(e.currentTarget.value)}
            />
            <button onClick={addTodolist}>Add Todolist</button>
        </div>
    )
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [value, setValue] = useState<string>('')

    const deleteTodolist = () => {
        todoListAPI.deleteTodolist(value)
            .then(data => setState(data))
    }

    return (
        <div>
            <div>
                {JSON.stringify(state)}
            </div>
            <br/>
            <input value={value}
                   placeholder={'Todolist title'}
                   onChange={(e) => setValue(e.currentTarget.value)}
            />
            <button onClick={deleteTodolist}>Delete Todolist</button>
        </div>
    )
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const updateTodolist = () => {
        todoListAPI.updateTodolist(todolistId, title)
            .then(data => {
                setState(data)
                setTodolistId('')
                setTitle('')
            })
    }

    return (
        <div>
            <div>
                {JSON.stringify(state)}
            </div>
            <br/>
            <div>ID
                <input value={todolistId}
                       placeholder={'Todolist title'}
                       onChange={(e) => setTodolistId(e.currentTarget.value)}
                />
            </div>
            <div>Title
                <input value={title}
                       placeholder={'Todolist title'}
                       onChange={(e) => setTitle(e.currentTarget.value)}
                />
            </div>
            <button onClick={updateTodolist}>Update Todolist</button>
        </div>
    )

}

