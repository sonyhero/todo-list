import React, { memo } from 'react'
import s from './Button.module.css'

type ButtonType = {
  name: string
  disabled?: boolean
  callback?: () => void
  className?: boolean
  xType?: string
  type?: 'button' | 'submit' | 'reset' | undefined
}

export const Button: React.FC<ButtonType> = memo((props) => {
  const { name, disabled, callback, className, xType, type } = props

  const finalClassName = `
    ${s.button}
    ${xType === 'delete' ? `${s.red} ${s.deleteTask}` : ''}
    ${xType === 'red' ? `${s.red}` : ''} 
    ${className ? s.secondary : s.default}
    `

  const onClickHandler = () => {
    if (callback) callback()
  }

  return (
    <button type={type} disabled={disabled} className={finalClassName} onClick={onClickHandler}>
      {name}
    </button>
  )
})
