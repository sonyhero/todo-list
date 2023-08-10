import { FC, memo } from 'react'
import { FilterValuesType } from '../../../app/App'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import s from './Todolist.module.css'
import { MappedTasks } from '../Tasks/MappedTasks'
import { useTodoList } from '../hooks/useTodoList'
import { RequestStatusType } from '../../../app/app-reducer'
import { AddItemForm, Button, EditableSpan } from '../../../common/components'
import { FilterButtonBlock } from './filtered-buttun-block/filter-button-block'

type TodolistPropsType = {
  title: string
  todolistId: string
  filter: FilterValuesType
  entityStatus: RequestStatusType
}

export const Todolist: FC<TodolistPropsType> = memo((props) => {
  const { title, todolistId, filter, entityStatus } = props

  const [listRef] = useAutoAnimate<HTMLUListElement>()

  const { removeTodos, changeTodosTitle, tasksForTodolist, addTaskHandler } = useTodoList(title, todolistId, filter)

  return (
    <div className={s.todoWrapper}>
      <h3>
        <EditableSpan title={title} onChange={changeTodosTitle} />
        <Button
          disabled={entityStatus === 'loading'}
          name={'x'}
          callback={removeTodos}
          xType={'delete'}
          className={false}
        />
      </h3>
      <AddItemForm disabled={entityStatus === 'loading'} addItem={addTaskHandler} />
      <ul className={s.tasks} ref={listRef}>
        <MappedTasks tasksForTodolist={tasksForTodolist} todolistId={todolistId} />
      </ul>
      <FilterButtonBlock todolistId={todolistId} filter={filter} />
    </div>
  )
})
