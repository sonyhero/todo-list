import { FC, memo, useCallback } from 'react'
import s from './Todolist.module.css'
import { MappedTasks } from '../Tasks/MappedTasks'
import { RequestStatusType } from '@/app/app.slice'
import { AddItemForm } from '@/common/components'
import { FilterButtonBlock } from './Filtered-buttun-block/Filter-button-block'
import { TodolistTitle } from './Todolist-title/Todolist-title'
import { useActions } from '@/common/hooks'
import { tasksThunks } from '../tasksReducer'
import { FilterValuesType } from '../todoListsReducer'

type Props = {
  title: string
  todolistId: string
  filter: FilterValuesType
  entityStatus: RequestStatusType
}

export const Todolist: FC<Props> = memo((props) => {
  const { title, todolistId, filter, entityStatus } = props
  const { createTask } = useActions(tasksThunks)
  const addTaskHandler = useCallback(
    (newTitle: string) => {
      return createTask({ todolistId, title: newTitle }).unwrap()
    },
    [todolistId, createTask],
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
