import s from './LinearProgress.module.css'

export const LinearProgress = () => {
  return (
    <span className={s.linearContainer}>
      <span className={s.linear1}></span>
      <span className={s.linear2}></span>
    </span>
  )
}
