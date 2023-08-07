import s from './Header.module.css'
import { AddItemForm } from '../AddItemForm/AddItemForm'
import { useCallback } from 'react'
import { createTodoList } from '../../../features/todolists-list/todoListsReducer'
import { useAppSelector, useAppDispatch } from '../../hooks'
import { Button } from '../common'
import { logoutTC } from '../../../features/auth/auth-reducer'
import { selectIsLoggedIn } from '../../../features/auth/auth-selectors'

export const Header = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const dispatch = useAppDispatch()

  const addTodos = useCallback(
    (title: string) => {
      dispatch(createTodoList(title))
    },
    [dispatch],
  )

  const logOutHandler = () => {
    dispatch(logoutTC())
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