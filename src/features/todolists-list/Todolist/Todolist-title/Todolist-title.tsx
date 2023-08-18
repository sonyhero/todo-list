import { FC, useCallback } from 'react'
import { useActions } from '@/common/hooks'
import { RequestStatusType } from '@/app/app.slice'
import { todolistsThunks } from '@/features/todolists-list/todoListsReducer'
import { EditableSpan } from '@/components'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import s from './todolist-title.module.scss'

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
      {/*<Button*/}
      {/*  disabled={entityStatus === 'loading'}*/}
      {/*  name={'x'}*/}
      {/*  callback={removeTodos}*/}
      {/*  xType={'delete'}*/}
      {/*  className={false}*/}
      {/*/>*/}
      <Button disabled={entityStatus === 'loading'} onClick={removeTodos}>
        <Typography>x</Typography>
      </Button>
    </div>
  )
}
