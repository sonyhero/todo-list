import React, {memo} from 'react';
import s from './AddItemForm.module.css';
import {Button} from '../common/Button/Button';
import {Input} from '../common/Input';
import {useAddItemForm} from './hooks/useAddItemForm';

type AddItemFormPropsType = {
    addItem: (newTitle: string) => void
    disabled?: boolean
}
export const AddItemForm: React.FC<AddItemFormPropsType> = memo(({addItem, disabled}) => {

    const {
        newTitle,
        error,
        onKeyDownHandler,
        onChangeHandler,
        finalInputClassName,
        addTaskHandler
    } = useAddItemForm(addItem)

    return (
            <div className={s.itemForm}>
                <Input disabled={disabled} value={newTitle}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}
                       className={finalInputClassName}
                />
                <Button disabled={disabled} name={'Add'} callback={addTaskHandler}/>
                {error && <div className={s.errorMessage}>{error}</div>}
            </div>
    )
})