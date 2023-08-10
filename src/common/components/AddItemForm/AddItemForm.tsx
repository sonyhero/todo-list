import { FC, memo } from 'react'
import s from './AddItemForm.module.css'
import { Button, Input } from '../common'
import { useAddItemForm } from './hooks/useAddItemForm'

type AddItemFormPropsType = {
  addItem: (newTitle: string) => Promise<any>
  disabled?: boolean
}
export const AddItemForm: FC<AddItemFormPropsType> = memo(({ addItem, disabled }) => {
  const { newTitle, error, onKeyDownHandler, onChangeHandler, finalInputClassName, addItemHandler } =
    useAddItemForm(addItem)

  return (
    <div className={s.itemForm}>
      <Input
        disabled={disabled}
        value={newTitle}
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler}
        className={finalInputClassName}
      />
      <Button disabled={disabled} name={'Add'} callback={addItemHandler} />
      {error && <div className={s.errorMessage}>{error}</div>}
    </div>
  )
})
