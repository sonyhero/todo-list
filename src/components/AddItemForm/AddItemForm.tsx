import { FC, memo } from 'react'
import { useAddItemForm } from './hooks/useAddItemForm'
import { Button } from '@/components/ui/button'
import { TextField } from '@/components/ui/textfield'
import { Icon } from '@/assets'
import { useAppSelector } from '@/common/hooks'
import { selectIsMobile } from '@/app/app.selectors'

type AddItemFormPropsType = {
  addItem: (newTitle: string) => Promise<any>
  disabled?: boolean
  placeholder?: string
  className?: string
}
export const AddItemForm: FC<AddItemFormPropsType> = memo(({ addItem, disabled, placeholder, className }) => {
  const { newTitle, error, onKeyDownHandler, onChangeHandler, addItemHandler } = useAddItemForm(addItem)
  const isMobile = useAppSelector(selectIsMobile)

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
      <Button disabled={disabled} onClick={addItemHandler} isIcon={isMobile}>
        {!isMobile && 'Add'}
        <Icon name={'add'} />
      </Button>
    </div>
  )
})
