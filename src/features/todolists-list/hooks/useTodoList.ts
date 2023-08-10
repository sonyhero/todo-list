import { useActions, useAppSelector } from '../../../common/hooks'
import { FilterValuesType } from '../../../app/App'
import { selectTasks } from '../tasks-selectors'
import { useCallback } from 'react'
import { todolistsThunks } from '../todoListsReducer'
import { TaskStatuses } from '../../../common/enums'
import { tasksThunks } from '../tasksReducer'

export const useTodoList = (title: string, todolistId: string, filter: FilterValuesType) => {
  const tasks = useAppSelector(selectTasks)[todolistId]
  const { deleteTodolist, changeTodolistTitle } = useActions(todolistsThunks)
  const { createTask } = useActions(tasksThunks)

  const removeTodos = useCallback(() => {
    deleteTodolist({ todolistId })
  }, [todolistId])
  const changeTodosTitle = useCallback(() => {
    changeTodolistTitle({ todolistId, title })
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
    (newTitle: string) => {
      return createTask({ todolistId, title: newTitle }).unwrap()
    },
    [todolistId],
  )

  return { removeTodos, changeTodosTitle, tasksForTodolist, addTaskHandler }
}
