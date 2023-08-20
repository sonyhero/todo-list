import { useAppSelector } from '@/common/hooks'
import { Navigate } from 'react-router-dom'
import { selectIsLoggedIn } from '../auth.selectors'
import { Login } from '@/features/auth/Login/Login'

export const LoginPage = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  return isLoggedIn ? <Navigate to={'/'} /> : <Login />
}
