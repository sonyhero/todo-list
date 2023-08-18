import { ChangeEvent, KeyboardEvent, useCallback, useState } from 'react'
import s from '../AddItemForm.module.css'
import { RejectValueType } from '@/common/utils/create-app-async-thunk'

export const useAddItemForm = (addItem: (newTitle: string) => Promise<any>) => {
  const [newTitle, setNewTitle] = useState('')
  const [error, setError] = useState<string | null>(null)

  const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (error) setError(null)
    if (event.key === 'Enter') addItemHandler()
  }
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => setNewTitle(event.currentTarget.value)

  const addItemHandler = useCallback(() => {
    if (newTitle.trim() !== '') {
      addItem(newTitle.trim())
        .then(() => setNewTitle(''))
        .catch((err: RejectValueType) => {
          if (err.data) {
            const messages = err.data.messages
            setError(messages.length ? messages[0] : 'Some error occurred')
          }
        })
    } else {
      setError('Title is required')
    }
  }, [newTitle, addItem])

  const finalInputClassName = s.input + (error ? ' ' + s.errorInput : '')

  return {
    newTitle,
    error,
    onKeyDownHandler,
    onChangeHandler,
    finalInputClassName,
    addItemHandler,
  }
}
