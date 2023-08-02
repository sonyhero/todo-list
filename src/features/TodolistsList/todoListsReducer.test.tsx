import { todolistActions, TodoListDomainType, todolistReducer } from './todoListsReducer'
import { v1 } from 'uuid'
import { FilterValuesType } from '../../app/App'

let startState: Array<TodoListDomainType>
let todolistId1 = v1()
let todolistId2 = v1()

beforeEach(() => {
  startState = [
    {
      id: todolistId1,
      title: 'What to learn',
      addedDate: new Date(),
      order: 0,
      filter: 'all',
      entityStatus: 'idle',
    },
    {
      id: todolistId2,
      title: 'What to buy',
      addedDate: new Date(),
      order: 1,
      filter: 'all',
      entityStatus: 'idle',
    },
  ]
})

test('correct todolist should be removed', () => {
  const endState = todolistReducer(startState, todolistActions.removeTodoList({ todolistId: todolistId1 }))

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
  const todolist = {
    id: v1(),
    title: 'New todolist',
    addedDate: new Date(),
    order: 2,
    filter: 'all',
    entityStatus: 'idle',
  }

  const endState = todolistReducer(startState, todolistActions.addTodolist({ todolist }))

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe(todolist.title)
  expect(endState[2].filter).toBe('all')
  expect(endState[2].id).toBeDefined()
})

test('correct todolist should change its name', () => {
  const title = 'New Todolist'

  const action = todolistActions.changeTodoListTitle({ todolistId: todolistId2, title })

  const endState = todolistReducer(startState, action)

  expect(endState[0].title).toBe('What to learn')
  expect(endState[1].title).toBe(title)
})

test('correct filter of todolist should be changed', () => {
  const filter: FilterValuesType = 'completed'

  const action = todolistActions.changeTodoListFilter({ todolistId: todolistId2, filter })

  const endState = todolistReducer(startState, action)

  expect(endState[0].filter).toBe('all')
  expect(endState[1].filter).toBe(filter)
})
