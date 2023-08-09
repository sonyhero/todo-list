import React, { useEffect } from 'react'
import './App.css'
import { useAppDispatch, useAppSelector } from '../common/hooks'
import { selectIsInitialized } from './app-selectors'
import { Error404, ErrorBar, LinearProgress } from '../common/components'
import { Navigate, Route, Routes } from 'react-router-dom'
import { TodolistsList } from '../features/todolists-list/TodolistsList'
import { Login } from '../features/auth/login'
import { authThunks } from '../features/auth/auth-reducer'

export type FilterValuesType = 'all' | 'active' | 'completed'

export const App = () => {
  const isInitialized = useAppSelector(selectIsInitialized)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(authThunks.initializeApp())
  }, [])

  return !isInitialized ? (
    <LinearProgress />
  ) : (
    <div className={'App'}>
      <ErrorBar />
      <Routes>
        <Route path={'/'} element={<TodolistsList />} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/404'} element={<Error404 />} />
        <Route path={'*'} element={<Navigate to={'/404'} />} />
      </Routes>
    </div>
  )
}
