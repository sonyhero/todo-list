import { useState } from 'react'
import { taskAPI, todoListAPI, UpdateTaskModelType } from './api'
import { TaskPriorities, TaskStatuses } from '@/common/enums'

export default {
  title: 'API-Tasks',
}

export const GetTasks = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<string>('')
  const [isDisabled, setIsDisabled] = useState<boolean>(false)

  const getTasks = () => {
    setIsDisabled(true)
    taskAPI.getTasks(todolistId).then((data) => {
      setState(data.items)
      setIsDisabled(false)
    })
  }
  return (
    <div>
      <div>{JSON.stringify(state)}</div>
      <br />
      <div>
        Todolist ID
        <input value={todolistId} placeholder={'Todolist ID'} onChange={(e) => setTodolistId(e.currentTarget.value)} />
      </div>
      <button disabled={isDisabled} onClick={getTasks}>
        Get Tasks
      </button>
    </div>
  )
}

export const CreateTask = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [isDisabled, setIsDisabled] = useState<boolean>(false)

  const addTask = () => {
    setIsDisabled(true)
    taskAPI.createTask(todolistId, title).then((data) => {
      setState(data)
      setTitle('')
      // setTodolistId('')
      setIsDisabled(false)
    })
  }

  return (
    <div>
      <div>{JSON.stringify(state)}</div>
      <br />
      <div>
        Todolist ID
        <input value={todolistId} placeholder={'Todolist ID'} onChange={(e) => setTodolistId(e.currentTarget.value)} />
      </div>
      <div>
        Task Title
        <input value={title} placeholder={'Task Title'} onChange={(e) => setTitle(e.currentTarget.value)} />
      </div>
      <button disabled={isDisabled} onClick={addTask}>
        Add Task
      </button>
    </div>
  )
}

export const DeleteTask = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<string>('')
  const [taskId, setTaskId] = useState<string>('')
  const [isDisabled, setIsDisabled] = useState<boolean>(false)

  const deleteTodolist = () => {
    setIsDisabled(true)
    todoListAPI.deleteTodolist(todolistId).then((data) => {
      setState(data)
      setIsDisabled(false)
    })
  }

  return (
    <div>
      <div>{JSON.stringify(state)}</div>
      <br />
      <div>
        Todolist ID
        <input value={todolistId} placeholder={'Todolist ID'} onChange={(e) => setTodolistId(e.currentTarget.value)} />
      </div>
      <div>
        Task ID
        <input value={taskId} placeholder={'Task ID'} onChange={(e) => setTaskId(e.currentTarget.value)} />
      </div>
      <button disabled={isDisabled} onClick={deleteTodolist}>
        Delete Task
      </button>
    </div>
  )
}

export const UpdateTask = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<string>('')
  const [taskId, setTaskId] = useState<string>('')
  const [newTitle, setNewTitle] = useState<string>('')
  const [isDisabled, setIsDisabled] = useState<boolean>(false)

  const updateTask = () => {
    const model: UpdateTaskModelType = {
      title: newTitle,
      deadline: '',
      priority: TaskPriorities.Low,
      startDate: '',
      description: '',
      status: TaskStatuses.New,
    }

    setIsDisabled(true)
    taskAPI.updateTask(todolistId, taskId, model).then((data) => {
      setState(data)
      setTodolistId('')
      setTaskId('')
      setNewTitle('')
      setIsDisabled(false)
    })
  }

  return (
    <div>
      <div>{JSON.stringify(state)}</div>
      <br />
      <div>
        Todolist ID
        <input value={todolistId} placeholder={'Todolist ID'} onChange={(e) => setTodolistId(e.currentTarget.value)} />
      </div>
      <div>
        Task ID
        <input value={taskId} placeholder={'Task ID'} onChange={(e) => setTaskId(e.currentTarget.value)} />
      </div>
      <div>
        Task Title
        <input value={newTitle} placeholder={'Task Title'} onChange={(e) => setNewTitle(e.currentTarget.value)} />
      </div>
      <button disabled={isDisabled} onClick={updateTask}>
        Update Task
      </button>
    </div>
  )
}
