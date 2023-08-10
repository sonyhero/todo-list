import { FC, ChangeEvent, KeyboardEvent } from 'react'

type Props = {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void
  className: string
  disabled?: boolean
}

export const Input: FC<Props> = (props) => {
  const { disabled, value, onChange, onKeyDown, className } = props

  return (
    <div>
      <input disabled={disabled} value={value} onChange={onChange} onKeyDown={onKeyDown} className={className} />
    </div>
  )
}
