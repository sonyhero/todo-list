import React, {useEffect, useState} from 'react'
import {taskAPI, todoListAPI} from './api';

export default {
    title: 'API-Tasks'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [value, setValue] = useState<string>('')

    const getTasks = () => {
        taskAPI.getTasks(value)
            .then(data => setState(data.items))
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
            <button onClick={getTasks}>Get Tasks</button>
        </div>
    )
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const addTask = () => {
        taskAPI.createTask(todolistId, title).then(data => {
            setState(data)
            setTitle('')
            setTodolistId('')
        })
    }

    return (
        <div>
            <div>
                {JSON.stringify(state)}
            </div>
            <br/>
            <div>Todolist ID
                <input value={todolistId}
                       placeholder={'Todolist title'}
                       onChange={(e) => setTodolistId(e.currentTarget.value)}
                />
            </div>
            <div>Task Title
                <input value={title}
                       placeholder={'Todolist title'}
                       onChange={(e) => setTitle(e.currentTarget.value)}
                />
            </div>
            <button onClick={addTask}>Add Task</button>
        </div>
    )
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskID, setTaskID] = useState<string>('')

    const deleteTodolist = () => {
        taskAPI.deleteTask(todolistId,taskID)
            .then(data => setState(data))
    }

    return (
        <div>
            <div>
                {JSON.stringify(state)}
            </div>
            <br/>
            <div>Todolist ID
                <input value={todolistId}
                       placeholder={'Todolist title'}
                       onChange={(e) => setTodolistId(e.currentTarget.value)}
                />
            </div>
            <div>Task ID
                <input value={taskID}
                       placeholder={'Todolist title'}
                       onChange={(e) => setTaskID(e.currentTarget.value)}
                />
            </div>
            <button onClick={deleteTodolist}>Delete Task</button>
        </div>
    )
}

// export const UpdateTask = () => {
//     const [state, setState] = useState<any>(null)
//     const [todolistId, setTodolistId] = useState<string>('')
//     const [title, setTitle] = useState<string>('')
//
//     const updateTodolist = () => {
//         todoListAPI.updateTodolist(todolistId, title)
//             .then(data => {
//                 setState(data)
//                 setTodolistId('')
//                 setTitle('')
//             })
//     }
//
//     return (
//         <div>
//             <div>
//                 {JSON.stringify(state)}
//             </div>
//             <br/>
//             <div>ID
//                 <input value={todolistId}
//                        placeholder={'Todolist title'}
//                        onChange={(e) => setTodolistId(e.currentTarget.value)}
//                 />
//             </div>
//             <div>Title
//                 <input value={title}
//                        placeholder={'Todolist title'}
//                        onChange={(e) => setTitle(e.currentTarget.value)}
//                 />
//             </div>
//             <button onClick={updateTodolist}>Update Todolist</button>
//         </div>
//     )
//
// }
//