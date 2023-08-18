import { useActions, useAppSelector } from '@/common/hooks'
import { selectIsInitialized } from '@/app/app.selectors'
import { authThunks } from '@/features/auth/auth.slice'
import { useEffect } from 'react'
import { LinearProgress, Toast } from '@/components'
import { Routing } from '@/app/Routing'

import 'react-toastify/dist/ReactToastify.css'

export const App = () => {
  const isInitialized = useAppSelector(selectIsInitialized)
  const { initializeApp } = useActions(authThunks)

  useEffect(() => {
    initializeApp({})
  }, [initializeApp])

  return (
    <>
      <Toast />
      {!isInitialized ? <LinearProgress /> : <Routing />}
    </>
  )
}
