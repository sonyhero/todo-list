import { FC, memo, useCallback } from 'react'
import s from './todo-list.module.scss'
import { useActions } from '@/common/hooks'
import { FilterValuesType } from '@/features/todo-list-list/todo-list.slice'
import { RequestStatusType } from '@/app/app.slice'
import { tasksThunks } from '@/features/todo-list-list/tasks/tasks.slice'
import { Card } from '@/components/ui/card'
import { TodolistTitle } from '@/features/todo-list-list/todo-list/todo-list-title/todo-list-title'
import { AddItemForm } from '@/components'
import { MappedTasks } from '@/features/todo-list-list/tasks/task-list'
import { FilterButtonBlock } from '@/features/todo-list-list/todo-list/filtered-button-block/filter-button-block'

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
    <Card className={s.todoCard}>
      <TodolistTitle title={title} todolistId={todolistId} entityStatus={entityStatus} />
      <AddItemForm
        className={s.itemForm}
        placeholder={'Type your task title'}
        disabled={entityStatus === 'loading'}
        addItem={addTaskHandler}
      />
      <MappedTasks todolistId={todolistId} filter={filter} />
      <FilterButtonBlock todolistId={todolistId} filter={filter} />
    </Card>
  )
})
