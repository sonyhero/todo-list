import React, { SVGProps } from 'react'
import Icons from './sprite.svg'

type IconName = 'add' | 'logOut' | 'trash'

type Props = {
  name: IconName
  className?: string
} & SVGProps<SVGSVGElement>

export const Icon = ({ name, className, ...props }: Props) => {
  return (
    <svg className={className} height={24} width={24} {...props}>
      <use href={`${Icons}#icon-${name}`}></use>
    </svg>
  )
}
