import { useAppSelector } from '@/common/hooks'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import s from './todo-list-list.module.scss'
import { selectTodolists } from '@/features/todo-list-list/todo-list-selectors'
import { selectIsLoggedIn } from '@/features/auth/auth.selectors'
import { selectAppStatus } from '@/app/app.selectors'
import { Navigate } from 'react-router-dom'
import { Header, LinearProgress } from '@/components'
import { Todolist } from '@/features/todo-list-list/todo-list/todo-list'

export const TodolistsList = () => {
  const [todoListsRef] = useAutoAnimate<HTMLDivElement>()
  const todoLists = useAppSelector(selectTodolists)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const status = useAppSelector(selectAppStatus)

  // const { fetchTodolists } = useActions(todolistsThunks)

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     return
  //   }
  //   fetchTodolists({})
  // }, [])

  const todoListsComponents = todoLists.map((tl) => {
    return (
      <Todolist key={tl.id} todolistId={tl.id} title={tl.title} filter={tl.filter} entityStatus={tl.entityStatus} />
    )
  })

  return !isLoggedIn ? (
    <Navigate to={'/login'} />
  ) : (
    <>
      <Header />
      {status === 'loading' ? (
        <LinearProgress />
      ) : (
        <div style={{ height: '5px', backgroundColor: 'transparent' }}></div>
      )}
      <div ref={todoListsRef} className={s.todolistsBox}>
        {todoListsComponents}
      </div>
    </>
  )
}
