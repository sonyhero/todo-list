import { FC, memo, useCallback } from 'react'
import { FilterValuesType } from '../../../app/App'
import s from './Todolist.module.css'
import { MappedTasks } from '../Tasks/MappedTasks'
import { RequestStatusType } from '../../../app/app-reducer'
import { AddItemForm } from '../../../common/components'
import { FilterButtonBlock } from './filtered-buttun-block/filter-button-block'
import { TodolistTitle } from './todolist-title/todolist-title'
import { useActions } from '../../../common/hooks'
import { tasksThunks } from '../tasksReducer'

type TodolistPropsType = {
  title: string
  todolistId: string
  filter: FilterValuesType
  entityStatus: RequestStatusType
}

export const Todolist: FC<TodolistPropsType> = memo((props) => {
  const { title, todolistId, filter, entityStatus } = props
  const { createTask } = useActions(tasksThunks)
  const addTaskHandler = useCallback(
    (newTitle: string) => {
      return createTask({ todolistId, title: newTitle }).unwrap()
    },
    [todolistId],
  )

  return (
    <div className={s.todoWrapper}>
      <TodolistTitle title={title} todolistId={todolistId} entityStatus={entityStatus} />
      <AddItemForm disabled={entityStatus === 'loading'} addItem={addTaskHandler} />
      <MappedTasks todolistId={todolistId} filter={filter} />
      <FilterButtonBlock todolistId={todolistId} filter={filter} />
    </div>
  )
})
