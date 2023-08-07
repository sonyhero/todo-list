import React, { useEffect } from 'react'
import './App.css'
import { useAppSelector, useAppDispatch } from '../hooks'
import { LinearProgress } from '../common/components/Loader/LinearProgress'
import { ErrorBar } from '../common/components/ErrorBar/ErrorBar'
import { Navigate, Route, Routes } from 'react-router-dom'
import { TodolistsList } from '../features/TodolistsList/TodolistsList'
import { Login } from '../features/Login/Login'
import { Error404 } from '../common/components/Error404/Error404'
import { initializeAppTC } from './app-reducer'
import { selectIsInitialized } from './app-selectors'

export type FilterValuesType = 'all' | 'active' | 'completed'

export const App = () => {
  const isInitialized = useAppSelector(selectIsInitialized)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializeAppTC())
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
