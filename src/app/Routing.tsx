import { TodolistsList } from '@/features/todolists-list/TodolistsList'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Error404 } from '@/components'
import { LoginPage } from '@/features/auth/Login/login-page'

export const Routing = () => {
  return (
    <>
      <Routes>
        <Route path={'/'} element={<TodolistsList />} />
        <Route path={'/login'} element={<LoginPage />} />
        <Route path={'/404'} element={<Error404 />} />
        <Route path={'*'} element={<Navigate to={'/404'} />} />
      </Routes>
    </>
  )
}
