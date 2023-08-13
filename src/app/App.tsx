import { useEffect } from 'react'
import './App.css'
import { useActions, useAppSelector } from '../common/hooks'
import { selectIsInitialized } from './app-selectors'
import { Error404, LinearProgress, Toast } from '../common/components'
import { Navigate, Route, Routes } from 'react-router-dom'
import { TodolistsList } from '../features/todolists-list/TodolistsList'
import { Login } from '../features/auth/login'
import { authThunks } from '../features/auth/auth-reducer'
import 'react-toastify/dist/ReactToastify.css'

export type FilterValuesType = 'all' | 'active' | 'completed'

export const App = () => {
  const isInitialized = useAppSelector(selectIsInitialized)
  const { initializeApp } = useActions(authThunks)

  useEffect(() => {
    initializeApp({})
  }, [])

  return (
    <>
      <Toast />
      {!isInitialized ? (
        <LinearProgress />
      ) : (
        <div className={'App'}>
          <Routes>
            <Route path={'/'} element={<TodolistsList />} />
            <Route path={'/login'} element={<Login />} />
            <Route path={'/404'} element={<Error404 />} />
            <Route path={'*'} element={<Navigate to={'/404'} />} />
          </Routes>
        </div>
      )
      }
    </>
  )
}
