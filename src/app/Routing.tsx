import { Navigate, Route, Routes } from 'react-router-dom'
import { TodolistsList } from '@/features/todo-list-list/todo-list-list'
import { Error404 } from '@/components'
import { LoginPage } from '@/features/auth/log-in'

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
