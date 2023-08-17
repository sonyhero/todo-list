import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import { TodolistsList } from '@/features/todolists-list/TodolistsList'
import { Login } from '@/features/auth/Login'
import { Error404 } from '@/common/components'

export const Routing = () => {
  return (
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
