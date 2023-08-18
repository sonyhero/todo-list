import { FC, ChangeEvent, memo, useState } from 'react'
import { Typography } from '@/common/components/ui/typography'
import { TextField } from '@/common/components/ui/textfield'

type EditableSpanPropsType = {
  title: string
  onChange: (newTitle: string) => void
  disabled?: boolean
}
export const EditableSpan: FC<EditableSpanPropsType> = memo((props) => {
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

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTitle(e.currentTarget.value)

  const finalStyle = disabled ? { color: 'grey' } : { color: 'white' }

  // return !disabled && editMode ? (
  //   <input onChange={onChangeHandler} onBlur={activateViewMode} value={newTitle} autoFocus />
  // ) : (
  //   <span style={finalStyle} onDoubleClick={activateEditMode}>
  //     {title}
  //   </span>
  // )
  return !disabled && editMode ? (
    // <input onChange={onChangeHandler} onBlur={activateViewMode} value={newTitle} autoFocus />
    <TextField onBlur={activateViewMode} onChange={onChangeHandler} value={newTitle} autoFocus />
  ) : (
    <Typography onDoubleClick={activateEditMode}>{title}</Typography>
  )
})
