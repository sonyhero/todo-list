import { FC, useCallback } from 'react'
import { useActions } from '@/common/hooks'
import { RequestStatusType } from '@/app/app.slice'
import { todolistsThunks } from '@/features/todolists-list/todoListsReducer'
import { EditableSpan } from '@/components'
import { Button } from '@/components/ui/button'
import s from './todolist-title.module.scss'
import { Trash } from '@/assets'

type Props = {
  title: string
  todolistId: string
  entityStatus: RequestStatusType
}

export const TodolistTitle: FC<Props> = ({ title, todolistId, entityStatus }) => {
  const { deleteTodolist, changeTodolistTitle } = useActions(todolistsThunks)
  const removeTodos = useCallback(() => {
    deleteTodolist({ todolistId })
  }, [todolistId, deleteTodolist])
  const changeTodosTitle = useCallback(
    (newTitle: string) => {
      changeTodolistTitle({ todolistId, title: newTitle })
    },
    [todolistId, changeTodolistTitle],
  )

  return (
    <div className={s.titleBlock}>
      <EditableSpan variant={'large'} title={title} onChange={changeTodosTitle} />
      <Button variant={'icon'} disabled={entityStatus === 'loading'} onClick={removeTodos}>
        <Trash />
      </Button>
    </div>
  )
}
