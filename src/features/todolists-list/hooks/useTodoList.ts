import { useAppSelector } from '../../../common/hooks'
import { FilterValuesType } from '../../../app/App'
import { selectTasks } from '../tasks-selectors'
import { useCallback } from 'react'
import { todolistActions, todolistsThunks } from '../todoListsReducer'
import { TaskStatuses } from '../../../common/enums'
import { tasksThunks } from '../tasksReducer'
import { useActions } from '../../../common/hooks'

export const useTodoList = (title: string, todolistId: string, filter: FilterValuesType) => {
  const tasks = useAppSelector(selectTasks)[todolistId]
  const { deleteTodolist, changeTodolistTitle } = useActions(todolistsThunks)
  const { changeTodoListFilter } = useActions(todolistActions)
  const { createTask } = useActions(tasksThunks)

  // CRUD operations for TodoLists
  const removeTodos = useCallback(() => {
    deleteTodolist({ todolistId })
  }, [todolistId])
  const changeTodosTitle = useCallback(
    (title: string) => {
      changeTodolistTitle({ todolistId, title })
    },
    [todolistId],
  )

  const setChangeFilterAll = useCallback(() => {
    changeTodoListFilter({ todolistId, filter: 'all' })
  }, [todolistId])
  const setChangeFilterActive = useCallback(() => {
    changeTodoListFilter({ todolistId, filter: 'active' })
  }, [todolistId])
  const setChangeFilterCompleted = useCallback(() => {
    changeTodoListFilter({ todolistId, filter: 'completed' })
  }, [todolistId])

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
      createTask({ todolistId, title })
    },
    [todolistId],
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
