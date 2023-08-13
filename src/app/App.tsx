import { useEffect } from 'react'
import { useActions, useAppSelector } from '../common/hooks'
import { selectIsInitialized } from './app-selectors'
import { LinearProgress, Toast } from '../common/components'
import { authThunks } from '../features/auth/auth-reducer'
import 'react-toastify/dist/ReactToastify.css'
import { Routing } from './routing'

export const App = () => {
  const isInitialized = useAppSelector(selectIsInitialized)
  const { initializeApp } = useActions(authThunks)

  useEffect(() => {
    initializeApp({})
  }, [])

  return (
    <>
      <Toast />
      {!isInitialized ? <LinearProgress /> : <Routing />}
    </>
  )
}
