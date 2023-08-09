import s from './Header.module.css'
import { AddItemForm } from '../AddItemForm/AddItemForm'
import { useCallback } from 'react'
import { todolistsThunks } from '../../../features/todolists-list/todoListsReducer'
import { useAppSelector, useAppDispatch } from '../../hooks'
import { Button } from '../common'
import { authThunks } from '../../../features/auth/auth-reducer'
import { selectIsLoggedIn } from '../../../features/auth/auth-selectors'

export const Header = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const dispatch = useAppDispatch()

  const addTodos = useCallback(
    (title: string) => {
      dispatch(todolistsThunks.createTodolist({ title }))
    },
    [dispatch],
  )

  const logOutHandler = () => {
    dispatch(authThunks.logout())
  }

  return (
    <div className={s.header}>
      <div className={s.headerWrap}>
        <AddItemForm addItem={addTodos} />
        {isLoggedIn && <Button callback={logOutHandler} name={'Log out'} />}
      </div>
    </div>
  )
}
