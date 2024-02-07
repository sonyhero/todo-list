import { useActions, useAppSelector } from '@/common/hooks'
import { selectIsInitialized } from '@/app/app.selectors'
import { authThunks } from '@/features/auth/auth.slice'
import { useEffect, useState } from 'react'
import { LinearProgress, Toast } from '@/components'
import { Routing } from '@/app/Routing'

import 'react-toastify/dist/ReactToastify.css'
import { appActions } from '@/app/app.slice'

export const App = () => {
  const isInitialized = useAppSelector(selectIsInitialized)
  const { initializeApp } = useActions(authThunks)
  const { setIsMobile } = useActions(appActions)

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })

      const isMobile = window.innerWidth < 798
      setIsMobile({ isMobile })
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

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
