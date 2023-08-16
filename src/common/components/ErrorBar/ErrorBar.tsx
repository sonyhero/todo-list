import s from './ErrorBar.module.css'
import { Button } from '../common'
import { useActions, useAppSelector } from '../../hooks'
import { appActions } from '../../../app/app.slice'
import { selectAppError } from '../../../app/app.selectors'

export const ErrorBar = () => {
  const error = useAppSelector(selectAppError)
  const { setAppError } = useActions(appActions)

  const handleClose = () => setAppError({ error: null })

  if (error) setTimeout(handleClose, 5000)

  const finalClassname = error === null ? s.errorBar : `${s.errorBar} ${s.errorBarActive}`

  return (
    <div className={finalClassname}>
      <div className={s.errorBarContent}>
        <div>{error}</div>
        <div>
          <Button xType={'delete'} name={'x'} callback={handleClose} />
        </div>
      </div>
    </div>
  )
}
