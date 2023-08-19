import s from './Header.module.scss'
import { AddItemForm } from '@/components'
import { useCallback } from 'react'
import { todolistsThunks } from '@/features/todolists-list/todoListsReducer'
import { useActions, useAppSelector } from '@/common/hooks'
import { Button } from '../common'
import { authThunks } from '@/features/auth/auth.slice'
import { selectIsLoggedIn } from '@/features/auth/auth.selectors'

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
      <div className={s.headerWrap}>
        <AddItemForm placeholder={'Type your todo title'} addItem={addTodos} />
        {isLoggedIn && <Button callback={logOutHandler} name={'Log out'} />}
      </div>
    </div>
  )
}
