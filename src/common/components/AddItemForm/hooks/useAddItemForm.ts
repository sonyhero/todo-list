import { ChangeEvent, KeyboardEvent, useCallback, useState } from 'react'
import s from '../AddItemForm.module.css'

export const useAddItemForm = (addItem: (newTitle: string) => void) => {
  const [newTitle, setNewTitle] = useState('')
  const [error, setError] = useState<string | null>(null)

  const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (error) setError(null)
    if (event.key === 'Enter') addTaskHandler()
  }
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => setNewTitle(event.currentTarget.value)

  const addTaskHandler = useCallback(() => {
    if (newTitle.trim() !== '') {
      addItem(newTitle.trim())
      setNewTitle('')
    } else {
      setError('Ошибка')
    }
  }, [newTitle, addItem])

  const finalInputClassName = s.input + (error ? ' ' + s.errorInput : '')

  return {
    newTitle,
    error,
    onKeyDownHandler,
    onChangeHandler,
    finalInputClassName,
    addTaskHandler,
  }
}
