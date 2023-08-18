import s from './LinearProgress.module.scss'

export const LinearProgress = () => {
  return (
    <span className={s.linearContainer}>
      <span className={s.linear1}></span>
      <span className={s.linear2}></span>
    </span>
  )
}
