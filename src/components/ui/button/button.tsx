import { ComponentPropsWithoutRef, ElementType } from 'react'

import s from './button.module.scss'

export type ButtonProps<T extends ElementType = 'button'> = {
  as?: T
  variant?: 'primary' | 'secondary' | 'tertiary' | 'icon' | 'link'
  fullWidth?: boolean
  className?: string
  isIcon?: boolean | null
} & ComponentPropsWithoutRef<T>

export const Button = <T extends ElementType = 'button'>(
  props: ButtonProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>,
) => {
  const { variant = 'primary', fullWidth, className, as: Component = 'button', isIcon = false, ...rest } = props

  return (
    <Component
      className={`${s[variant]} ${fullWidth ? s.fullWidth : ''} ${isIcon ? s.icon : ''} ${className}`}
      {...rest}
    />
  )
}
