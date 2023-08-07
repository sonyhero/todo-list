import React, { memo } from 'react'
import { FilterValuesType } from '../../../app/App'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import s from './Todolist.module.css'
import { MappedTasks } from '../Tasks/MappedTasks'
import { useTodoList } from '../hooks/useTodoList'
import { RequestStatusType } from '../../../app/app-reducer'
import { AddItemForm, Button, EditableSpan } from '../../../common/components'

type TodolistPropsType = {
  title: string
  todolistId: string
  filter: FilterValuesType
  entityStatus: RequestStatusType
}

export const Todolist: React.FC<TodolistPropsType> = memo((props) => {
  const { title, todolistId, filter, entityStatus } = props

  const [listRef] = useAutoAnimate<HTMLUListElement>()

  const {
    removeTodos,
    changeTodosTitle,
    setChangeFilterAll,
    setChangeFilterActive,
    setChangeFilterCompleted,
    tasksForTodolist,
    addTaskHandler,
  } = useTodoList(title, todolistId, filter)

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
      <div className={s.btwWrap}>
        <Button className={filter === 'all'} name={'All'} callback={setChangeFilterAll} />
        <Button className={filter === 'active'} name={'Active'} callback={setChangeFilterActive} />
        <Button className={filter === 'completed'} name={'Completed'} callback={setChangeFilterCompleted} />
      </div>
    </div>
  )
})
