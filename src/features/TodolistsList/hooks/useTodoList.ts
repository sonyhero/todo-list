import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import { useCallback } from 'react'
import { changeTodoListFilterAC, deleteTodoList, updateTodolist } from '../todoListsReducer'
import { createTaskTC } from '../tasksReducer'
import { FilterValuesType } from '../../../app/App'
import { TaskStatuses } from '../../../api/api'
import { selectTasks } from '../tasks-selectors'

export const useTodoList = (title: string, todoListId: string, filter: FilterValuesType) => {
  const tasks = useAppSelector(selectTasks)[todoListId]
  const dispatch = useAppDispatch()

  // CRUD operations for TodoLists
  const removeTodos = useCallback(() => {
    dispatch(deleteTodoList(todoListId))
  }, [dispatch, todoListId])
  const changeTodosTitle = useCallback(
    (newTitle: string) => {
      dispatch(updateTodolist(todoListId, newTitle))
    },
    [dispatch, todoListId],
  )

  const setChangeFilterAll = useCallback(() => {
    dispatch(changeTodoListFilterAC(todoListId, 'all'))
  }, [dispatch, todoListId])
  const setChangeFilterActive = useCallback(() => {
    dispatch(changeTodoListFilterAC(todoListId, 'active'))
  }, [dispatch, todoListId])
  const setChangeFilterCompleted = useCallback(() => {
    dispatch(changeTodoListFilterAC(todoListId, 'completed'))
  }, [dispatch, todoListId])

  const filteredTasks = () => {
    return filter === 'active'
      ? tasks.filter((t) => t.status === TaskStatuses.New)
      : filter === 'completed'
      ? tasks.filter((t) => t.status === TaskStatuses.Completed)
      : tasks
  }
  const tasksForTodolist = filteredTasks()
  const addTaskHandler = useCallback(
    (newTitle: string) => {
      dispatch(createTaskTC(todoListId, newTitle))
    },
    [dispatch, todoListId],
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
