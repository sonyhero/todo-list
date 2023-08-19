import { FC, memo } from 'react'
import { useAddItemForm } from './hooks/useAddItemForm'
import { Button } from '@/components/ui/button'
import { TextField } from '@/components/ui/textfield'

type AddItemFormPropsType = {
  addItem: (newTitle: string) => Promise<any>
  disabled?: boolean
  placeholder?: string
  className?: string
}
export const AddItemForm: FC<AddItemFormPropsType> = memo(({ addItem, disabled, placeholder, className }) => {
  const { newTitle, error, onKeyDownHandler, onChangeHandler, addItemHandler } = useAddItemForm(addItem)

  return (
    <div className={className}>
      <TextField
        placeholder={placeholder}
        value={newTitle}
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler}
        errorMessage={error}
        disabled={disabled}
      />
      <Button disabled={disabled} onClick={addItemHandler}>
        Add
      </Button>
    </div>
  )
})
