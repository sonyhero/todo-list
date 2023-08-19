import { FC, ChangeEvent, memo, useState } from 'react'
import { Typography, TypographyVariantType } from '@/components/ui/typography'
import { TextField } from '@/components/ui/textfield'
import s from './editable-span.module.scss'

type EditableSpanPropsType = {
  title: string
  onChange: (newTitle: string) => void
  disabled?: boolean
  variant?: TypographyVariantType
  className?: string
}
export const EditableSpan: FC<EditableSpanPropsType> = memo((props) => {
  const { title, onChange, disabled, variant, className } = props
  const [editMode, setEditMode] = useState(false)
  const [newTitle, setNewTitle] = useState(title)

  const activateEditMode = () => {
    setEditMode(true)
    setNewTitle(title)
  }

  const activateViewMode = () => {
    setEditMode(false)
    onChange(newTitle)
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTitle(e.currentTarget.value)

  const finalStyle = `${s.textBox} ${disabled ? s.disabled : ''}`

  return !disabled && editMode ? (
    <TextField
      placeholder={'Type your '}
      className={className}
      onBlur={activateViewMode}
      onChange={onChangeHandler}
      value={newTitle}
      autoFocus
    />
  ) : (
    <Typography className={finalStyle} variant={variant} onDoubleClick={activateEditMode}>
      {title}
    </Typography>
  )
})
