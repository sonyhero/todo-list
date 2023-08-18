import { FC, memo, useCallback } from 'react'
import s from './Todolist.module.scss'
import { useActions } from '@/common/hooks'
import { FilterValuesType } from '@/features/todolists-list/todoListsReducer'
import { RequestStatusType } from '@/app/app.slice'
import { tasksThunks } from '@/features/todolists-list/tasksReducer'
import { Card } from '@/components/ui/card'
import { TodolistTitle } from '@/features/todolists-list/Todolist/Todolist-title/Todolist-title'
import { AddItemForm } from '@/components'
import { MappedTasks } from '@/features/todolists-list/Tasks/MappedTasks'
import { FilterButtonBlock } from '@/features/todolists-list/Todolist/Filtered-buttun-block/Filter-button-block'

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

  // return (
  //   <div className={s.todoWrapper}>
  //     <TodolistTitle title={title} todolistId={todolistId} entityStatus={entityStatus} />
  //     <AddItemForm disabled={entityStatus === 'loading'} addItem={addTaskHandler} />
  //     <MappedTasks todolistId={todolistId} filter={filter} />
  //     <FilterButtonBlock todolistId={todolistId} filter={filter} />
  //   </div>
  // )
  return (
    <Card className={s.todoCard}>
      <TodolistTitle title={title} todolistId={todolistId} entityStatus={entityStatus} />
      <AddItemForm disabled={entityStatus === 'loading'} addItem={addTaskHandler} />
      <MappedTasks todolistId={todolistId} filter={filter} />
      <FilterButtonBlock todolistId={todolistId} filter={filter} />
    </Card>
  )
})
