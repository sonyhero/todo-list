import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import { useCallback } from 'react'
import { todolistActions, deleteTodoList, updateTodolist } from '../todoListsReducer'
import { tasksThunks } from '../tasksReducer'
import { FilterValuesType } from '../../../app/App'
import { TaskStatuses } from '../../../api/api'
import { selectTasks } from '../tasks-selectors'

export const useTodoList = (title: string, todolistId: string, filter: FilterValuesType) => {
  const tasks = useAppSelector(selectTasks)[todolistId]
  const dispatch = useAppDispatch()

  // CRUD operations for TodoLists
  const removeTodos = useCallback(() => {
    dispatch(deleteTodoList(todolistId))
  }, [dispatch, todolistId])
  const changeTodosTitle = useCallback(
    (newTitle: string) => {
      dispatch(updateTodolist(todolistId, newTitle))
    },
    [dispatch, todolistId],
  )

  const setChangeFilterAll = useCallback(() => {
    dispatch(todolistActions.changeTodoListFilter({ todolistId, filter: 'all' }))
  }, [dispatch, todolistId])
  const setChangeFilterActive = useCallback(() => {
    dispatch(todolistActions.changeTodoListFilter({ todolistId, filter: 'active' }))
  }, [dispatch, todolistId])
  const setChangeFilterCompleted = useCallback(() => {
    dispatch(todolistActions.changeTodoListFilter({ todolistId, filter: 'completed' }))
  }, [dispatch, todolistId])

  const filteredTasks = () => {
    return filter === 'active'
      ? tasks.filter((t) => t.status === TaskStatuses.New)
      : filter === 'completed'
      ? tasks.filter((t) => t.status === TaskStatuses.Completed)
      : tasks
  }
  const tasksForTodolist = filteredTasks()
  const addTaskHandler = useCallback(
    (title: string) => {
      dispatch(tasksThunks.createTask({ todolistId, title }))
    },
    [dispatch, todolistId],
  )

  return {
    removeTodos,
    changeTodosTitle,
    setChangeFilterAll,
    setChangeFilterActive,
    setChangeFilterCompleted,
    tasksForTodolist,
    addTaskHandler,
  }
}
