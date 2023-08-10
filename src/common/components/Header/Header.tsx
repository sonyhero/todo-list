import s from './Header.module.css'
import { AddItemForm } from '../AddItemForm/AddItemForm'
import { useCallback } from 'react'
import { todolistsThunks } from '../../../features/todolists-list/todoListsReducer'
import { useActions, useAppSelector } from '../../hooks'
import { Button } from '../common'
import { authThunks } from '../../../features/auth/auth-reducer'
import { selectIsLoggedIn } from '../../../features/auth/auth-selectors'

export const Header = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const { createTodolist } = useActions(todolistsThunks)
  const { logout } = useActions(authThunks)

  const addTodos = useCallback((title: string) => {
    createTodolist({ title })
  }, [])

  const logOutHandler = () => logout({})

  return (
    <div className={s.header}>
      <div className={s.headerWrap}>
        <AddItemForm addItem={addTodos} />
        {isLoggedIn && <Button callback={logOutHandler} name={'Log out'} />}
      </div>
    </div>
  )
}
