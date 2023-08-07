import React, { useEffect } from 'react'
import { Todolist } from './Todolist/Todolist'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useAppSelector, useAppDispatch } from '../../hooks'
import { Navigate } from 'react-router-dom'
import { fetchTodoLists } from './todoListsReducer'
import s from './TodolistsList.module.css'
import { selectTodolists } from './todolists-selectors'
import { selectIsLoggedIn } from '../Login/auth-selectors'
import { Header } from '../../common/components'
import { LinearProgress } from '../../common/components'
import { selectAppStatus } from '../../app/app-selectors'

export const TodolistsList = () => {
  const [todoListsRef] = useAutoAnimate<HTMLDivElement>()
  const todoLists = useAppSelector(selectTodolists)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const status = useAppSelector(selectAppStatus)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!isLoggedIn) {
      return
    }
    dispatch(fetchTodoLists())
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
