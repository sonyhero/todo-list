import { ComponentPropsWithoutRef, ElementType } from 'react'

import s from './typography.module.scss'

export type TypographyVariantType =
  | 'large'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'body1'
  | 'subtitle1'
  | 'body2'
  | 'subtitle2'
  | 'caption'
  | 'overline'
  | 'link1'
  | 'link2'

export type TypographyProps<T extends ElementType = 'p'> = {
  as?: T
  variant?: TypographyVariantType
  className?: string
  // children?: ReactNode
} & ComponentPropsWithoutRef<T>

export const Typography = <T extends ElementType = 'p'>(
  props: TypographyProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof TypographyProps<T>>,
) => {
  const { variant = 'body1', className, as: Component = 'p', ...rest } = props

  return <Component className={`${s[variant]} ${className}`} {...rest} />
}
