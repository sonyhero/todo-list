import s from './Header.module.scss'
import { AddItemForm } from '@/components'
import { useCallback } from 'react'
import { todolistsThunks } from '@/features/todolists-list/todoListsReducer'
import { useActions, useAppSelector } from '@/common/hooks'
import { authThunks } from '@/features/auth/auth.slice'
import { selectIsLoggedIn } from '@/features/auth/auth.selectors'
import { Button } from '@/components/ui/button'

export const Header = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const { createTodolist } = useActions(todolistsThunks)
  const { logout } = useActions(authThunks)

  const addTodos = useCallback(
    (title: string) => {
      return createTodolist({ title }).unwrap()
    },
    [createTodolist],
  )

  const logOutHandler = () => logout({})

  return (
    <div className={s.header}>
      <div className={s.contentBox}>
        <AddItemForm className={s.itemForm} placeholder={'Type your todo title'} addItem={addTodos} />
        {isLoggedIn && <Button onClick={logOutHandler}>Log out</Button>}
      </div>
    </div>
  )
}
