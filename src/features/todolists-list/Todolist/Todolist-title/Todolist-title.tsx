import { FC, useCallback } from 'react'
import { useActions } from '../../../../common/hooks'
import { todolistsThunks } from '../../todoListsReducer'
import { Button, EditableSpan } from '../../../../common/components'
import { RequestStatusType } from '../../../../app/app.slice'

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
  const changeTodosTitle = useCallback((newTitle: string) => {
    changeTodolistTitle({ todolistId, title: newTitle })
  }, [todolistId, changeTodolistTitle])


  return (
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
  )
}
