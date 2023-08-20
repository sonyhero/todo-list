import { tasksReducer, TasksStateType, tasksThunks } from './tasks.slice'
import { v1 } from 'uuid'
import { TodoListDomainType, todolistsReducer, todolistsThunks } from '../todo-list.slice'
import { TaskPriorities, TaskStatuses } from '@/common/enums'
import { TaskType } from '@/api/api'

let startState: TasksStateType

beforeEach(() => {
  startState = {
    todolistId1: [
      {
        id: '1',
        title: 'CSS',
        order: 0,
        todoListId: 'todolistId1',
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: '',
        description: '',
        deadline: '',
        addedDate: new Date(),
        entityTaskStatus: 'idle',
      },
      {
        id: '2',
        title: 'JS',
        order: 1,
        todoListId: 'todolistId1',
        status: TaskStatuses.Completed,
        priority: TaskPriorities.Low,
        startDate: '',
        description: '',
        deadline: '',
        addedDate: new Date(),
        entityTaskStatus: 'idle',
      },
      {
        id: '3',
        title: 'HTML',
        order: 2,
        todoListId: 'todolistId1',
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: '',
        description: '',
        deadline: '',
        addedDate: new Date(),
        entityTaskStatus: 'idle',
      },
    ],
    todolistId2: [
      {
        id: '1',
        title: 'Bread',
        order: 0,
        todoListId: 'todolistId2',
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: '',
        description: '',
        deadline: '',
        addedDate: new Date(),
        entityTaskStatus: 'idle',
      },
      {
        id: '2',
        title: 'Milk',
        order: 1,
        todoListId: 'todolistId2',
        status: TaskStatuses.Completed,
        priority: TaskPriorities.Low,
        startDate: '',
        description: '',
        deadline: '',
        addedDate: new Date(),
        entityTaskStatus: 'idle',
      },
      {
        id: '3',
        title: 'Tea',
        order: 2,
        todoListId: 'todolistId2',
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: '',
        description: '',
        deadline: '',
        addedDate: new Date(),
        entityTaskStatus: 'idle',
      },
    ],
  }
})

test('correct task should be deleted from correct array', () => {
  // const action = tasksThunks.deleteTask.fulfilled({ todolistId: 'todolistId2', taskId: '2' },)

  const action = tasksThunks.deleteTask.fulfilled({ todolistId: 'todolistId2', taskId: '2' }, '', {
    todolistId: 'todolistId2',
    taskId: '2',
  })

  const endState = tasksReducer(startState, action)

  expect(endState['todolistId2'].length).toBe(2)
})

test('correct task should be added to correct array', () => {
  const task: TaskType = {
    description: '',
    title: 'New task',
    status: TaskStatuses.New,
    priority: TaskPriorities.Low,
    startDate: '',
    deadline: '',
    id: '4',
    todoListId: 'todolistId2',
    order: 3,
    addedDate: new Date(),
    entityTaskStatus: 'idle',
  }

  const action = tasksThunks.createTask.fulfilled({ task }, '', { title: task.title, todolistId: task.id })

  const endState = tasksReducer(startState, action)

  expect(endState['todolistId1'].length).toBe(3)
  expect(endState['todolistId2'].length).toBe(4)
  expect(endState['todolistId2'][0].id).toBeDefined()
  expect(endState['todolistId2'][0].title).toBe('New task')
  expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
})

test('status of specified task should be changed', () => {
  const model = {
    taskId: '2',
    data: { status: TaskStatuses.New },
    todolistId: 'todolistId2',
  }

  const action = tasksThunks.updateTask.fulfilled(model, '', model)

  const endState = tasksReducer(startState, action)

  expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed)
  expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New)
})

test('title of specified task should be changed', () => {
  const model = { taskId: '2', data: { title: 'beer' }, todolistId: 'todolistId2' }

  const action = tasksThunks.updateTask.fulfilled(model, '', model)

  const endState = tasksReducer(startState, action)

  expect(endState['todolistId1'][1].title).toBe('JS')
  expect(endState['todolistId2'][1].title).toBe('beer')
})

test('new array should be added when new todolist is added', () => {
  const todolist = {
    id: v1(),
    title: 'New todolist',
    addedDate: new Date(),
    order: 2,
    filter: 'all',
    entityStatus: 'idle',
  }

  const action = todolistsThunks.createTodolist.fulfilled({ todolist }, '', { title: todolist.title })

  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)
  const newKey = keys.find((k) => k !== 'todolistId1' && k !== 'todolistId2')
  if (!newKey) {
    throw Error('new key should be added')
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})

test('ids should be equals', () => {
  const startTasksState: TasksStateType = {}
  const startTodolistsState: Array<TodoListDomainType> = []

  const todolist = {
    id: v1(),
    title: 'New todolist',
    addedDate: new Date(),
    order: 2,
    filter: 'all',
    entityStatus: 'idle',
  }

  const action = todolistsThunks.createTodolist.fulfilled({ todolist }, '', { title: todolist.title })

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.payload.todolist.id)
  expect(idFromTodolists).toBe(action.payload.todolist.id)
})

test('property with todolistId should be deleted', () => {
  const action = todolistsThunks.deleteTodolist.fulfilled({ todolistId: 'todolistId2' }, '', {
    todolistId: 'todolistId2',
  })

  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState['todolistId2']).not.toBeDefined()
  expect(startState['todolistId2']).toBeDefined()
})
