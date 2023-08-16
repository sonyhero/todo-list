import { useEffect } from 'react'
import { useActions, useAppSelector } from '../../common/hooks'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { selectTodolists } from './todolists-selectors'
import { selectIsLoggedIn } from '../auth/auth.selectors'
import { selectAppStatus } from '../../app/app.selectors'
import { todolistsThunks } from './todoListsReducer'
import { Todolist } from './Todolist/Todolist'
import { Navigate } from 'react-router-dom'
import { Header, LinearProgress } from '../../common/components'
import s from './TodolistsList.module.css'

export const TodolistsList = () => {
  const [todoListsRef] = useAutoAnimate<HTMLDivElement>()
  const todoLists = useAppSelector(selectTodolists)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const status = useAppSelector(selectAppStatus)

  const { fetchTodolists } = useActions(todolistsThunks)

  useEffect(() => {
    if (!isLoggedIn) {
      return
    }
    fetchTodolists({})
  }, [])

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
      <div ref={todoListsRef} className={s.wrapper}>
        {todoListsComponents}
      </div>
    </>
  )
}
