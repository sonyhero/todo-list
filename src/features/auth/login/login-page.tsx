import { useAppSelector } from '@/common/hooks'
import { selectIsLoggedIn } from '../../auth/auth.selectors'
import { Navigate } from 'react-router-dom'
import { Login } from './log-in'

export const LoginPage = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  return <>{isLoggedIn ? <Navigate to={'/'} /> : <Login />}</>
}
