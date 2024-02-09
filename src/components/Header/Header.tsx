import s from './Header.module.scss'
import { AddItemForm } from '@/components'
import { useCallback } from 'react'
import { todolistsThunks } from '@/features/todo-list-list/todo-list.slice'
import { useActions, useAppSelector } from '@/common/hooks'
import { authThunks } from '@/features/auth/auth.slice'
import { selectIsLoggedIn } from '@/features/auth/auth.selectors'
import { Button } from '@/components/ui/button'
import { selectIsMobile } from '@/app/app.selectors'
import { Icon } from '@/assets'

export const Header = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const isMobile = useAppSelector(selectIsMobile)

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
        {isLoggedIn && (
          <Button variant={'tertiary'} isIcon={isMobile} onClick={logOutHandler}>
            {!isMobile && 'Log out'}
            <Icon name={'logOut'} />
          </Button>
        )}
      </div>
    </div>
  )
}
