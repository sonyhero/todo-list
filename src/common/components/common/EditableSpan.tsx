import React, { ChangeEvent, memo, useState } from 'react'

type EditableSpanPropsType = {
  title: string
  onChange: (newTitle: string) => void
  disabled?: boolean
}
export const EditableSpan: React.FC<EditableSpanPropsType> = memo((props) => {
  const { title, onChange, disabled } = props
  const [editMode, setEditMode] = useState(false)
  const [newTitle, setNewTitle] = useState(props.title)

  const activateEditMode = () => {
    setEditMode(true)
    setNewTitle(title)
  }
  const activateViewMode = () => {
    setEditMode(false)
    onChange(newTitle)
  }
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value)
  }

  const finalStyle = disabled ? { color: 'gray' } : { color: 'black' }

  return !disabled && editMode ? (
    <input onChange={onChangeHandler} onBlur={activateViewMode} value={newTitle} autoFocus />
  ) : (
    <span style={finalStyle} onDoubleClick={activateEditMode}>
      {title}
    </span>
  )
})
