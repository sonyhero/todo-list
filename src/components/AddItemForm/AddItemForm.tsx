import React, {memo} from 'react';
import s from './AddItemForm.module.css';
import {Button} from '../Button/Button';
import {Input} from '../Input';
import {useAddItemForm} from './hooks/useAddItemForm';

type AddItemFormPropsType = {
    addItem: (newTitle: string) => void
}
export const AddItemForm: React.FC<AddItemFormPropsType> = memo(({addItem}) => {
    console.log('AddItemForm render')

    const {
        newTitle,
        error,
        onKeyDownHandler,
        onChangeHandler,
        finalInputClassName,
        addTaskHandler
    } = useAddItemForm(addItem)

    return (
        <div>
            <div className={s.itemForm}>
                <Input value={newTitle}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}
                       className={finalInputClassName}
                />
                <Button name={'Add'} callback={addTaskHandler}/>
                {error && <div className={s.errorMessage}>{error}</div>}
            </div>
        </div>
    )
})